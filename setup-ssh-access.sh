#!/bin/bash
# Скрипт для автоматической настройки SSH доступа без пароля
# Использование: bash setup-ssh-access.sh

SERVER_IP="45.141.76.200"
SERVER_USER="root"
PASSWORD="R9AuQIMM&gt&"
PUB_KEY_PATH="$HOME/.ssh/id_rsa.pub"

echo "=== Настройка SSH доступа без пароля ==="
echo "Сервер: $SERVER_USER@$SERVER_IP"
echo ""

# Проверяем наличие публичного ключа
if [ ! -f "$PUB_KEY_PATH" ]; then
    echo "ОШИБКА: Публичный ключ не найден!"
    echo "Создайте ключ командой: ssh-keygen -t rsa -b 4096"
    exit 1
fi

echo "✅ Публичный ключ найден"
echo ""

# Читаем публичный ключ
PUBLIC_KEY=$(cat "$PUB_KEY_PATH")
echo "Публичный ключ:"
echo "$PUBLIC_KEY"
echo ""

# Проверяем наличие sshpass
if command -v sshpass &> /dev/null; then
    echo "Используем sshpass для автоматической передачи пароля..."
    
    # Создаем скрипт для добавления ключа
    cat > /tmp/ssh-setup.sh << EOF
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
EOF
    
    # Копируем скрипт на сервер и выполняем
    echo "Копируем ключ на сервер..."
    sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no /tmp/ssh-setup.sh "${SERVER_USER}@${SERVER_IP}:/tmp/ssh-setup.sh"
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" "bash /tmp/ssh-setup.sh && rm /tmp/ssh-setup.sh"
    
    rm /tmp/ssh-setup.sh
    
    echo ""
    echo "✅ Ключ успешно скопирован на сервер!"
else
    echo "⚠️  sshpass не установлен."
    echo ""
    echo "Установите sshpass:"
    echo "  Ubuntu/Debian: sudo apt-get install sshpass"
    echo "  macOS: brew install sshpass"
    echo "  или используйте ssh-copy-id:"
    echo "  ssh-copy-id $SERVER_USER@$SERVER_IP"
fi

echo ""
echo "=== Проверка подключения ==="
echo "Проверьте подключение:"
echo "  ssh $SERVER_USER@$SERVER_IP"
echo ""
echo "Если всё настроено правильно, пароль запрашиваться не будет!"

