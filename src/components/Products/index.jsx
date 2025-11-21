import ProductsFilters from "../ProductsFilters";
import styles from "./Products.module.scss";
import { useState, useCallback, useEffect, useMemo } from "react";
import Button from "../Button";
import ProductsCard from "../ProductsCard";
import { products as staticProducts } from "../../const/const";
import { apiUrl } from "../../config/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({
    filterFrom: "Все",
    filterTo: "Все",
  });

  const showMoreProducts = useCallback(() => {
    setVisibleProducts((prev) => prev + 6);
  }, []);

  useEffect(() => {
    getProductsData();
  }, []);

  // Сбрасываем видимые продукты при изменении фильтра
  useEffect(() => {
    setVisibleProducts(6);
  }, [currentFilter]);

  const selectedFilter = useCallback(
    (price) => {
      setCurrentFilter(price);
      
      if (price.filterFrom === "Все" && price.filterTo === "Все") {
        setFilteredProducts([...products]);
        return;
      }

      const formattedfilterFrom = parseInt(
        price.filterFrom?.toString().replace(/\./g, "") || "0"
      );
      const formattedfilterTo = parseInt(
        price.filterTo?.toString().replace(/\./g, "") || "999999999"
      );
      
      const filtered = products.filter((item) => {
        const itemPrice = parseInt(
          (item.price || "0").toString().replace(/\./g, "")
        );
        return (
          itemPrice >= formattedfilterFrom && itemPrice <= formattedfilterTo
        );
      });
      
      setFilteredProducts(filtered);
    },
    [products]
  );

  const getProductsData = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут
      
      const response = await fetch(apiUrl("/getProducts/"), {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      
      if (!Array.isArray(json) || json.length === 0) {
        throw new Error("Пустой ответ от API");
      }
      
      const sortedProducts = json.sort((a, b) => {
        const priceA = parseInt(a.price?.toString().replace(/\./g, "") || "0");
        const priceB = parseInt(b.price?.toString().replace(/\./g, "") || "0");
        return priceA - priceB;
      });
      
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
      setIsLoading(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        if (process.env.NODE_ENV === 'development') {
          console.error("Ошибка загрузки сборок с API:", error);
        }
      }
      
      setHasError(true);
      const sortedStaticProducts = staticProducts.sort((a, b) => {
        const priceA = parseInt(a.price?.toString().replace(/\./g, "") || "0");
        const priceB = parseInt(b.price?.toString().replace(/\./g, "") || "0");
        return priceA - priceB;
      });
      setProducts(sortedStaticProducts);
      setFilteredProducts(sortedStaticProducts);
      setIsLoading(false);
    }
  };

  const visibleProductsList = useMemo(
    () => filteredProducts.slice(0, visibleProducts),
    [filteredProducts, visibleProducts]
  );

  const EmptyState = ({ text }) => (
    <div className={styles.emptyState}>
      <p>{text}</p>
    </div>
  );

  return (
    <div className={styles.products}>
      <ProductsFilters onClick={selectedFilter} />
      
      {isLoading && (
        <EmptyState text="Загрузка сборок..." />
      )}
      
      {!isLoading && filteredProducts.length === 0 && (
        <EmptyState text="Нет сборок под этот диапазон. Попробуйте другие параметры." />
      )}
      
      {!isLoading && filteredProducts.length > 0 && (
        <>
          <div className={styles.productsCards}>
            {visibleProductsList.map((item, index) => (
              <ProductsCard
                key={item.id || `${item.title}-${index}`}
                title={item.title}
                image={item.img}
                forTo={item.forTo}
                devices={item.devices}
                price={item.price}
              />
            ))}
          </div>
          
          {visibleProducts < filteredProducts.length && (
            <div className={styles.productsButtonWrapper}>
              <Button onClick={showMoreProducts} className={styles.productsButton}>
                Показать еще
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
