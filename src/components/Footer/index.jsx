import styles from "./Footer.module.scss";
import logo from '../../images/svg/logo.svg'
import policy from '../../files/policy.pdf';
import offerta from '../../files/offerta.pdf'
import Button from "../Button";
import { goToLink } from "../../helpers/helpers";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerColumn}>
        <Button
          className={styles.headerButton}
          onClick={() => {
            goToLink("https://t.me/VAPC_Manager_bot");
          }}
        >
          Связаться в Telegram
        </Button>
        <div className={styles.footerPhone}>
          ЕЖЕДНЕВНО С 11:00 ДО 21:00
        </div>
      </div>
      <div className={styles.footerColumn}>
        <img src={logo} alt="VA-PC" className={styles.footerLogo} />
      </div>
      <div className={styles.footerColumn}>
         <p className={styles.footerData}>
          г. Москва, 1-й Митинский переулок, 25.
        </p>
        <p className={styles.footerDelivery}>
          Доставка по всей России
        </p>
        <a className={styles.footerDocument} download href={policy}>Политика конфиденциальности</a>
      </div>
    </div>
  );
};

export default Footer;
