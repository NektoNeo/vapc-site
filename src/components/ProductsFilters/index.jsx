import styles from "./ProductsFilters.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import classNames from "classnames";
import { apiUrl } from "../../config/api";

const defaults = [
  { id: "all", filterFrom: "Все", filterTo: "Все", label: "Все сборки" },
  { id: "70", filterFrom: "0", filterTo: "70000", label: "до 70 000 ₽" },
  { id: "110", filterFrom: "70000", filterTo: "110000", label: "70–110 тыс." },
  { id: "170", filterFrom: "110000", filterTo: "170000", label: "110–170 тыс." },
  { id: "200", filterFrom: "170000", filterTo: "800000", label: "170 000 ₽ +" },
];

const ProductsFilters = ({ onClick }) => {
  const [price, setPrice] = useState({
    filterFrom: "Все",
    filterTo: "Все",
  });

  const [filters, updateFilters] = useState(defaults);
  const onClickRef = useRef(onClick);
  
  // Обновляем ref при изменении onClick
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  // Вызываем onClick только при изменении фильтра
  useEffect(() => {
    onClickRef.current({
      filterFrom: price.filterFrom,
      filterTo: price.filterTo,
    });
  }, [price.filterFrom, price.filterTo]);

  useEffect(() => {
    getFiltersData();
  }, []);

  const getFiltersData = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(apiUrl("/getFilters/"), {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      const normalized = [
        defaults[0],
        ...json.map((item, idx) => ({
          ...item,
          id: item.id || `api-${idx}`,
          label:
            item.label ||
            `${item.filterFrom?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽ - ${item.filterTo
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`,
        })),
      ];
      updateFilters(normalized);
    } catch (error) {
      if (error.name !== 'AbortError' && process.env.NODE_ENV === 'development') {
        console.error("Ошибка загрузки фильтров:", error);
      }
      updateFilters(defaults);
    }
  };

  const handleFilterClick = useCallback((item) => {
    setPrice({
      filterFrom: item.filterFrom,
      filterTo: item.filterTo,
    });
  }, []);

  return (
    <div className={styles.productsFilters}>
      <div className={styles.productFilterMobileTitle}>Бюджет</div>
      <div className={styles.productsFilterPrice}>
        {filters.map((item) => {
          const isActive =
            price.filterFrom === item.filterFrom && price.filterTo === item.filterTo;
          return (
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterClick(item)}
              key={item.id}
              className={classNames(styles.productsFilterPriceItem, {
                [styles.productsFilterPriceItemActive]: isActive,
              })}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsFilters;
