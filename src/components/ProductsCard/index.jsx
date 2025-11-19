import Button from "../Button";
import styles from "./ProductsCard.module.scss";
import light from "../../images/backgrounds/light.svg";
import { ReactComponent as CpuSVG } from "../../images/products/cpu.svg";
import { ReactComponent as GpuSVG } from "../../images/products/gpu.svg";
import { ReactComponent as RamSVG } from "../../images/products/ram.svg";
import { ReactComponent as DiskSVG } from "../../images/products/disk.svg";
import { ReactComponent as WaltSVG } from "../../images/products/walt.svg";
import { ReactComponent as CoolSVG } from "../../images/products/cool.svg";
import { goToLink } from "../../helpers/helpers";

const ProductsCard = ({ title, image, forTo, devices, price, key }) => {
  // Защита от ошибок: проверяем что devices - строка
  const devicesString = typeof devices === 'string' ? devices : String(devices || '');
  const devicesArray = devicesString.split(',');
  
  const formattedPrice = parseInt((price || '0').toString().replace(/\./g, ''));
  const saveOnLocalStorage = (title) => {
    localStorage.setItem("PC", title);
    goToLink("#form", "_self");
  };
  const roundToNearest = (num) => {
    const nearest = 100;
    const roundedNum = Math.ceil(num / nearest) * nearest;
    return roundedNum;
  };
  const productWhiteTheme = () => {
    if (formattedPrice > 300000) {
      return (
        <>
          <img src={light} className={styles.productGoldShadow} alt="light" />
          <div className={styles.productPlanet} />
          <div className={styles.productWide} />
          <div className={styles.productSpeed} />
        </>
      );
    }
    if (formattedPrice > 100000) {
      return (
        <>
          <img src={light} className={styles.productPurpleShadow} alt="light" />
          <div className={styles.productPlanet} />
          <div className={styles.productWide} />
          <div className={styles.productSpeed} />
        </>
      );
    }
    return (
      <>
        <img src={light} className={styles.productWhiteShadow} alt="light" />
        <div className={styles.productPlanet} />
        <div className={styles.productWide} />
        <div className={styles.productSpeed} />
      </>
    );
  };
  return (
    <div className={styles.product} key={key}>
      <div className={styles.productWidth}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.productTitleShadow}>{title}</p>
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img className={styles.productImage} src={image} alt="компьютер" />
          </div>
          <div className={styles.productStats}>
            <div className={styles.productStatsTitle}>Комплектующие</div>
            <div className={styles.productStatsContainer}>
              <div className={styles.productStatsColumn}>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <CpuSVG width="22" height="22" />
                  </div>
                  <p>{devicesArray[0] || ''}</p>
                </div>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <GpuSVG width="21" height="21" />
                  </div>
                  <p>{devicesArray[1] || ''}</p>
                </div>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <RamSVG width="22" height="22" />
                  </div>
                  <p>{devicesArray[2] || ''}</p>
                </div>
              </div>
              <div className={styles.productStatsColumn}>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <DiskSVG width="15" height="20" />
                  </div>
                  <p>{devicesArray[3] || ''}</p>
                </div>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <CoolSVG width="19" height="19" />
                  </div>
                  <p>{devicesArray[4] || ''}</p>
                </div>
                <div className={styles.productStatsItem}>
                  <div className={styles.productStatsIcon}>
                    <WaltSVG width="17" height="17" />
                  </div>
                  <p>{devicesArray[5] || ''}</p>
                </div>
              </div>
            </div>
            <div className={styles.productPriceContainer}>
              <div className={styles.productPrice}>{price}Р</div>
              <div className={styles.productPriceShadow}>{price}Р</div>
            </div>
            <a className={styles.productCredit} href="#payment">
              <p className={styles.productCreditTitle}>В кредит/рассрочку</p>
              <p className={styles.productCreditPrice}>
                ОТ{" "}
                {roundToNearest(
                  ((formattedPrice / 100) * 15.5 + formattedPrice) / 12
                )}{" "}
                Р. В МЕСЯЦ
              </p>
            </a>
            <Button
              className={styles.productBuy}
              type="pink"
              onClick={() => saveOnLocalStorage(title)}
            >
              Купить
            </Button>
          </div>
          {productWhiteTheme()}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
