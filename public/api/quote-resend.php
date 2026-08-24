<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$quoteConfig = [];
$configPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'quote-config.php';
if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $quoteConfig = $loadedConfig;
    }
}

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function env_value(string $name, string $fallback = ''): string {
    global $quoteConfig;
    $value = getenv($name);
    if ($value === false && isset($_SERVER[$name])) {
        $value = $_SERVER[$name];
    }
    if (($value === false || $value === '') && isset($quoteConfig[$name])) {
        $value = $quoteConfig[$name];
    }
    return trim((string) ($value === false ? $fallback : $value));
}

function text_value(array $body, string $key, int $limit = 500): string {
    $value = trim((string) ($body[$key] ?? ''));
    return mb_substr($value, 0, $limit);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 4 * 1024 * 1024) {
    respond(413, ['error' => 'The quote request is too large.']);
}

$allowedOrigins = array_values(array_filter(array_map('trim', explode(',', env_value('QUOTE_ALLOWED_ORIGINS')))));
$requestOrigin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($allowedOrigins && $requestOrigin && !in_array($requestOrigin, $allowedOrigins, true)) {
    respond(403, ['error' => 'This website is not allowed to submit quote requests.']);
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, ['error' => 'The quote request is invalid.']);
}

// Honeypot submissions receive a neutral success response.
if (text_value($body, 'website') !== '') {
    respond(200, ['ok' => true]);
}

$fullName = text_value($body, 'fullName', 120);
$companyName = text_value($body, 'companyName', 160);
$email = strtolower(text_value($body, 'email', 254));
$plantList = text_value($body, 'plantList', 5000);
$projectNotes = text_value($body, 'projectNotes', 5000);
$plantItems = [];
foreach (array_slice(is_array($body['plantItems'] ?? null) ? $body['plantItems'] : [], 0, 100) as $item) {
    if (!is_array($item)) continue;
    $cleanItem = [
        'plant' => mb_substr(trim((string) ($item['plant'] ?? '')), 0, 200),
        'quantity' => mb_substr(trim((string) ($item['quantity'] ?? '')), 0, 60),
        'size' => mb_substr(trim((string) ($item['size'] ?? '')), 0, 100),
    ];
    if ($cleanItem['plant'] !== '' || $cleanItem['quantity'] !== '' || $cleanItem['size'] !== '') $plantItems[] = $cleanItem;
}

if ($fullName === '' || $companyName === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['error' => 'Please provide your name, company, and a valid email address.']);
}

