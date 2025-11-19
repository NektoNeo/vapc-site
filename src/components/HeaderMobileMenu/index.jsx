import styles from "./HeaderMobileMenu.module.scss";
import classNames from "classnames";
import logo from "../../images/svg/logo.svg";
import Button from "../Button";
import { goToLink } from '../../helpers/helpers';

const HeaderMobileMenu = ({ menuItems, isShow, onClick }) => {
  return (
    <div
      className={classNames(styles.mobileMenu, {
        [styles.mobileMenuActive]: isShow,
      })}
    >
      <div className={styles.headerLogoCtn}>
        <img src={logo} alt="логотип" className={styles.mobileMenuLogo} />
      </div>
      <ul className={styles.mobileMenuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.mobileMenuItem}>
            <a href={item.link} onClick={() => onClick(!isShow)}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          goToLink("https://t.me/VAPC_Manager_bot");
        }}
        className={styles.mobileMenuButton}
      >
        Менеджер
      </Button>
    </div>
  );
};

export default HeaderMobileMenu;
