import { ShadowText } from "../components/ShadowText";
import { ProductConfig } from "../components/TelegramProduct/ProductConfig";
import { ProductFooter } from "../components/TelegramProduct/ProductFooter";
import { ProductGift } from "../components/TelegramProduct/ProductGift";
import { ProductHeader } from "../components/TelegramProduct/ProductHeader";
import { ProductTests } from "../components/TelegramProduct/ProductTests";
import { ReactComponent as BreakLineSVG } from '../images/telegram/break_line.svg';
import styles from "./TelegramWebProduct.module.scss";

const TelegramWebProduct = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <ProductHeader />
      </section>
      <section className={styles.config}>
        <ShadowText fz={26} title="Конфигурация" shadowOffsetY={2} />
        <ProductConfig className={styles.configBlock} />
        <div className={styles.configNotice}>
          Конфигурация опционально может быть изменена через нашего менеджера.
          <br />
          <br />
          <br />
          <span>
            Заменим любые комплектующие или увеличим объем ОЗУ/накопителей под
            Ваш запрос.
          </span>
        </div>
      </section>
      <section className={styles.tests}>
        <ShadowText fz={26} title="Тесты этого ПК в играх" shadowOffsetY={2} />
        <ProductTests />
      </section>
      <section className={styles.gift}>
        <ShadowText fz={26} title="Вы получаете:" shadowOffsetY={2} />
        <div className={styles.configNotice}>
          собранный на заказ ПК из новых комплектующих уже с продуманным
          кабель-менеджментом, проведёнными стресс-тестами
        </div>
        <ProductGift />
      </section>
      <BreakLineSVG className={styles.breakLine} />
      <section className={styles.footer}>
        <ProductFooter />
      </section>
    </div>
  );
};

export default TelegramWebProduct;
