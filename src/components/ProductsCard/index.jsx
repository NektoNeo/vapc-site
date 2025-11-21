import { memo, useMemo, useCallback } from "react";
import Button from "../Button";
import styles from "./ProductsCard.module.scss";
import { ReactComponent as CpuSVG } from "../../images/products/cpu.svg";
import { ReactComponent as GpuSVG } from "../../images/products/gpu.svg";
import { ReactComponent as RamSVG } from "../../images/products/ram.svg";
import { ReactComponent as DiskSVG } from "../../images/products/disk.svg";
import { ReactComponent as WaltSVG } from "../../images/products/walt.svg";
import { ReactComponent as CoolSVG } from "../../images/products/cool.svg";
import { goToLink } from "../../helpers/helpers";

const specIcons = [CpuSVG, GpuSVG, RamSVG, DiskSVG, CoolSVG, WaltSVG];
const specLabels = ["CPU:", "GPU:", "RAM:", "SSD:", "Кулер:", "БП:"];

const ProductsCard = memo(({ title, image, forTo, devices, price }) => {
  const devicesArray = useMemo(() => {
    return Array.isArray(devices)
      ? devices
      : String(devices || "").split(",");
  }, [devices]);

  const formattedPrice = useMemo(() => {
    return parseInt((price || "0").toString().replace(/\./g, ""));
  }, [price]);

  const saveOnLocalStorage = useCallback(() => {
    localStorage.setItem("PC", title);
    goToLink("#form", "_self");
  }, [title]);

  const monthlyRounded = useMemo(() => {
    const monthly = (formattedPrice * 1.155) / 12 || 0;
    return Math.ceil(monthly / 100) * 100;
  }, [formattedPrice]);

  const tier = useMemo(() => {
    return formattedPrice > 250000
      ? "Workstation"
      : formattedPrice > 140000
      ? "Pro"
      : formattedPrice > 80000
      ? "Gaming"
      : "Старт";
  }, [formattedPrice]);

  return (
    <div className={styles.product}>
      <div className={styles.productGlow}></div>
      <div className={styles.productHeader}>
        <div>
          <p className={styles.productTitle}>{title}</p>
          <p className={styles.productSubtitle}>{forTo || "Баланс производительности"}</p>
        </div>
        <span className={styles.productBadge}>{tier}</span>
      </div>
      <div className={styles.productImageContainer}>
        <img 
          className={styles.productImage} 
          src={image} 
          alt={`Сборка ${title}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.productStats}>
        <div className={styles.productStatsTitle}>Комплектация</div>
        <div className={styles.productStatsGrid}>
          {devicesArray.slice(0, 6).map((spec, index) => {
            const Icon = specIcons[index] || CpuSVG;
            const label = specLabels[index] || "";
            const trimmedSpec = String(spec || "").trim();
            return (
              <div key={`${title}-${index}`} className={styles.productStatsItem}>
                <Icon width="20" height="20" />
                <p>
                  {label && trimmedSpec ? `${label} ${trimmedSpec}` : trimmedSpec}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.productFooter}>
        <div className={styles.priceBlock}>
          <p className={styles.productPrice}>{price} ₽</p>
          <p className={styles.productCredit}>≈ {monthlyRounded.toLocaleString("ru-RU")} ₽/мес</p>
        </div>
        <Button className={styles.productBuy} type="pink" onClick={saveOnLocalStorage}>
          Заказать
        </Button>
      </div>
    </div>
  );
});

ProductsCard.displayName = 'ProductsCard';

export default ProductsCard;
