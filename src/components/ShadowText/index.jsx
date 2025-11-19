import styles from './ShadowText.module.scss';

export const ShadowText = ({ fz = 12, title = 'Текст', shadowOffsetY = 1 }) => {
  return (
    <div className={styles.titleBox}>
      <p className={styles.title} style={{ fontSize: `${fz}px` }}>{title}</p>
      <p className={styles.titleShadow} style={{ fontSize: `${fz}px`, top: `${shadowOffsetY}px` }}>{title}</p>
    </div>
  );
};
