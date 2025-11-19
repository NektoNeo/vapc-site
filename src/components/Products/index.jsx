import ProductsFilters from "../ProductsFilters";
import styles from "./Products.module.scss";
import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import Button from "../Button";
import { Animate } from "react-simple-animate";
import { products as staticProducts } from "../../const/const";
import { apiUrl } from "../../config/api";
const ProductsCard = lazy(() => import("../ProductsCard"));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [isShowProducts, setShowProducts] = useState(true);

  const showMoreProducts = () => {
    setVisibleProducts(visibleProducts + 6);
  };

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if (!isShowProducts) {
      return setShowProducts(true);
    }
  }, [isShowProducts])

  const selectedFilter = useCallback((price) => {
    setShowProducts(false)
    if (price.filterFrom === "Все" && price.filterTo === "Все") {
      return setFilteredProducts([...products]);
    }

    const formattedfilterFrom = parseInt(price.filterFrom?.toString().replace(/\./g, '') || '0');
    const formattedfilterTo = parseInt(price.filterTo?.toString().replace(/\./g, '') || '999999999');
    return setFilteredProducts(
      products.filter((item) => {
        const itemPrice = parseInt((item.price || '0').toString().replace(/\./g, ''));
        return itemPrice >= formattedfilterFrom && itemPrice <= formattedfilterTo;
      })
    );
  }, [products]);

  const getProductsData = async () => {
    try {
      const response = await fetch(apiUrl('/getProducts/'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const sortedProducts = json.sort((a, b) => {
        const priceA = parseInt(a.price?.toString().replace(/\./g, '') || '0');
        const priceB = parseInt(b.price?.toString().replace(/\./g, '') || '0');
        return priceA - priceB;
      });
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
      console.log('✅ Данные сборок получены из базы данных:', sortedProducts.length, 'шт.');
    } catch (error) {
      console.error('❌ Ошибка при загрузке сборок из БД:', error);
      console.log('⚠️ Используются статические данные из const.jsx');
      // Fallback на статические данные
      const sortedStaticProducts = staticProducts.sort((a, b) => {
        const priceA = parseInt(a.price?.toString().replace(/\./g, '') || '0');
        const priceB = parseInt(b.price?.toString().replace(/\./g, '') || '0');
        return priceA - priceB;
      });
      setProducts(sortedStaticProducts);
      setFilteredProducts(sortedStaticProducts);
    }
  }

  return (
    <div className={styles.products}>
      <ProductsFilters onClick={(price) => selectedFilter(price)} />
      <div className={styles.productsCards}>
        <Suspense fallback={null}>
          {isShowProducts && filteredProducts?.slice(0, visibleProducts).map((item, index) => (
            <>
              <Animate
                key={item.id}
                easeType="linear"
                play={products}
                start={{ opacity: 0 }}
                delay={0.3}
                end={{ opacity: 1 }}
              >
                <ProductsCard
                  // key={item.id}
                  title={item.title}
                  image={item.img}
                  forTo={item.forTo}
                  devices={item.devices}
                  price={item.price}
                />
              </Animate>
            </>
          ) || null)}
        </Suspense>
      </div>
      {visibleProducts < filteredProducts.length && (
        <Button onClick={showMoreProducts} className={styles.productsButton}>
          Показать ещё
        </Button>
      )}
    </div>
  );
};

export default Products;
