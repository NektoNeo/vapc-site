import styles from "./Gifts.module.scss";
import computerPhoto from "../../images/gifts/screen.png";
import Button from "../Button";
import { goToLink } from "../../helpers/helpers";

const Gifts = () => {
  return (
    <>
      <div className={styles.gifts}>
        <div className={styles.giftsLeft}>
          <ul className={styles.giftsList}>
            <li className={styles.giftsListItem}>
              1. Фирменную гарантию на компьютер от VA-PC
            </li>
            <li className={styles.giftsListItem}>
              2. Чек и коробки от комплектующих
            </li>
            <li className={styles.giftsListItem}>
              3. Личное письмо от всей команды VA-PC
            </li>
          </ul>
          <p className={styles.giftsDesc}>
            Вы сможете обратиться к нам по гарантии в течение года, если с
            компьютером что-то случится.
          </p>
        </div>
        <img src={computerPhoto} alt="Фирменные девайсы" />
      </div>
      <Button type="pink" onClick={() => goToLink('#form', '_self')} className={styles.giftsButton}>
        Заказать пк
      </Button>
    </>
  );
};

export default Gifts;
