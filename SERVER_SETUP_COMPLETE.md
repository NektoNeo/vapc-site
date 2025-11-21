# ✅ Настройка сервера завершена!

## 🎯 Что было сделано на сервере:

1. ✅ **Установлен пакет `cors`**
   ```bash
   npm install cors
   ```

2. ✅ **Добавлена конфигурация CORS в `/var/www/server/index.js`**
   - Разрешены запросы с `https://vasinayw.beget.app`
   - Разрешены запросы с `https://va-pc.ru`
   - Разрешены запросы с `http://localhost:3000` (для локальной разработки)
   - Разрешены запросы с `http://127.0.0.1:3000`

3. ✅ **Настроена обработка preflight запросов (OPTIONS)**

4. ✅ **Сервер перезапущен через PM2**

## 📋 Конфигурация CORS:

```javascript
app.use(cors({
  origin: [
    'https://vasinayw.beget.app',
    'https://va-pc.ru',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.options('*', cors());
```

## 🔍 Проверка работы:

### На сервере:
```bash
curl -I -X OPTIONS http://localhost:8080/getProducts/ \
  -H 'Origin: http://localhost:3000' \
  -H 'Access-Control-Request-Method: GET'
```

Должны быть заголовки:
- `Access-Control-Allow-Origin: http://localhost:3000`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`

### Локально:
1. Откройте `http://localhost:3000` в браузере
2. Откройте консоль (F12)
3. Проверьте Network tab - запросы должны проходить без CORS ошибок

## 📝 Информация о сервере:

- **IP:** 45.141.76.200
- **Порт:** 8080
- **Процесс:** PM2 (vapc)
- **Файл:** `/var/www/server/index.js`
- **База данных:** `vasinayw_vapc` на `vasinayw.beget.tech`

## ✅ Готово к работе!

Теперь ваш фронтенд на `localhost:3000` может делать запросы к бэкенду на Beget без CORS ошибок!

