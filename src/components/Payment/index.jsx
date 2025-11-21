import styles from './Payment.module.scss';
import { ReactComponent as TinkoffSVG } from '../../images/svg/tinkoff.svg';
import ellipseBig from '../../images/payments/ellipse_big.png';

const Payment = () => {
  return (
    <div className={styles.payment}>
      <div className={styles.about}>
        <TinkoffSVG className={styles.aboutLogo} />
        <div className={styles.aboutLine}></div>
        <div className={styles.aboutOptions}>
          <span className={styles.aboutOptionsItem}>Выгодные условия</span>
          <span className={styles.aboutOptionsItem}>Быстрое одобрение</span>
        </div>
        <img src={ellipseBig} alt='Декор' className={styles.aboutBigEl}/>
        <div className={styles.aboutSmallEl}/>
      </div>
      <div className={styles.steps}>
        <span className={styles.stepsTitle}>РАССРОЧКА</span>
        <div className={styles.stepsList}>
          <p className={styles.stepsListItem}>Оставьте заявку у нашего менеджера, указав вид оплаты "рассрочка".</p>
          <p className={styles.stepsListItem}>Получите ссылку на оформление рассрочки.</p>
          <p className={styles.stepsListItem}>Получите одобрение.</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
