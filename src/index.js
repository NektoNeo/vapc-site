import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Защита от ошибок с className.split в внешних скриптах (Yandex Metrika и др.)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Патчим className свойство для всех элементов, чтобы оно всегда возвращало строку
  const patchClassName = () => {
    try {
      // Получаем дескриптор для HTMLElement или Element
      const elementProto = HTMLElement.prototype || Element.prototype;
      const originalClassNameDescriptor = Object.getOwnPropertyDescriptor(elementProto, 'className');
      
      if (originalClassNameDescriptor) {
        // Переопределяем getter для className
        Object.defineProperty(elementProto, 'className', {
          get: function() {
            // Используем classList для получения строки классов
            if (this.classList && this.classList.length > 0) {
              return Array.from(this.classList).join(' ');
            }
            return '';
          },
          set: function(value) {
            // Очищаем классы
            if (this.classList) {
              this.classList.value = '';
              // Добавляем новые классы
              if (value) {
                const classes = typeof value === 'string' 
                  ? value.split(/\s+/).filter(c => c.trim()) 
                  : [];
                classes.forEach(cls => {
                  if (cls && cls.trim()) {
                    this.classList.add(cls.trim());
                  }
                });
              }
            }
          },
          configurable: true,
          enumerable: true
        });
      }
    } catch (e) {
      // Если патч не удался, используем обработчик ошибок
      console.warn('Не удалось патчить className, используем обработчик ошибок');
    }
  };
  
  // Пытаемся патчить сразу
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchClassName);
  } else {
    patchClassName();
  }
  
  // Также патчим после загрузки всех скриптов
  window.addEventListener('load', patchClassName);
  
  // Используем MutationObserver для патчинга новых элементов
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.className !== undefined) {
          // Убеждаемся, что className - строка
          if (typeof node.className !== 'string') {
            try {
              if (node.classList) {
                node.className = Array.from(node.classList).join(' ');
              } else {
                node.className = '';
              }
            } catch (e) {
              // Игнорируем ошибки
            }
          }
        }
      });
    });
  });
  
  // Начинаем наблюдение за изменениями DOM
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    });
  }
  
  // Перехватываем ошибки с className.split как резервный вариант
  const originalErrorHandler = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    // Игнорируем ошибки связанные с className.split
    if (message && typeof message === 'string' && 
        (message.includes('className.split') || 
         message.includes('split is not a function'))) {
      console.warn('Ошибка с className.split перехвачена и обработана');
      return true; // Предотвращаем вывод ошибки в консоль
    }
    // Вызываем оригинальный обработчик для остальных ошибок
    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, source, lineno, colno, error);
    }
    return false;
  };
  
  // Также перехватываем unhandledrejection для промисов
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && 
        typeof event.reason.message === 'string' &&
        event.reason.message.includes('className.split')) {
      event.preventDefault();
      console.warn('Необработанная ошибка с className.split перехвачена');
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider 
      reCaptchaKey="6Lez_wIqAAAAANDZXnheT_-h8g30Yq_f7FbqMdHr"
      language="ru"
    >
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
