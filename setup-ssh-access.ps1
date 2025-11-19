# Скрипт для настройки SSH доступа без пароля к серверу Beget
# Использование: .\setup-ssh-access.ps1

$serverIP = "45.141.76.200"
$serverUser = "root"
$password = "R9AuQIMM&gt&"
$pubKeyPath = "$env:USERPROFILE\.ssh\id_rsa.pub"

Write-Host "=== Настройка SSH доступа без пароля ===" -ForegroundColor Cyan
Write-Host "Сервер: $serverUser@$serverIP" -ForegroundColor Yellow
Write-Host ""

# Проверяем наличие публичного ключа
if (-not (Test-Path $pubKeyPath)) {
    Write-Host "ОШИБКА: Публичный ключ не найден!" -ForegroundColor Red
    Write-Host "Создайте ключ командой: ssh-keygen -t rsa -b 4096" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Публичный ключ найден" -ForegroundColor Green
Write-Host ""

# Читаем публичный ключ
$publicKey = Get-Content $pubKeyPath -Raw
Write-Host "Публичный ключ:" -ForegroundColor Cyan
Write-Host $publicKey.Trim()
Write-Host ""

# Проверяем наличие sshpass (для автоматической передачи пароля)
$sshpassAvailable = $false
try {
    $null = Get-Command sshpass -ErrorAction Stop
    $sshpassAvailable = $true
} catch {
    Write-Host "⚠️  sshpass не установлен. Используем альтернативный метод." -ForegroundColor Yellow
}

if ($sshpassAvailable) {
    Write-Host "Используем sshpass для автоматической передачи пароля..." -ForegroundColor Green
    
    # Создаем временный скрипт для добавления ключа
    $tempScript = @"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo '$($publicKey.Trim())' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
"@
    
    $tempScriptPath = "$env:TEMP\ssh-setup.sh"
    $tempScript | Out-File -FilePath $tempScriptPath -Encoding UTF8 -NoNewline
    
    # Копируем скрипт на сервер и выполняем
    Write-Host "Копируем ключ на сервер..." -ForegroundColor Yellow
    sshpass -p "$password" scp -o StrictHostKeyChecking=no $tempScriptPath "${serverUser}@${serverIP}:/tmp/ssh-setup.sh"
    sshpass -p "$password" ssh -o StrictHostKeyChecking=no "${serverUser}@${serverIP}" "bash /tmp/ssh-setup.sh && rm /tmp/ssh-setup.sh"
    
    Remove-Item $tempScriptPath -ErrorAction SilentlyContinue
} else {
    Write-Host "=== ИНСТРУКЦИЯ ДЛЯ РУЧНОГО КОПИРОВАНИЯ ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Скопируйте публичный ключ выше" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Выполните команду:" -ForegroundColor White
    Write-Host "   ssh $serverUser@$serverIP" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. После входа на сервер выполните:" -ForegroundColor White
    Write-Host "   mkdir -p ~/.ssh" -ForegroundColor Cyan
    Write-Host "   chmod 700 ~/.ssh" -ForegroundColor Cyan
    Write-Host "   nano ~/.ssh/authorized_keys" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "4. Вставьте публичный ключ в файл и сохраните (Ctrl+O, Enter, Ctrl+X)" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Установите правильные права:" -ForegroundColor White
    Write-Host "   chmod 600 ~/.ssh/authorized_keys" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "6. Выйдите из SSH (exit)" -ForegroundColor White
    Write-Host ""
    Write-Host "=== АЛЬТЕРНАТИВНЫЙ МЕТОД (автоматический) ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Используйте команду ssh-copy-id (если установлен):" -ForegroundColor White
    Write-Host "   ssh-copy-id $serverUser@$serverIP" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Или используйте expect скрипт (см. setup-ssh-access-expect.sh)" -ForegroundColor White
}

Write-Host ""
Write-Host "=== ПРОВЕРКА ПОДКЛЮЧЕНИЯ ===" -ForegroundColor Cyan
Write-Host "После настройки проверьте подключение:" -ForegroundColor White
Write-Host "   ssh $serverUser@$serverIP" -ForegroundColor Cyan
Write-Host ""
Write-Host "Если всё настроено правильно, пароль запрашиваться не будет!" -ForegroundColor Green