$attachments = [];
$attachment = $body['attachment'] ?? null;
if (is_array($attachment)) {
    $name = basename(trim((string) ($attachment['name'] ?? '')));
    $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    $allowedExtensions = ['xlsx', 'xls', 'csv', 'pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
    $size = (int) ($attachment['size'] ?? 0);
    $content = (string) ($attachment['contentBytes'] ?? '');
    if (!in_array($extension, $allowedExtensions, true)) {
        respond(400, ['error' => 'Unsupported attachment type.']);
    }
    if ($size < 1 || $size > (int) (2.5 * 1024 * 1024) || $content === '' || base64_decode($content, true) === false) {
        respond(400, ['error' => 'The attachment must be a valid file smaller than 2.5 MB.']);
    }
    $attachments[] = ['filename' => mb_substr($name, 0, 180), 'content' => $content];
}

if ($plantList === '' && !$attachments) {
    respond(400, ['error' => 'Enter your plant requirements or attach a plant list.']);
}

$apiKey = env_value('RESEND_API_KEY');
$fromEmail = env_value('RESEND_FROM_EMAIL');
$recipientEmail = env_value('QUOTE_RECIPIENT_EMAIL', $fromEmail);
$fromName = env_value('RESEND_FROM_NAME', 'Green Flow Nurseries');
if ($apiKey === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('Quote endpoint: Resend environment variables are missing or invalid.');
    respond(500, ['error' => 'The quote email service is not configured.']);
}

$details = [
    'Name' => $fullName,
    'Company' => $companyName,
    'Email' => $email,
    'Phone' => text_value($body, 'phone', 60) ?: 'Not provided',
    'Fulfillment' => text_value($body, 'fulfillment', 40) ?: 'Not specified',
    'Location' => text_value($body, 'location', 160) ?: 'Not provided',
    'Required by' => text_value($body, 'requiredBy', 30) ?: 'Not provided',
    'Project notes' => $projectNotes ?: 'None',
];
$rows = '';
foreach ($details as $label => $value) {
    $rows .= '<tr><th style="padding:8px;text-align:left;vertical-align:top">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</th><td style="padding:8px;white-space:pre-wrap">' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</td></tr>';
}
$plantTableRows = '';
foreach ($plantItems as $item) {
    $plantTableRows .= '<tr><td style="padding:8px;border:1px solid #ccc">' . htmlspecialchars($item['plant'] ?: 'Not specified', ENT_QUOTES, 'UTF-8') . '</td><td style="padding:8px;border:1px solid #ccc">' . htmlspecialchars($item['quantity'] ?: 'Not specified', ENT_QUOTES, 'UTF-8') . '</td><td style="padding:8px;border:1px solid #ccc">' . htmlspecialchars($item['size'] ?: 'Not specified', ENT_QUOTES, 'UTF-8') . '</td></tr>';
}
$plantTable = $plantItems
    ? '<table style="width:100%;border-collapse:collapse"><thead><tr><th style="padding:8px;border:1px solid #ccc;text-align:left">Plant or species</th><th style="padding:8px;border:1px solid #ccc;text-align:left">Quantity</th><th style="padding:8px;border:1px solid #ccc;text-align:left">Size</th></tr></thead><tbody>' . $plantTableRows . '</tbody></table>'
    : '<p>' . ($attachments ? 'See attached plant list.' : htmlspecialchars($plantList, ENT_QUOTES, 'UTF-8')) . '</p>';
$emailSignature = '<p style="margin:24px 0 4px">Green Flow Nurseries</p><p style="margin:0 0 12px"><a href="tel:+18334989898" style="color:#0f4229;text-decoration:none">1-833-498-9898</a></p><img src="https://greenflownurseries.com/favicon.png" alt="Green Flow Nurseries" width="96" style="display:block;width:96px;height:auto;border:0">';

$payload = [
    'from' => $fromName . ' <' . $fromEmail . '>',
    'to' => [$recipientEmail],
    'reply_to' => $email,
    'subject' => 'New quote request — ' . $companyName,
    'html' => '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#24352b"><h2>New Green Flow Nurseries website quote request</h2><table style="border-collapse:collapse">' . $rows . '</table><h3>Plant list</h3>' . $plantTable . $emailSignature . '</div>',
];
if ($attachments) {
    $payload['attachments'] = $attachments;
}

$curl = curl_init('https://api.resend.com/emails');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 20,
]);
$result = curl_exec($curl);
$curlError = curl_error($curl);
$status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($result === false || $status < 200 || $status >= 300) {
    error_log('Quote endpoint: Resend failed with HTTP ' . $status . ': ' . ($curlError ?: (string) $result));
    respond(502, ['error' => 'We could not send your request. Please try again or email us directly.']);
}

$customerDetails = [
    'Fulfillment' => text_value($body, 'fulfillment', 40) ?: 'Not specified',
    'Location' => text_value($body, 'location', 160) ?: 'Not provided',
    'Required by' => text_value($body, 'requiredBy', 30) ?: 'Not provided',
    'Project notes' => $projectNotes ?: 'None',
];
$customerRows = '';
foreach ($customerDetails as $label => $value) {
    $customerRows .= '<tr><th style="padding:8px;text-align:left;vertical-align:top;color:#0f4229">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</th><td style="padding:8px;white-space:pre-wrap">' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</td></tr>';
}
$customerPayload = [
    'from' => $fromName . ' <' . $fromEmail . '>',
    'to' => [$email],
    'reply_to' => $recipientEmail,
    'subject' => 'We received your quote request',
    'html' => '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#24352b"><h2 style="color:#0f4229">Thank you, ' . htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8') . '.</h2><p>We have received your quote request and our nursery team will review it shortly.</p><p>If we need more information about availability, substitutions, delivery, or timing, we will contact you directly.</p><h3 style="color:#0f4229">Your request summary</h3><table style="border-collapse:collapse">' . $customerRows . '</table><h3 style="color:#0f4229">Plant list</h3>' . $plantTable . $emailSignature . '</div>',
];
$customerCurl = curl_init('https://api.resend.com/emails');
curl_setopt_array($customerCurl, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'], CURLOPT_POSTFIELDS => json_encode($customerPayload), CURLOPT_TIMEOUT => 20]);
$customerResult = curl_exec($customerCurl);
$customerCurlError = curl_error($customerCurl);
$customerStatus = (int) curl_getinfo($customerCurl, CURLINFO_HTTP_CODE);
curl_close($customerCurl);
if ($customerResult === false || $customerStatus < 200 || $customerStatus >= 300) error_log('Customer quote acknowledgement failed: ' . $customerStatus . ' ' . ($customerCurlError ?: (string) $customerResult));

$resendResult = json_decode((string) $result, true);
respond(200, ['ok' => true, 'id' => $resendResult['id'] ?? null]);
