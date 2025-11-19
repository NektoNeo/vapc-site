import styles from "./ProductFooter.module.scss";
import { ReactComponent as GarantSVG } from "../../../images/telegram/delivery/garant.svg";
import { ReactComponent as DeliverySVG } from "../../../images/telegram/delivery/car.svg";

export const ProductFooter = () => {
  return (
    <>
      <div className={styles.footerCredit}>
        <div className={styles.footerCreditText}>
          ПК можно оформить в рассрочку или кредит
        </div>
      </div>
      <div className={styles.footerGarant}>
        <div className={styles.footerGarantTime}>
          <GarantSVG className={styles.footerGarantTimeImage} />
          <div className={styles.footerGarantTimeText}>Гарантия</div>
        </div>
        <div className={styles.footerGarantText}>
          Вы получаете чек и документацию непосредственно вместе с ПК
        </div>
      </div>
      <div className={styles.footerCredit}>
        <div className={styles.footerCreditText} style={{ textAlign: 'left', padding: '16px 19px' }}>
          По истечении нашей гарантии - действует гарантия от производителя
        </div>
      </div>
      <div className={styles.footerDelivery}>
        <div className={styles.footerDeliveryHeader}>
          <div className={styles.footerDeliveryHeaderText}>
            Доставляем по всем регионам РФи странам ЕАЭС
          </div>
          <DeliverySVG className={styles.footerDeliveryHeaderIcon} />
        </div>
        <div className={styles.footerDeliveryNotice}>
          Доставка по Москве нашей курьерской службой - в среднем 900 рублей.
        </div>
      </div>
    </>
  );
};
