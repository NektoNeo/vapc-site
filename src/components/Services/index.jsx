import ServiceIMG1 from "../../images/services/service_1.png";
import ServiceIMG2 from "../../images/services/service_2.png";
import ServiceIMG3 from "../../images/services/service_3.png";
import ServiceIMG4 from "../../images/services/service_4.png";
import Button from "../Button";
import styles from "./Services.module.scss";
import { goToLink } from "../../helpers/helpers";

const Services = () => {
  const services = [
    {
      img: <ServiceIMG1 />,
      title: "ИНДИВИДУАЛЬНАЯ СБОРКА",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}>Высокая мощность или компактность?</div>
          <div className={styles.serviceDescriptionLine}>Соберем ПК лично под вас.</div>
          <div className={styles.serviceDescriptionLine}>Никаких "паутин" из проводов.</div>
          <div className={styles.serviceDescriptionLine}><span>Обновим и настроим BIOS</span></div>
          <div className={styles.serviceDescriptionLine}><span>Стресс-тест после сборки</span> – отправим только рабочий ПК.</div>
        </div>
      ),
    },
    {
      img: <ServiceIMG2 />,
      title: "РЕМОНТ",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}>Найдем неисправность.</div>
          <div className={styles.serviceDescriptionLine}><span>Обсудим ремонт, стоимость и сроки.</span></div>
          <div className={styles.serviceDescriptionLine}><span>Заменим комплектующие</span> и устраним неисправность.</div>
          <div className={styles.serviceDescriptionLine}><span>Расскажем, как продлить жизнь ПК.</span></div>
        </div>
      ),
    },
    {
      img: <ServiceIMG3 />,
      title: "АПГРЕЙД",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}><span>Оценим и проанализируем</span> возможность апгрейда.</div>
          <div className={styles.serviceDescriptionLine}><span>Подберем оптимальные комплектующие</span> под ваш бюджет</div>
          <div className={styles.serviceDescriptionLine}><span>Установим новые компоненты</span></div>
          <div className={styles.serviceDescriptionLine}><span>Проверим работоспособность</span> улучшенного ПК</div>
        </div>
      ),
    },
    {
      img: <ServiceIMG4 />,
      title: "ЛИЧНАЯ КОНСУЛЬТАЦИЯ",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}>Игры, а может монтаж? – Учтем предпочтения и предложим варианты.</div>
          <div className={styles.serviceDescriptionLine}><span>Обсудим цену, мощность, комплектующие</span> – все.</div>
          <div className={styles.serviceDescriptionLine}><span>Расположение ПК, периферия</span> – учтем все.</div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className={styles.services}>
        {services.map((item) => (
          <div key={item.title} className={styles.serviceItem}>
            <img className={styles.serviceImg} src={item.img.type} alt={item.title} />
            <span className={styles.serviceTitle}>{item.title}</span>
            {item.text}
          </div>
        ))}
      </div>
      <div className={styles.serviceButtonWrapper}>
        <Button
          type="pink"
          onClick={() => goToLink("#form", "_self")}
          className={styles.serviceButton}
        >
          Подобрать конфигурацию
        </Button>
      </div>
    </>
  );
};

export default Services;
