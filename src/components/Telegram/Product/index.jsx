// import Button from "../Button";
import styles from "./Product.module.scss";
import { ReactComponent as VideoSVG } from "../../../images/telegram/products/video.svg";
import { ReactComponent as ProcSVG } from "../../../images/telegram/products/proc.svg";
import { ReactComponent as BlurSVG } from "../../../images/telegram/products/blur.svg";
import Button from "../../../components/Button";
import { goToLink } from "../../../helpers/helpers";

const Product = ({ title, image, forTo, devices, price, key }) => {
  const formattedPrice = parseInt(price.replace(".", ""));
  // const video = devices.split(',')[0];
  // const proc = devices.split(',')[1];
  console.log(devices);
  const roundToNearest = (num) => {
    const nearest = 100;
    const roundedNum = Math.ceil(num / nearest) * nearest;
    return roundedNum;
  };
  return (
    <div className={styles.product} key={key}>
      <div className={styles.productWidth}>
        <div className={styles.productContainer}>
          <BlurSVG className={styles.blur} />
          <div className={styles.productImageContainer}>
            <img className={styles.productImage} src={image} alt={title} />
          </div>
          <div className={styles.productTitleContainer}>
            <p
              className={styles.productTitle}
              style={{ fontSize: title.length >= 11 ? 15 : 16 }}
            >
              {title}
            </p>
            <p
              className={styles.productTitleShadow}
              style={{ fontSize: title.length >= 11 ? 15 : 16 }}
            >
              {title}
            </p>
          </div>
          <div className={styles.productDevices}>
            <div className={styles.productDevicesItem}>
              <VideoSVG />
              <div className={styles.productDevicesTitle}>Видеокарта:</div>
              <div className={styles.productDevicesLine}></div>
              <div className={styles.productDevicesName}>{devices[0]}</div>
            </div>
            <div className={styles.productDevicesItem}>
              <ProcSVG />
              <div className={styles.productDevicesTitle}>Процессор:</div>
              <div className={styles.productDevicesLine}></div>
              <div className={styles.productDevicesName}>{devices[1]}</div>
            </div>
          </div>
          <div className={styles.productDevicesPrices}>
            <div className={styles.productDevicesPricesOld}>{price} Р.</div>
            <div className={styles.productDevicesPricesCurrent}>{price} Р.</div>
          </div>
          <div className={styles.productDevicesCredit}>
            <div className={styles.productDevicesCreditText}>
              В кредит/рассрочку
            </div>
            <div className={styles.productDevicesCreditValue}>
              От 6700 Р. в месяц
            </div>
          </div>
          <Button
            onTouchEnd={() => goToLink("/tg-app/product")}
            onClick={() => goToLink("/tg-app/product")}
            type="pink"
            className={styles.productDevicesButton}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
