import styles from "./ProductsFilters.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { apiUrl } from "../../config/api";

const ProductsFilters = ({ onClick }) => {
  const [price, setPrice] = useState({
    filterFrom: "Все",
    filterTo: "Все",
  });

  const [filters, updateFilters] = useState([]);

  useEffect(() => {
    onClick({
      filterFrom: price.filterFrom,
      filterTo: price.filterTo,
    });
  }, [price.filterFrom, price.filterTo]);

  useEffect(() => {
    getFiltersData()
  }, [])

  const getFiltersData = async () => {
    try {
      const response = await fetch(apiUrl('/getFilters/'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      updateFilters([
        {
          filterFrom: "Все",
          filterTo: "Все",
          id: 9999999
        },
        ...json,
      ].sort((a, b) => a.filterFrom - b.filterTo));
      console.log('✅ Данные фильтров получены из базы данных:', json.length, 'шт.');
    } catch (error) {
      console.error('❌ Ошибка при загрузке фильтров из БД:', error);
      // Fallback на дефолтный фильтр
      updateFilters([
        {
          filterFrom: "Все",
          filterTo: "Все",
          id: 9999999
        }
      ]);
    }
  }

  return (
    <div className={styles.productsFilters}>
      <div className={styles.productsFilterPrice}>
        <div className={styles.productFilterMobileTitle}>Цена</div>
        {filters.map((item) => {
          return (
            <div
              onClick={() =>
                setPrice({
                  filterFrom: item.filterFrom,
                  filterTo: item.filterTo,
                })
              }
              key={item.id}
              className={classNames(styles.productsFilterPriceItem, {
                [styles.productsFilterPriceItemActive]:
                  price.filterFrom === item.filterFrom &&
                  price.filterTo === item.filterTo,
              })}
            >
              {item.filterFrom !== 'Все' ? `${item.filterFrom}р - ${item.filterTo}р` : 'Все'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsFilters;
