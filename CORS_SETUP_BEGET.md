# 🔧 Настройка CORS на Beget для Node.js бэкенда

## 📋 Что такое CORS и зачем он нужен?

CORS (Cross-Origin Resource Sharing) - это механизм безопасности браузера, который разрешает веб-страницам делать запросы к серверам на других доменах.

**Проблема:** Браузер блокирует запросы с `http://localhost:3000` к `https://vasinayw.beget.app` по соображениям безопасности.

**Решение:** Настроить CORS на бэкенде, чтобы разрешить запросы с вашего фронтенда.

## 🚀 Настройка CORS для Express.js (самый популярный вариант)

### Шаг 1: Установите пакет cors (если еще не установлен)

На вашем бэкенде на Beget выполните:

```bash
npm install cors
```

### Шаг 2: Настройте CORS в вашем бэкенде

Откройте главный файл вашего сервера (обычно `server.js`, `app.js` или `index.js`) и добавьте:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Настройка CORS
app.use(cors({
  origin: [
    'https://vasinayw.beget.app',  // Production фронтенд на Beget
    'http://localhost:3000',        // Локальная разработка
    'http://localhost:3001',        // Если используете другой порт
    'http://127.0.0.1:3000'         // Альтернативный localhost
  ],
  credentials: true,                // Разрешить отправку cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Остальной код вашего сервера...
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## 🔒 Более строгая настройка (рекомендуется для production)

```javascript
const cors = require('cors');

// Функция для проверки origin
const corsOptions = {
  origin: function (origin, callback) {
    // Список разрешенных доменов
    const allowedOrigins = [
      'https://vasinayw.beget.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    // Разрешить запросы без origin (например, Postman, мобильные приложения)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
```

## 🌐 Настройка для разных окружений

### Вариант 1: Разные настройки для dev и production

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vasinayw.beget.app']  // Только production домен
    : [                                // В разработке разрешаем localhost
        'http://localhost:3000',
        'http://localhost:3001',
        'https://vasinayw.beget.app'
      ],
  credentials: true
};

app.use(cors(corsOptions));
```

### Вариант 2: Использование переменных окружения

Создайте файл `.env` на бэкенде:

```env
NODE_ENV=production
ALLOWED_ORIGINS=https://vasinayw.beget.app,http://localhost:3000
```

И в коде:

```javascript
require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

## 📝 Полный пример сервера Express.js

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS настройка
app.use(cors({
  origin: [
    'https://vasinayw.beget.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Парсинг JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ваши роуты
app.get('/getProducts/', async (req, res) => {
  try {
    // Ваш код для получения продуктов
    const products = await getProductsFromDB();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/sendMail/', async (req, res) => {
  try {
    // Ваш код для отправки почты
    await sendEmail(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обработка OPTIONS запросов (preflight)
app.options('*', cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🔍 Где находится бэкенд на Beget?

Обычно структура проекта на Beget выглядит так:

```
/home/v/vasinayw/
├── public_html/          # Фронтенд (статичные файлы)
│   └── build/            # Собранный React
└── backend/              # Node.js бэкенд (или в другом месте)
    ├── server.js         # Главный файл сервера
    ├── package.json
    └── .env
```

Или бэкенд может быть в:
- `/home/v/vasinayw/node/`
- `/home/v/vasinayw/api/`
- В корне проекта рядом с фронтендом

## 📍 Как найти файл сервера на Beget?

1. **Через SSH:**
   ```bash
   ssh vasinayw@vasinayw.beget.tech
   cd ~
   find . -name "server.js" -o -name "app.js" -o -name "index.js" | grep -v node_modules
   ```

2. **Через файловый менеджер Beget:**
   - Войдите в панель управления
   - Откройте файловый менеджер
   - Найдите файл с сервером (обычно `server.js`, `app.js` или `index.js`)

## ✅ Проверка работы CORS

После настройки проверьте:

1. **Откройте консоль браузера (F12)** на `http://localhost:3000`
2. **Проверьте Network tab** - запросы должны проходить без ошибок CORS
3. **Проверьте заголовки ответа:**
   ```
   Access-Control-Allow-Origin: http://localhost:3000
   Access-Control-Allow-Credentials: true
   ```

## 🐛 Решение проблем

### Проблема: "Access-Control-Allow-Origin" ошибка

**Решение:**
- Убедитесь, что добавили `http://localhost:3000` в список `origin`
- Проверьте, что сервер перезапущен после изменений
- Проверьте, что используется правильный порт

### Проблема: Credentials не работают

**Решение:**
- Убедитесь, что `credentials: true` установлено и на клиенте, и на сервере
- В fetch запросе добавьте: `credentials: 'include'`

### Проблема: Preflight запросы не проходят

**Решение:**
- Добавьте обработку OPTIONS:
  ```javascript
  app.options('*', cors());
  ```

## 🔐 Безопасность

⚠️ **Важно:** В production не используйте `origin: '*'` - это небезопасно!

✅ **Правильно:** Указывайте конкретные домены в массиве `origin`

## 📚 Дополнительные ресурсы

- [Документация cors для Express](https://expressjs.com/en/resources/middleware/cors.html)
- [MDN: CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS)

## 🎯 Быстрая настройка (копируйте и вставляйте)

```javascript
// Добавьте в начало вашего server.js или app.js
const cors = require('cors');

app.use(cors({
  origin: ['https://vasinayw.beget.app', 'http://localhost:3000'],
  credentials: true
}));
```

Готово! После этого ваш фронтенд сможет делать запросы к бэкенду на Beget.

