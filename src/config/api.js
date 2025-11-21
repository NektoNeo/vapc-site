// Конфигурация API
// Для разработки используйте переменную окружения REACT_APP_API_URL
// Для production на Beget API будет на том же домене

const getApiUrl = () => {
  // Если указана переменная окружения - используем её (приоритет)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // В production (на Beget) проверяем текущий домен
  if (process.env.NODE_ENV === 'production') {
    // Если фронтенд на том же домене что и бэкенд - используем относительные пути
    // Иначе нужно указать REACT_APP_API_URL в build-time переменных
    const currentHost = typeof window !== 'undefined' ? window.location.origin : '';
    
    // Для va-pc.ru используем тот же домен
    if (currentHost.includes('va-pc.ru') || currentHost.includes('vasinayw.beget.app')) {
      return ''; // Относительные пути
    }
    
    // По умолчанию для production - относительные пути
    return '';
  }
  
  // Для разработки можно указать URL бэкенда на Beget
  // Например: 'https://your-domain.beget.app' или 'http://localhost:3001'
  return process.env.REACT_APP_API_URL || '';
};

export const API_BASE_URL = getApiUrl();

// Вспомогательная функция для создания полного URL
export const apiUrl = (endpoint) => {
  // Убираем начальный слеш если он есть
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Сохраняем информацию о том, был ли конечный слеш в оригинальном endpoint
  const hadTrailingSlash = endpoint.endsWith('/');
  // Убираем конечный слеш для обработки
  cleanEndpoint = cleanEndpoint.endsWith('/') ? cleanEndpoint.slice(0, -1) : cleanEndpoint;
  
  if (API_BASE_URL) {
    // Убираем слеш в конце API_BASE_URL если он есть
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    // Добавляем слеш в конце если он был в оригинальном endpoint (чтобы избежать редиректа)
    return hadTrailingSlash ? `${baseUrl}/${cleanEndpoint}/` : `${baseUrl}/${cleanEndpoint}`;
  }
  return hadTrailingSlash ? `/${cleanEndpoint}/` : `/${cleanEndpoint}`;
};

// Логирование для отладки (только в development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    API_BASE_URL: API_BASE_URL || '(относительные пути)',
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || '(не задано)',
    currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'SSR'
  });
}

