import { useEffect, useState, useRef } from "react";
import styles from "../App.module.scss";
import NewsBlock from "../components/NewsBlock";
import Typography from "../components/Typography/Typography";
import Services from "../components/Services";
import Products from "../components/Products";
import Payment from "../components/Payment";
import Stages from "../components/Stages";
import Gifts from "../components/Gifts";
import Advantages from "../components/Advantages";
import Socials from "../components/Socials";
import Cases from "../components/Cases";
import Live from "../components/Live";
import Form from "../components/Form";
import Footer from "../components/Footer";
import light from "../images/backgrounds/light.svg";
import miniCross from "../images/backgrounds/miniCross.svg";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";
import { YMInitializer } from "react-yandex-metrika";

const MainPage = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [isMobile, updateIsMobile] = useState(false);
  useEffect(() => {
    updateIsMobile(windowSize.current[0] < 1024);
    return () => window.localStorage.removeItem("PC");
  }, []);

  const defaultBlockAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
      },
    },
    onlyVisible: {
      opacity: 1,
    },
  };

  return (
    <div className={styles.main}>
      <YMInitializer
        accounts={[95153753]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
        version="2"
      />
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        id="main"
        className={styles.mainBlock}
      >
        <div className={styles.container}>
          <Header />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.newsBlock}
      >
        <div className={styles.container}>
          <NewsBlock />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        id="adv"
        className={styles.services}
      >
        <img
          className={styles.servicesLightRight}
          src={light}
          alt="Правое свечение"
        />
        <img
          className={styles.servicesLightLeft}
          src={light}
          alt="Левое свечение"
        />
        <div className={styles.container}>
          <Typography
            className={styles.servicesTitle}
            type="h2"
            text="НАШИ УСЛУГИ"
          />
          <Services />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        id="products"
        className={styles.products}
      >
        <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
          <div className={styles.container}>
            <Typography
              className={styles.productsTypography}
              type="h2"
              text="ЛУЧШЕЕ РЕШЕНИЕ ДЛЯ ВАС"
            />
            <Products />
          </div>
        </Animate>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.payment}
        id="payment"
      >
        <div className={styles.container}>
          <Payment />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.steps}
      >
        <div className={styles.container}>
          <img
            className={styles.stepsMiniCross}
            src={miniCross}
            alt="крестик"
          />
          <Typography
            className={styles.stepsTypography}
            type="h2"
            text="ЭТАПЫ РАБОТЫ"
          />
          <Stages />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.gifts}
      >
        <div className={styles.container}>
          <Typography
            className={styles.giftsTypography}
            type="h2"
            text="ВМЕСТЕ С ПК ВЫ ПОЛУЧИТЕ"
          />
          <Gifts />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.advantages}
      >
        <div className={styles.container}>
          <Typography
            className={styles.advantagesTypography}
            type="h2"
            text="НАШИ ПРЕИМУЩЕСТВА"
          />
          <Advantages />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.social}
        id="socials"
      >
        <div className={styles.container}>
          <Typography
            className={styles.socialTypography}
            type="h2"
            text="НАШИ СОЦИАЛЬНЫЕ СЕТИ"
          />
          <Socials />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        id="rev"
        className={styles.cases}
      >
        <div className={styles.container}>
          <Typography
            className={styles.productsTypography}
            type="h2"
            text="НАШИ КЕЙСЫ"
          />
          <Cases />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!isMobile ? "hidden" : "onlyVisible"}
        whileInView={!isMobile ? "visible" : "onlyVisible"}
        viewport={{ once: true }}
        className={styles.live}
      >
        <div className={styles.container}>
          <Typography
            className={styles.productsTypography}
            type="h2"
            text="LIVE ЛЕНТА"
          />
          <Live />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        id="form"
        initial={!!isMobile && "hidden"}
        whileInView={!!isMobile && "visible"}
        viewport={{ once: true }}
        className={styles.form}
      >
        <div className={styles.container}>
          <Form />
        </div>
      </motion.section>
      <motion.section
        variants={defaultBlockAnimation}
        initial={!!isMobile && "hidden"}
        whileInView={!!isMobile && "visible"}
        viewport={{ once: true }}
        className={styles.footer}
      >
        <div className={styles.container}>
          <Footer />
        </div>
      </motion.section>
    </div>
  );
};

export default MainPage;
