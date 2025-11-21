import styles from "./Stages.module.scss";
import { ReactComponent as Step1SVG } from "../../images/steps/1.svg";
import { ReactComponent as Step2SVG } from "../../images/steps/2.svg";
import { ReactComponent as Step3SVG } from "../../images/steps/3.svg";

const Stages = () => {
  const steps = [
    {
      icon: <Step1SVG fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.35" className={styles.stepBackground} />,
      text: "Оставьте заявку на сайте или свяжитесь с нашим менеджером.",
    },
    {
      icon: <Step2SVG fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.35" className={styles.stepBackground} />,
      text: "Подробно обсудим ход выполнения сборки и подберем необходимые комплектующие под ваш запрос.",
    },
    {
      icon: <Step3SVG fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.35" className={styles.stepBackground} />,
      text: "Собирем ПК вашей мечты, сделаем все необходимые тесты, бережно упакуем и доставим.",
    },
  ];

  return (
    <div className={styles.steps}>
      {steps.map((item, index) => (
        <article key={index} className={styles.step}>
          {item.icon}
          <p className={styles.stepDesc}>{item.text}</p>
        </article>
      ))}
    </div>
  );
};

export default Stages;
