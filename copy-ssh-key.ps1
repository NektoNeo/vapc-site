# Автоматическое копирование SSH ключа на сервер
# Использует встроенные возможности PowerShell для передачи пароля

$serverIP = "45.141.76.200"
$serverUser = "root"
$password = "R9AuQIMM&gt&"
$pubKeyPath = "$env:USERPROFILE\.ssh\id_rsa.pub"

Write-Host "=== Копирование SSH ключа на сервер ===" -ForegroundColor Cyan
Write-Host "Сервер: $serverUser@$serverIP" -ForegroundColor Yellow
Write-Host ""

# Читаем публичный ключ
$publicKey = (Get-Content $pubKeyPath -Raw).Trim()

Write-Host "Публичный ключ:" -ForegroundColor Cyan
Write-Host $publicKey
Write-Host ""

# Создаем команды для выполнения на сервере
$commands = @"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo '$publicKey' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
"@

# Сохраняем команды во временный файл
$tempScript = "$env:TEMP\ssh-setup-commands.sh"
$commands | Out-File -FilePath $tempScript -Encoding UTF8 -NoNewline

Write-Host "Попытка автоматического копирования ключа..." -ForegroundColor Yellow
Write-Host ""

# Пробуем использовать plink (PuTTY) если доступен
$plinkPath = "plink.exe"
if (Get-Command $plinkPath -ErrorAction SilentlyContinue) {
    Write-Host "Используем plink..." -ForegroundColor Green
    $plinkPath = (Get-Command $plinkPath).Source
    echo y | & $plinkPath -ssh "$serverUser@$serverIP" -pw $password "bash -s" < $tempScript
} else {
    Write-Host "⚠️  plink не найден. Используем ручной метод." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "=== РУЧНОЕ КОПИРОВАНИЕ ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Выполните команду:" -ForegroundColor White
    Write-Host "   ssh $serverUser@$serverIP" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Введите пароль: $password" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Выполните следующие команды на сервере:" -ForegroundColor White
    Write-Host $commands -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Или используйте одну команду:" -ForegroundColor White
    Write-Host "   echo '$publicKey' | ssh $serverUser@$serverIP 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'" -ForegroundColor Cyan
}

Remove-Item $tempScript -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== ПРОВЕРКА ===" -ForegroundColor Cyan
Write-Host "После копирования проверьте:" -ForegroundColor White
Write-Host "   ssh $serverUser@$serverIP" -ForegroundColor Cyan
Write-Host ""
Write-Host "Пароль запрашиваться не должен!" -ForegroundColor Green

