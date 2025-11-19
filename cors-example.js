// ============================================
// ПРИМЕР НАСТРОЙКИ CORS ДЛЯ БЭКЕНДА НА BEGET
// ============================================
// Скопируйте этот код в ваш server.js или app.js

const express = require('express');
const cors = require('cors');
const app = express();

// ============================================
// ВАРИАНТ 1: Простая настройка (для начала)
// ============================================
app.use(cors({
  origin: [
    'https://vasinayw.beget.app',  // Ваш production домен
    'http://localhost:3000'        // Локальная разработка
  ],
  credentials: true
}));

// ============================================
// ВАРИАНТ 2: Расширенная настройка (рекомендуется)
// ============================================
/*
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://vasinayw.beget.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    // Разрешить запросы без origin (Postman, мобильные приложения)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
*/

// ============================================
// ВАРИАНТ 3: Для разных окружений
// ============================================
/*
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vasinayw.beget.app']
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://vasinayw.beget.app'
      ],
  credentials: true
};

app.use(cors(corsOptions));
*/

// Обработка preflight запросов (OPTIONS)
app.options('*', cors());

// Парсинг JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ПРИМЕРЫ РОУТОВ
// ============================================

// GET запрос
app.get('/getProducts/', async (req, res) => {
  try {
    // Ваш код для получения продуктов из БД
    // const products = await db.query('SELECT * FROM products');
    res.json([]); // Замените на реальные данные
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST запрос
app.post('/sendMail/', async (req, res) => {
  try {
    // Ваш код для отправки почты
    console.log('Received data:', req.body);
    res.json({ success: true, message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ЗАПУСК СЕРВЕРА
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for: https://vasinayw.beget.app, http://localhost:3000`);
});

