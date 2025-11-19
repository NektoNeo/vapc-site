import styles from './Profile.module.scss';
import { ReactComponent as TelegramSVG } from '../../../images/telegram/telegram.svg';
import { ReactComponent as ArrowSVG } from '../../../images/telegram/arrow.svg';

const Profile = () => {
  return <div className={styles.profile}>
    <div className={styles.user}>
      <div className={styles.avatar} alt="avatar" />
      <p className={styles.name}>Арон</p>
      <ArrowSVG />
    </div>
    <div className={styles.social}>
      <div className={styles.info}>
        <p className={styles.tag}>@VAPCBUILD</p>
        <p className={styles.description}>наш Telegram-канал</p>
      </div>
      <TelegramSVG />
    </div>
  </div>
}

export default Profile;