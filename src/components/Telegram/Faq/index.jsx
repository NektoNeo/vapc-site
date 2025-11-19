import styles from "./Faq.module.scss";
import { goToLink } from "../../../helpers/helpers";
import { ReactComponent as CarSVG } from "../../../images/telegram/faq/car.svg";
import { ReactComponent as BuySVG } from "../../../images/telegram/faq/buyButton.svg";
import { ReactComponent as ArrowSVG } from "../../../images/telegram/arrow.svg";
const Faq = () => {
  return (
    <div className={styles.faq}>
      <div className={styles.faqBlock}>
        <div className={styles.left}>
          <div className={styles.gift}>
            <p className={styles.giftTitle}>А у нас розыгрыш!</p>
            <p className={styles.giftDescription}>
              Игровой ПК и кастомная клавиатура в уникальном дизайне
            </p>
            <p className={styles.giftNotice}>ЗА ПОДПИСКУ!</p>
          </div>
          <div className={styles.delivery}>
            <div className={styles.deliveryHeader}>
              <CarSVG className={styles.deliveryIcon} />
              <p className={styles.deliveryTitle}>сколько стоит доставка?</p>
            </div>
            <p className={styles.deliveryDescription}>
              Рассчитать стоимость доставки к Вашему адресу
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div
            onClick={() => goToLink("#")}
            onTouchEnd={() => goToLink("#")}
            className={styles.buy}
          >
            <div className={styles.buyContent}>
              <p className={styles.buyTitle}>ВЫБРАТЬ И ЗАКАЗАТЬ</p>
              <BuySVG className={styles.buyButton} />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={goToLink("#")}
        onTouchEnd={() => goToLink("#")}
        className={styles.question}
      >
        <div className={styles.questionBlock}>
          <p className={styles.questionTitle}>Остались вопросы?</p>
          <p className={styles.questionDescription}>
            наш менеджер поможет вам!
          </p>
        </div>
        <ArrowSVG className={styles.questionIcon} />
      </div>
    </div>
  );
};

export default Faq;
