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
      title: "ИНДИВИДУАЛЬАЯ СБОРКА",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}>Высокая мощность или компактность?</div>
          <div className={styles.serviceDescriptionLine}><span>Соберем ПК лично под вас.</span></div>
          <div className={styles.serviceDescriptionLine}><span>Никаких “паутин”</span> из проводов.</div>
          <div className={styles.serviceDescriptionLine}><span>Обновим и настроим</span> BIOS</div>
          <div className={styles.serviceDescriptionLine}><span>Стресс-тест</span> после сборки – отправим только рабочий ПК.</div>
        </div>
      ),
    },
    {
      img: <ServiceIMG2 />,
      title: "РЕМОНТ",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}><span>Найдем</span> неисправность.</div>
          <div className={styles.serviceDescriptionLine}><span>Обсудим</span> ремонт, стоимость и сроки.</div>
          <div className={styles.serviceDescriptionLine}><span>Заменим</span> комплектующие и устраним неисправность.</div>
          <div className={styles.serviceDescriptionLine}><span>Расскажем</span>, как продлить жизнь ПК.</div>
        </div>
      ),
    },
    {
      img: <ServiceIMG3 />,
      title: "АПГРЕЙД",
//       
// 
// 
// 
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}><span>Оценим</span> и проанализируем возможность апгрейда.</div>
          <div className={styles.serviceDescriptionLine}><span>Подберем</span> оптимальные комплектующие под ваш бюджет</div>
          <div className={styles.serviceDescriptionLine}><span>Установим</span> новые компоненты</div>
          <div className={styles.serviceDescriptionLine}><span>Проверим</span> работоспособность улучшенного ПК</div>
        </div>
      ),
    },
    {
      img: <ServiceIMG4 />,
      title: "ЛИЧНАЯ КОНСУЛЬТАЦИЯ",
      text: (
        <div className={styles.serviceDescription}>
          <div className={styles.serviceDescriptionLine}>Игры, а может монтаж? – <span>Учтем предпочтения</span> и предложим варианты.</div>
          <div className={styles.serviceDescriptionLine}><span>Обсудим</span> цену, мощность, комплектующие – все.</div>
          <div className={styles.serviceDescriptionLine}>Расположение ПК, периферия – <span>учтем все</span>.</div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className={styles.services}>
        {services.map((item) => (
          <div key={item.title} className={styles.serviceItem}>
            <img className={styles.serviceImg} src={item.img.type} alt="" />
            <span className={styles.serviceTitle}>{item.title}</span>
            {item.text}
          </div>
        ))}
      </div>
      <Button
        type="pink"
        onClick={() => goToLink("#form", "_self")}
        className={styles.serviceButton}
      >
        Заказать свой идеальный ПК
      </Button>
    </>
  );
};

export default Services;
