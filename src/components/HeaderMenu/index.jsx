import styles from "./HeaderMenu.module.scss";
import { useEffect, useState } from "react";
import { goToLink } from "../../helpers/helpers";
import classNames from "classnames";

const HeaderMenu = ({ menuItems }) => {
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset для header

      menuItems.forEach((item) => {
        try {
          const element = document.querySelector(item.link);
          if (element && typeof element.offsetTop !== 'undefined') {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              setActiveItem(item.link);
            }
          }
        } catch (error) {
          console.warn('Ошибка при обработке скролла:', error);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const handleClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    goToLink(link, "_self");
  };

  return (
    <ul className={styles.menu}>
      {menuItems.map((item) => (
        <li key={item.name} className={styles.menuItem}>
          <a 
            href={item.link}
            onClick={(e) => handleClick(e, item.link)}
            className={classNames({
              [styles.active]: activeItem === item.link
            })}
            aria-current={activeItem === item.link ? "page" : undefined}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
