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
    getBannersData();
  }, []);

  const getBannersData = async () => {
    try {
      const url = apiUrl('/getBanners/');
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      if (!Array.isArray(json)) {
        updateBanners([]);
        return;
      }
      
      const validBanners = json.filter(banner => banner && banner.image);
      const sortedBanners = validBanners.sort((a, b) => {
        const posA = parseInt(a.position) || 999;
        const posB = parseInt(b.position) || 999;
        return posA - posB;
      });
      
      updateBanners(sortedBanners);
    } catch (error) {
      updateBanners([
        { id: 'bg2', image: background2 },
        { id: 'bg3', image: background3 },
        { id: 'bg4', image: background4 },
        { id: 'bg5', image: background5 },
      ]);
    } finally {
      setIsLoading(false);
    }
  }
  
  if (isLoading) {
    return null;
  }
  
  if (!banners || banners.length === 0) {
    return null;
  }

  const sliderSettings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5500,
    dots: true,
    pauseOnHover: true,
    cssEase: "ease-out"
  };

  return (
    <div className={styles.content}>
      <Slider {...sliderSettings}>
        { banners.map((item) => {
          return (
            <a key={item.id || item.image} href={item.link || '#'} className={styles.slide}>
              <img src={item.image} alt={item.id || 'Баннер'} />
            </a>
          );
        }) }
      </Slider>
    </div>
  )
}

export default NewsBlock;
