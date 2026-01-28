<?php
header('Content-Type: application/json');

// ✅ TOKEN FIXO DA NITRO
$api_token = 'NAunRlhzYsXferc1lQGzMZBvBsVR4RhqOkddXaY7NYb3Iz9nQiEzkzlVJM12';

// ✅ Recebe o transaction_id via GET
$transaction_id = $_GET['id'] ?? null;

// ✅ URL fixa de redirecionamento
$redirect_url = 'https://modomultiplicador.vercel.app/';

// ✅ Valida o parâmetro
if (!$transaction_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetro id (transaction_id) é obrigatório.']);
    exit;
}

try {
    $url = "https://api.disruptybr.com.br/api/public/v1/transactions/{$transaction_id}?api_token={$api_token}";

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erro ao consultar API da Dis: $error");
    }

    $responseData = json_decode($response, true);

    if (!isset($responseData['payment_status'])) {
        throw new Exception("Resposta inválida da Nitro: 'payment_status' ausente.");
    }

    if ($responseData['payment_status'] === 'paid') {
        echo json_encode([
            'status' => 'paid',
            'redirect_url' => $redirect_url
        ]);
    } elseif ($responseData['payment_status'] === 'waiting_payment') {
        echo json_encode([
            'status' => 'waiting_payment'
        ]);
    } else {
        echo json_encode([
            'status' => $responseData['payment_status']
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
