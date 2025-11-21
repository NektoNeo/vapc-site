export const goToLink = (link, type = '_blank') => {
  // Если это якорная ссылка (начинается с #), делаем плавную прокрутку
  if (link && link.startsWith('#')) {
    try {
      const element = document.querySelector(link);
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        return;
      }
    } catch (error) {
      console.warn('Ошибка при прокрутке к элементу:', error);
    }
  }
  // Для внешних ссылок открываем в новой вкладке
  if (link) {
    try {
      return window.open(
        link,
        type
      );
    } catch (error) {
      console.warn('Ошибка при открытии ссылки:', error);
    }
  }
}