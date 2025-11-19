import styles from './NewsBlock.module.scss';
import Slider from "react-slick";
import background2 from '../../images/news/background_2.png';
import background3 from '../../images/news/background_3.png';
import background4 from '../../images/news/background_4.png';
import background5 from '../../images/news/background_5.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { apiUrl } from "../../config/api";

const NewsBlock = () => {
  const [banners, updateBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('🎬 NewsBlock: компонент смонтирован, начинаем загрузку баннеров');
    getBannersData()
  }, [])
  const getBannersData = async () => {
    try {
      const url = apiUrl('/getBanners/');
      console.log('🔍 Запрос баннеров:', url);
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('📡 Ответ сервера:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('📦 Получены баннеры (сырые данные):', json);
      
      // Проверяем что получили массив
      if (!Array.isArray(json)) {
        console.error('❌ Ожидался массив, получено:', typeof json);
        updateBanners([]);
        return;
      }
      
      // Фильтруем только валидные баннеры с изображениями
      const validBanners = json.filter(banner => banner && banner.image);
      console.log('✅ Валидных баннеров:', validBanners.length, 'из', json.length);
      
      if (validBanners.length === 0) {
        console.warn('⚠️ Нет валидных баннеров для отображения');
        updateBanners([]);
        return;
      }
      
      // Сортируем по position (преобразуем в число для корректной сортировки)
      const sortedBanners = validBanners.sort((a, b) => {
        const posA = parseInt(a.position) || 999;
        const posB = parseInt(b.position) || 999;
        return posA - posB;
      });
      
      updateBanners(sortedBanners);
      setIsLoading(false);
      console.log('✅ Данные баннеров получены из базы данных:', sortedBanners.length, 'шт.');
    } catch (error) {
      console.error('❌ Ошибка при загрузке баннеров из БД:', error);
      console.error('❌ Детали ошибки:', {
        message: error.message,
        stack: error.stack,
        url: apiUrl('/getBanners/')
      });
      console.log('⚠️ Баннеры не загружены. Проверьте подключение к API серверу.');
      // Оставляем пустой массив, так как статических баннеров нет
      updateBanners([]);
      setIsLoading(false);
    }
  }
  
  // Показываем состояние загрузки
  if (isLoading) {
    console.log('⏳ NewsBlock: загрузка данных...');
    return null; // или можно показать loader
  }
  
  // Не рендерим блок если нет баннеров после загрузки
  // В режиме разработки показываем сообщение для отладки
  if (!banners || banners.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ NewsBlock: нет баннеров для отображения после загрузки');
      // В режиме разработки показываем placeholder вместо полного скрытия
      return (
        <div className={styles.content} style={{padding: '20px', textAlign: 'center', color: '#fff'}}>
          <p>Баннеры не загружены. Проверьте CORS и подключение к API.</p>
          <p style={{fontSize: '12px', opacity: 0.7}}>URL: {apiUrl('/getBanners/')}</p>
        </div>
      );
    }
    return null;
  }
  
  console.log('✅ NewsBlock: рендерим', banners.length, 'баннеров');

  return (
    <div className={styles.content}>
      <Slider arrows={false} autoplay autoplaySpeed={6000}>
        { banners.map((item) => {
          return (
            <a key={item.id || item.image} href={item.link || '#'}>
              <img src={item.image} alt={item.id || 'Баннер'} />
            </a>
          );
        }) }
      </Slider>
    </div>
  )
}

export default NewsBlock;