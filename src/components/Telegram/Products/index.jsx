import styles from "./Products.module.scss";
import { ReactComponent as LoopSVG } from "../../../images/telegram/products/loop.svg";
import { ReactComponent as SortSVG } from "../../../images/telegram/products/sort.svg";
import aero from "../../../images/products/aero.png";
import Product from "../Product";
import { useEffect } from "react";
import { products } from "../../../const/const";

const Products = () => {
  return (
    <div className={styles.products}>
      <div className={styles.productsHeader}>
        <div className={styles.productsTitle}>Каталог</div>
        <div className={styles.productsActions}>
          <LoopSVG className={styles.productsSearch} />
          <SortSVG className={styles.productsSort} />
        </div>
      </div>
      <div className={styles.productsList}>
        {products.map((item) => {
          return (
            <Product
              price={item.price}
              image={item.img}
              devices={item.devices}
              title={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
