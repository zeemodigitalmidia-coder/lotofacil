<?php
header('Content-Type: application/json');

function writeLog($message, $data = null) {
    $log_dir = __DIR__ . '/logs';
    if (!file_exists($log_dir)) {
        mkdir($log_dir, 0777, true);
    }
    
    $log_file = $log_dir . '/pix-' . date('Y-m-d') . '.log';
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => $message,
        'data' => $data,
        'request_id' => uniqid()
    ];
    
    file_put_contents(
        $log_file, 
        json_encode($log_entry, JSON_PRETTY_PRINT) . "\n" . str_repeat('-', 80) . "\n",
        FILE_APPEND
    );
    
    return $log_entry['request_id'];
}

function generateRandomPerson() {
    $dados_post = http_build_query([
        'acao' => 'gerar_pessoa',
        'sexo' => 'I',
        'pontuacao' => 'S',
        'idade' => '0',
        'cep_estado' => '',
        'cep_cidade' => '',
        'txt_qtde' => '1'
    ]);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://www.4devs.com.br/ferramentas_online.php",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $dados_post,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/x-www-form-urlencoded"
        ]
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception('Erro ao gerar dados do cliente: ' . $error);
    }

    $data = json_decode($response, true);
    if (!isset($data[0])) {
        throw new Exception('Erro ao gerar dados do cliente');
    }

    return $data[0];
}

try {
    $request_id = writeLog("🚀 Nova requisição iniciada", $_GET);

    // Dados fixos
    $product_hash = 'f5mcg4mg6x';
    $product_title = 'API TESTE 01';
    $offer_hash = $_GET['offer_hash'] ?? 'uiwy49nksz';
    $api_token = $_GET['api_token'] ?? 'NAunRlhzYsXferc1lQGzMZBvBsVR4RhqOkddXaY7NYb3Iz9nQiEzkzlVJM12';
    $amount = floatval($_GET['amount'] ?? 49.90) * 100; // centavos

    // UTM da URL GET
    $utm_params = [
        'utm_source' => $_GET['utm_source'] ?? '',
        'utm_medium' => $_GET['utm_medium'] ?? '',
        'utm_campaign' => $_GET['utm_campaign'] ?? '',
        'utm_content' => $_GET['utm_content'] ?? '',
        'utm_term' => $_GET['utm_term'] ?? '',
        'src' => $_GET['src'] ?? ''
    ];

    // Gera cliente
    $cliente = generateRandomPerson();
    $name = $cliente['nome'];
    $email = $cliente['email'];
    $phone = preg_replace('/\D/', '', $cliente['celular']);
    $document = preg_replace('/\D/', '', $cliente['cpf']);

    // Payload
    $payload = [
        'amount' => intval($amount),
        'offer_hash' => $offer_hash,
        'payment_method' => 'pix',
        'customer' => [
            'name' => $name,
            'email' => $email,
            'phone_number' => $phone,
            'document' => $document
        ],
        'cart' => [
            [
                'product_hash' => $product_hash,
                'title' => $product_title,
                'price' => intval($amount),
                'quantity' => 1,
                'operation_type' => 1,
                'tangible' => false
            ]
        ],
        'installments' => 1,
        'expire_in_days' => 1,
        'postback_url' => 'https://' . $_SERVER['HTTP_HOST'] . '/webhook.php',
        'tracking' => $utm_params
    ];

    writeLog("📦 Payload preparado", $payload);

    // Envia para API Nitro
    $ch = curl_init("https://api.disruptybr.com.br/api/public/v1/transactions?api_token={$api_token}");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'Content-Type: application/json'
        ],
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($error) {
        throw new Exception('Erro: ' . $error);
    }

    $responseData = json_decode($response, true);
    if (!isset($responseData['pix']['pix_qr_code'])) {
        throw new Exception('Erro ao gerar Pix: ' . ($responseData['message'] ?? 'Desconhecido'));
    }

    $transaction_hash = $responseData['hash'];
    $transaction_id = $responseData['id'];
    $pix_qr_code = urlencode($responseData['pix']['pix_qr_code']);
    $pix_url = urlencode($responseData['pix']['pix_url']);

    // Monta URL para qrcode.php com UTM
    $query = http_build_query(array_merge([
        'transaction_hash' => $transaction_hash,
        'pix_qr_code' => $pix_qr_code,
        'pix_url' => $pix_url
    ], $utm_params));

    header("Location: qrcode.php?{$query}");
    exit;

} catch (Exception $e) {
    writeLog("❌ Erro", ['message' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

?>
