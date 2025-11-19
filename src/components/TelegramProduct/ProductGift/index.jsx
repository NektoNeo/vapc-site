import styles from "./ProductGift.module.scss";
import { ReactComponent as GalkaSVG } from "../../../images/telegram/gift/galka.svg";
import { ReactComponent as BiosSVG } from "../../../images/telegram/gift/bios.svg";
import { ReactComponent as DriversSVG } from "../../../images/telegram/gift/drivers.svg";
import { ReactComponent as OfficeSVG } from "../../../images/telegram/gift/office.svg";
import { ReactComponent as WindowsSVG } from "../../../images/telegram/gift/windows.svg";
const gifts = [
  {
    icon: <GalkaSVG />,
    text: "Настроен и готов к работе",
  },
  {
    icon: <WindowsSVG />,
    text: "Активированный windows 10/11",
  },
  {
    icon: <BiosSVG />,
    text: "Настроенный BIOS с XMP профилями",
  },
  {
    icon: <DriversSVG />,
    text: "Полный пакет драйверов",
  },
  {
    icon: <OfficeSVG />,
    text: "Активированный Microsoft Office",
  },
];

export const ProductGift = () => {
  return gifts.map(({ icon, text }) => {
    return <div className={styles.giftItem}>
      <div className={styles.giftIcon}>{icon}</div>
      <div className={styles.giftText}>{text}</div>
    </div>;
  });
};
