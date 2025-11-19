import styles from "./Stages.module.scss";
import { ReactComponent as Step1SVG } from "../../images/steps/1.svg";
import { ReactComponent as Step2SVG } from "../../images/steps/2.svg";
import { ReactComponent as Step3SVG } from "../../images/steps/3.svg";

const Stages = () => {
  return (
    <div className={styles.steps}>
      <p className={styles.step}>
        <Step1SVG fill="#090808" className={styles.stepBackground} />
        <p className={styles.stepDesc}>
        Оставьте заявку на сайте или свяжитесь с нашим менеджером. {" "}
        </p>
      </p>
      <p className={styles.step}>
        <Step2SVG fill="#090808" className={styles.stepBackground} />
        <p className={styles.stepDesc}>
          Подробно обсудим ход выполнения сборки и подберем необходимые
          комплектующие под ваш запрос.
        </p>
      </p>
      <p className={styles.step}>
        <Step3SVG fill="#090808" className={styles.stepBackground} />
        <p className={styles.stepDesc}>
          Собирем ПК вашей мечты, сделаем все необходимые тесты, бережно упакуем
          и доставим.{" "}
        </p>
      </p>
    </div>
  );
};

export default Stages;
