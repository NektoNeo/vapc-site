import Faq from "../components/Telegram/Faq";
import Feed from "../components/Telegram/Feed";
import Products from "../components/Telegram/Products";
import Profile from "../components/Telegram/Profile/Profile";
import Typography from "../components/Typography/Typography";
import styles from "./TelegramWeb.module.scss";

const TelegramWeb = () => {
  return (
    <div className={styles.container}>
      <section className={styles.welcome}>
        <div className={styles.container}>
          <p className={styles.title}>Добро пожаловать в VA-PC!</p>
          <p className={styles.titleShadow}>Добро пожаловать в VA-PC!</p>
        </div>
      </section>
      <section className={styles.profile}>
        <Profile />
      </section>
      <section className={styles.feed}>
        <Feed />
      </section>
      <section className={styles.faq}>
        <Faq />
      </section>
      <section className={styles.products}>
        <Products />
      </section>
    </div>
  );
};

export default TelegramWeb;
