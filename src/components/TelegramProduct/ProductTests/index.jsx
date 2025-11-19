import styles from "./ProductTests.module.scss";

const tests = [
  {
    name: "Forza Horizon 5 EXTREME",
    value: "HD +-180FPS/ 2K +-115FPS",
  },
  {
    name: "GTA V ULTRA",
    value: "HD +- 180FPS CS:GO LOW - +-400FPS",
  },
  {
    name: "Cyberpunk 2077 ULTRA+",
    value: "HD +-120FPS/ 2K +-70FPS",
  },
  {
    name: "DOTA 2 ULTRA",
    value: "HD +- 190",
  },
  {
    name: "GOD OF WAR ULTRA ",
    value: "HD 190 +-FPS/ 2K +-165FPS",
  },
  {
    name: "Fortnite LOW",
    value: "HD +-400 FPS/ 2K +-210FPS",
  },
];

export const ProductTests = () => {
  return tests.map(({ name, value }) => {
    return (
      <div className={styles.testItem}>
        <div className={styles.testTitle}>{name}</div>
        <div className={styles.testValue}>{value}</div>
      </div>
    );
  });
};
