import Button from "../Button";
import HeaderMenu from "../HeaderMenu";
import logo from "../../images/svg/logo.svg";
import styles from "./Header.module.scss";
import { ReactComponent as BurgerSVG } from "../../images/svg/mobileBurger.svg";
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
  ];

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div
          className={classNames(styles.headerMobileButton, {
            [styles.headerMobileFixed]: mobileMenu,
          })}
        >
          <BurgerSVG onClick={() => showMobileMenu(!mobileMenu)} />
        </div>
        <HeaderMobileMenu
          onClick={(isShow) => showMobileMenu(isShow)}
          isShow={mobileMenu}
          menuItems={menuItems}
        />
        <div className={styles.headerLogoCtn}>
            <img src={logo} alt="логотип" className={styles.headerLogo} />
        </div>
        <HeaderMenu menuItems={menuItems} />
      </div>
      <Button
        className={styles.headerButton}
        onClick={() => {
          goToLink("https://t.me/VAPC_Manager_bot");
        }}
      >
        Связь с менеджером
      </Button>
    </div>
  );
};
