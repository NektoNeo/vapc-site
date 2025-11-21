import styles from "./Socials.module.scss";
import { ReactComponent as DzenSVG } from "../../images/socials/dzen.svg";
import { ReactComponent as InstSVG } from "../../images/socials/inst.svg";
import { ReactComponent as YtSVG } from "../../images/socials/yt.svg";
import { ReactComponent as TgSVG } from "../../images/socials/tg.svg";
import { ReactComponent as VkSVG } from "../../images/socials/vk.svg";

const Socials = () => {
  const socialItems = [
    {
      img: <DzenSVG />,
      link: "https://dzen.ru/vapcbuild",
      alt: "Дзен",
      isYouTube: false,
      isInstagram: false,
    },
    {
      img: <InstSVG />,
      link: "https://instagram.com/vapcbuild",
      alt: "Instagram*",
      isYouTube: false,
      isInstagram: true,
    },
    {
      img: <YtSVG />,
      link: "https://www.youtube.com/@vapcbuild",
      alt: "YouTube",
      isYouTube: true,
      isInstagram: false,
    },
    {
      img: <TgSVG />,
      link: "https://t.me/vapcbuild",
      alt: "Telegram",
      isYouTube: false,
      isInstagram: false,
    },
    {
      img: <VkSVG />,
      link: "https://vk.com/vapcbuild",
      alt: "VK",
      isYouTube: false,
      isInstagram: false,
    },
  ];
  
  return (
    <div className={styles.socilas}>
      {socialItems.map((item, index) => (
        <div key={index} className={styles.socialWrapper}>
          <a
            target="_blank"
            aria-label={item.alt}
            href={item.link}
            className={`${styles.socialsItem} ${item.isYouTube ? styles.youtubeItem : ''}`} 
            rel="noreferrer"
          >
            {item.img}
          </a>
          {item.isInstagram && (
            <p className={styles.instagramWarning}>
              Meta признана экстремистской организацией на территории РФ
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Socials;
