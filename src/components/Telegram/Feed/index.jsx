import styles from "./Feed.module.scss";
import { ReactComponent as LogoSVG } from "../../../images/telegram/feed/logo.svg";
import { ReactComponent as HowSVG } from "../../../images/telegram/feed/how.svg";
import { ReactComponent as ReviewSVG } from "../../../images/telegram/feed/review.svg";
import { ReactComponent as FaqSVG } from "../../../images/telegram/feed/faq.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const feedList = [
  {
    id: 1,
    background: "",
    icon: <LogoSVG />,
    text: "Знакомьтесь, va-pc!",
  },
  {
    id: 2,
    background: "",
    icon: <HowSVG />,
    text: "КАК ЗАКАЗАТЬ компьютер?",
  },
  {
    id: 3,
    background: "",
    icon: <ReviewSVG />,
    text: "отзывы",
  },
  {
    id: 4,
    background: "",
    icon: <FaqSVG />,
    text: "faq",
  },
];

const Feed = () => {
  return (
    <div className={styles.feed}>
      <Slider
        // responsive={responsive}
        className={styles.slider}
        focusOnSelect
        autoplay
        // infinite={false}
        slidesToScroll={1}
        rows={1}
        swipeToSlide
        swipeThreshold={1}
        slidesToShow={3}
        // centerPadding={10}
        // centerMode
        arrows={false}
        easing
      >
        {feedList.map((item) => {
          return (
            <div className={styles.slide}>
              <div key={item.id} className={styles.feedItem}>
                <div className={styles.icon}>{item.icon}</div>
                <p className={styles.text}>{item.text}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Feed;
