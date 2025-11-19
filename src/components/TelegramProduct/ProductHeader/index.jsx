import styles from "./ProductHeader.module.scss";
import { ReactComponent as TelegramSVG } from "../../../images/telegram/telegram.svg";
import { ReactComponent as ArrowSVG } from "../../../images/telegram/arrow.svg";
import { goToLink } from "../../../helpers/helpers";

export const ProductHeader = () => {
  return (
    <div className={styles.productHeader}>
      <div
        onTouchEnd={() => goToLink("/tg-app", "_target")}
        className={styles.productHeaderBack}
      >
        <ArrowSVG className={styles.productHeaderBackIcon} />
        <div className={styles.productHeaderTitle}>Назад</div>
      </div>
      <div className={styles.social}>
        <div className={styles.info}>
          <p className={styles.tag}>@VAPCBUILD</p>
          <p className={styles.description}>наш Telegram-канал</p>
        </div>
        <TelegramSVG />
      </div>
    </div>
  );
};
