import styles from "./ProductConfig.module.scss";
import { ReactComponent as ProcSVG } from "../../../images/telegram/product/proc.svg";
import { ReactComponent as MomSVG } from "../../../images/telegram/product/mom.svg";
import { ReactComponent as VideoSVG } from "../../../images/telegram/product/video.svg";
import { ReactComponent as RamSVG } from "../../../images/telegram/product/ram.svg";
import { ReactComponent as SsdSVG } from "../../../images/telegram/product/ssd.svg";
import { ReactComponent as HddSVG } from "../../../images/telegram/product/hdd.svg";
import { ReactComponent as ColdSVG } from "../../../images/telegram/product/cold.svg";
import { ReactComponent as BoxSVG } from "../../../images/telegram/product/box.svg";
import { ReactComponent as CoolSVG } from "../../../images/telegram/product/cool.svg";
import { ReactComponent as PowerSVG } from "../../../images/telegram/product/power.svg";
const devices = [
  {
    value: "Intel Core i9-14700KF",
    icon: <ProcSVG />,
    title: "Процессор:",
  },
  {
    value: "B660-PLUS (LGA1700, ATX)",
    icon: <MomSVG />,
    title: "Материнская плата:",
  },
  {
    value: "Nvidia GeForce RTX 4070 OC 12G",
    icon: <VideoSVG />,
    title: "Видеокарта:",
  },
  {
    value: "Kingston FURY Beast Black RGB 3600 МГЦ, 32 ГБ (16x2)",
    icon: <RamSVG />,
    title: "ОЗУ:",
  },
  {
    value: "Samsung 980 PRO M.2, 1 ТБ",
    icon: <SsdSVG />,
    title: "SSD накопитель:",
  },
  {
    value: "2.0 ТБ",
    icon: <HddSVG />,
    title: "HDD:",
  },
  {
    value: "DEEPCOOL GAMMAXX L240 A-RGB",
    icon: <ColdSVG />,
    title: "Система жидкостного охлаждения:",
  },
  {
    value: "1STPLAYER STEAMPUNK SP7 Black",
    icon: <BoxSVG />,
    title: "Корпус: ",
  },
  {
    value: "DEEPCOOL FC120-(3 в 1) 3 комплекта",
    icon: <CoolSVG />,
    title: "Вентиляторы корпусные:",
  },
  {
    value: "DEEPCOOL PK750D",
    icon: <PowerSVG />,
    title: "Блок питания: ",
  },
];

export const ProductConfig = () => {
  return devices.map(({ icon, title, value }) => {
    return (
      <div className={styles.device}>
        <div className={styles.deviceInfo}>
          <div className={styles.deviceIcon}>{icon}</div>
          <div className={styles.deviceTitle}>{title}</div>
        </div>
        <div className={styles.deviceValue}>{value}</div>
      </div>
    );
  });
};
