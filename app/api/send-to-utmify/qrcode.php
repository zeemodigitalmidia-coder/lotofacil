<?php
$transaction_hash = $_GET['transaction_hash'] ?? 'Desconhecido';
$pix_qr_code = $_GET['pix_qr_code'] ?? '';
$pix_url = $_GET['pix_url'] ?? '';
$valor = $_GET['valor'] ?? '49,90';

// Validade: sempre data atual + 1 hora
date_default_timezone_set('America/Sao_Paulo'); // Ajusta timezone do Brasil
$validade_timestamp = strtotime('+1 hour');
$validade_data = date('d/m/Y, H:i', $validade_timestamp);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Pagamento Pix</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; display: flex; flex-direction: column; min-height: 100vh; }
        .top-bar { background:rgb(255, 255, 255)100px; display: flex; align-items: center; justify-content: center; }
        .top-bar img { height: 120px; }
        .container { max-width: 400px; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: -40px auto 30px; padding: 25px 20px; text-align: center; position: relative; }
        .safe-badge { position: absolute; top: 15px; right: 15px; background: #28a745; color: white; padding: 5px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
        .title { color: #FF6600; font-weight: bold; font-size: 16px; margin-top: 20px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .qrcode img { width: 220px; height: 220px; margin: 20px 0; }
        .pix-input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; background: #f9f9f9; margin-top: 10px; word-break: break-all; }
        .btn-copy { background:rgb(20, 180, 60); color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; width: 100%; transition: background 0.3s; }
        .btn-copy:hover { background: #e65500; }
        .info-box { background: #f9f9f9; border-radius: 8px; padding: 12px 15px; margin-top: 20px; text-align: left; font-size: 13px; color: #555; }
        .info-item { display: flex; align-items: center; margin-bottom: 8px; gap: 6px; }
        .info-item span { font-weight: bold; color: #333; }
        .countdown { font-weight: bold; color: #FF6600; margin-left: 5px; }
    </style>
<script id="_wau2fn">var _wau = _wau || []; _wau.push(["small", "2d15os2iuv", "2fn"]);</script><script async src="//waust.at/s.js"></script>
</head>
<body>

<div class="top-bar">
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Tiktok_logo_text.svg" alt="Logo Kwai" width="100">
</div>
<br>

<div class="container">
    <div class="safe-badge">🔒 Seguro</div>

    <div class="title">📲 Escaneie o QRCode abaixo</div>

    <div class="qrcode">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=<?= htmlspecialchars(urldecode($pix_qr_code)) ?>" alt="QR Code Pix">
    </div>

    <div class="title">📋 Ou copie o código PIX</div>

    <input type="text" id="pixCode" class="pix-input" value="<?= htmlspecialchars(urldecode($pix_qr_code)) ?>" readonly>

    <button class="btn-copy" onclick="copyPix()">📋 Copiar</button>

    <div class="info-box">
        <div class="info-item">💰 <span>Valor:</span> R$ <?= htmlspecialchars($valor) ?></div>
        <div class="info-item">
            ⏰ <span>Válido até:</span> <?= $validade_data ?>
            <span class="countdown" id="countdown"></span>
        </div>
    </div>
</div>

<script>
function copyPix() {
    const input = document.getElementById('pixCode');
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value)
        .then(() => alert('Código PIX copiado!'))
        .catch(err => alert('Erro ao copiar: ' + err));
}

const countdownElement = document.getElementById('countdown');
const validadeTimestamp = <?= $validade_timestamp * 1000 ?>;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = validadeTimestamp - now;
    if (distance <= 0) {
        countdownElement.innerHTML = " - Expirado";
        clearInterval(interval);
        return;
    }
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownElement.innerHTML = ` - ${minutes}m ${seconds}s`;
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

const transaction_hash = '<?= $transaction_hash ?>';

async function checkPaymentStatus() {
    try {
        const response = await fetch('check-payment.php?id=' + transaction_hash);
        const data = await response.json();

        console.log('Status:', data);

        if (!data || !data.status) return; // segurança

        let statusEl = document.getElementById('paymentStatus');

        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.id = 'paymentStatus';
            statusEl.style.marginTop = '10px';
            document.body.appendChild(statusEl);
        }

        statusEl.style.display = 'block';

        if (data.status === 'paid') {
            statusEl.textContent = '✅ Pagamento confirmado! Redirecionando...';
            statusEl.style.background = 'rgba(34, 197, 94, 0.1)';
            statusEl.style.color = '#22C55E';
            clearInterval(checkInterval);
            setTimeout(() => {
                window.location.href = data.redirect_url;
            }, 2000);
        } else if (data.status === 'waiting_payment') {
            statusEl.textContent = '⏳ Aguardando pagamento...';
            statusEl.style.background = 'rgba(234, 179, 8, 0.1)';
            statusEl.style.color = '#EAB308';
        }
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
    }
}

const checkInterval = setInterval(checkPaymentStatus, 500);


</script>

</body>

</html>
