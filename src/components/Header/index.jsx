import Button from "../Button";
import HeaderMenu from "../HeaderMenu";
import logo from "../../images/svg/logo.svg";
import styles from "./Header.module.scss";
import HeaderMobileMenu from "../HeaderMobileMenu";
import { useState } from "react";
import classNames from "classnames";
import { goToLink } from "../../helpers/helpers";

export const Header = () => {
  const [mobileMenu, showMobileMenu] = useState(false);
  const menuItems = [
    { name: "Главная", link: "#main" },
    { name: "Услуги", link: "#adv" },
    { name: "Сборки", link: "#products" },
    { name: "Отзывы", link: "#rev" },
    { name: "ПК-клуб", link: "/pc-club" },
  ];
  const stats = [
    { value: "72 часа", label: "сборка и тесты" },
    { value: "24 мес.", label: "официальная гарантия" },
    { value: "По РФ", label: "доставка и страхование" },
  ];

  return (
    <>
      <div className={styles.headerTop}>
        <div className={styles.headerLeft}>
          <div
            className={classNames(styles.headerMobileButton, {
              [styles.headerMobileFixed]: mobileMenu,
            })}
          >
            <button
              className={classNames(styles.toggle, {
                [styles.toggleActive]: mobileMenu,
              })}
              onClick={() => showMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenu}
              type="button"
            >
              <div className={styles.bars} id="bar1"></div>
              <div className={styles.bars} id="bar2"></div>
              <div className={styles.bars} id="bar3"></div>
            </button>
          </div>
          <HeaderMobileMenu
            onClick={(isShow) => showMobileMenu(isShow)}
            isShow={mobileMenu}
            menuItems={menuItems}
          />
          <div className={styles.headerLogoCtn}>
            <img src={logo} alt="VA-PC" className={styles.headerLogo} />
          </div>
          <HeaderMenu menuItems={menuItems} />
        </div>
        <Button
          className={styles.headerButton}
          onClick={() => {
            goToLink("https://t.me/VAPC_Manager_bot");
          }}
        >
          Связаться в Telegram
        </Button>
      </div>
    </>
  );
};

export const HeaderHero = () => {
  const stats = [
    { value: "72 часа", label: "сборка и тесты" },
    { value: "24 мес.", label: "официальная гарантия" },
    { value: "По РФ", label: "доставка и страхование" },
  ];

  return (
    <div className={styles.headerHero}>
      <p className={styles.headerEyebrow}>VA-PC / кастомные машины</p>
      <h1 className={styles.headerTitle}>Игровые и рабочие станции под ваши задачи</h1>
      <p className={styles.headerSubtitle}>
        Проектируем, собираем и настраиваем ПК с тестами под ваши сценарии.
        Чистый монтаж, тихое охлаждение и сопровождение после выдачи.
      </p>
      <div className={styles.headerStats}>
        {stats.map((item) => (
          <div key={item.value} className={styles.headerStat}>
            <span className={styles.headerStatValue}>{item.value}</span>
            <span className={styles.headerStatLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
