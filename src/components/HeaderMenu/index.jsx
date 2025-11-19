import styles from "./HeaderMenu.module.scss";

const HeaderMenu = ({ menuItems }) => {
  return (
    <ul className={styles.menu}>
      {menuItems.map((item) => (
        <li key={item.name} className={styles.menuItem}>
          <a href={item.link}>{item.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
