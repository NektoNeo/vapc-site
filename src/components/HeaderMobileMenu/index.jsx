import styles from "./HeaderMobileMenu.module.scss";
import classNames from "classnames";
import logo from "../../images/svg/logo.svg";
import Button from "../Button";
import { goToLink } from "../../helpers/helpers";

const HeaderMobileMenu = ({ menuItems, isShow, onClick }) => {
  const handleNavigate = (link) => {
    onClick(false);
    setTimeout(() => {
      const element = document.querySelector(link);
      if (element?.scrollIntoView) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        goToLink(link, "_self");
      }
    }, 120);
  };

  return (
    <div
      className={classNames(styles.mobileMenu, {
        [styles.mobileMenuActive]: isShow,
      })}
    >
      <div className={styles.headerLogoCtn}>
        <img src={logo} alt="VA-PC" className={styles.mobileMenuLogo} />
      </div>
      <ul className={styles.mobileMenuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.mobileMenuItem}>
            <a
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(item.link);
              }}
            >
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
        Открыть Telegram
      </Button>
    </div>
  );
};

export default HeaderMobileMenu;
