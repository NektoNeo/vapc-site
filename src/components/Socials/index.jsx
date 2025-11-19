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
      desc: "",
      alt: "Дзен",
    },
    {
      img: <InstSVG />,
      link: "https://instagram.com/vapcbuild",
      desc: "Meta признана экстремистской организацией на территории РФ",
      alt: "Инстаграм",
    },
    {
      img: <YtSVG />,
      link: "https://www.youtube.com/@vapcbuild",
      desc: "",
      alt: "Ютуб",
    },
    {
      img: <TgSVG />,
      link: "https://t.me/vapcbuild",
      desc: "",
      alt: "Телеграм",
    },
    {
      img: <VkSVG />,
      link: "https://vk.com/vapcbuild",
      desc: "",
      alt: "Вконтакте",
    },
  ];
  return (
    <div className={styles.socilas}>
      {socialItems.map((item, index) => {
        return (
          <a
            key={index}
            target="_blank"
            aria-label={item.alt}
            href={item.link}
            className={styles.socialsItem} rel="noreferrer"
          >
            {item.img}
            <div className={styles.socialItemDesc}>{item.desc}</div>
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
