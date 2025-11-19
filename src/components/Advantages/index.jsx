import styles from "./Advantages.module.scss";
import { ReactComponent as ChampSVG } from "../../images/advantages/1.svg";
import { ReactComponent as StarSVG } from "../../images/advantages/2.svg";
import { ReactComponent as PipleSVG } from "../../images/advantages/3.svg";
import { ReactComponent as AutoSVG } from "../../images/advantages/4.svg";
import { ReactComponent as PriseSVG } from "../../images/advantages/5.svg";
import { ReactComponent as GiftSVG } from "../../images/advantages/6.svg";

const Advantages = () => {
  const advList = [
    {
      icon: <ChampSVG />,
      title: "Профессиональная сборка ПК",
      desc: `Кулер не охлаждает, блок питания слабый? – В наших сборках такого нет. Только идеальный концепт, где каждый компонент дополняет друг друга.`,
    },
    {
      icon: <StarSVG />,
      title: "Фирменная гарантия",
      desc: `Мы предоставляем гарантию на наши компьютеры в 1 год.
      По истечении действует гарантия от производителя.`,
    },
    {
      icon: <PipleSVG />,
      title: "Помощь в настройке ПК",
      desc: `При возникновении проблем с настройкой ПО или работой ПК – экстренно ответим и поможем. Сделаем все, чтобы вы начали комфортно пользоваться устройством.`,
    },
    {
      icon: <AutoSVG />,
      title: "Доставка по всей России",
      desc: `Бережно доставим ПК по всей территории РФ. А при повреждении груза – компенсируется 100% стоимость ущерба. `,
    },
    {
      icon: <PriseSVG />,
      title: "Сертифицированные компоненты",
      desc: `В наших сборках вы встретите только сертифицированные компоненты от известных компаний, например: INTEL, ASUS, GIGABYTE, NVIDIA.`,
    },
    {
      icon: <GiftSVG />,
      title: 'Бонусы от VA-PC',
      desc: `Мы добавили систему скидок. Регулярно проводим розыгрыши и акции. Снизить стоимость ПК и получить ценный приз – реально.`,
    },
  ];
  return (
    <div className={styles.advantages}>
      {advList.map((item, index) => {
        return <div key={index} className={styles.advantagesItem}>
          <div className={styles.advantagesIcon}>
              {item.icon}
          </div>
          <p className={styles.advantagesItemTitle}>{item.title}</p>
          <p className={styles.advantagesItemDesc}>{item.desc}</p>
        </div>;
      })}
    </div>
  );
};

export default Advantages;
