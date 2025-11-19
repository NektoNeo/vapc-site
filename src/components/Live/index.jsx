import styles from "./Live.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prev1 from "../../images/live/prev_svo_1.png";
import prev2 from "../../images/live/prev_svo_2.png";
import prev3 from "../../images/live/prev_svo_3.png";
import prev4 from "../../images/live/prev_svo_4.png";
import prev5 from "../../images/live/prev_svo_5.png";
import prev6 from "../../images/live/prev_svo_6.png";
import prev7 from "../../images/live/prev_svo_7.png";
import prev8 from "../../images/live/prev_svo_8.png";
import prev9 from "../../images/live/prev_svo_9.png";
import prev10 from "../../images/live/prev_svo_10.png";
import prev11 from "../../images/live/prev_svo_11.png";
import prev12 from "../../images/live/prev_svo_12.png";
import prev13 from "../../images/live/prev_svo_13.png";

const Live = () => {
  const lives = [
    {
      img: prev1,
      link: "https://youtube.com/shorts/O4Q7lpuNwLM?feature=share",
    },
    {
      img: prev2,
      link: "https://youtube.com/shorts/YmjOlQ5hL-4?feature=share",
    },
    {
      img: prev3,
      link: "https://youtube.com/shorts/-UYMc5FRqYA?feature=share",
    },
    {
      img: prev4,
      link: "https://youtube.com/shorts/TVmsH9KGCuk?feature=share",
    },
    {
      img: prev5,
      link: "https://youtube.com/shorts/KNNxsaqY6hE?feature=share",
    },
    {
      img: prev6,
      link: "https://youtube.com/shorts/gw0smszOaoU?feature=share",
    },
    {
      img: prev7,
      link: "https://youtube.com/shorts/5TCBDkEUoxI?feature=share",
    },
    {
      img: prev8,
      link: "https://youtube.com/shorts/6bnR8Wdy6yc?feature=share",
    },
    {
      img: prev9,
      link: "https://youtube.com/shorts/5HKExPU4knk?feature=share",
    },
    {
      img: prev10,
      link: "https://youtube.com/shorts/jPAEv_HlIzQ?feature=share",
    },
    {
      img: prev11,
      link: "https://youtube.com/shorts/GmEh52PrmLA?feature=share",
    },
    {
      img: prev12,
      link: "https://youtube.com/shorts/eijKqlbuIE0?feature=share",
    },
    {
      img: prev13,
      link: "https://youtube.com/shorts/EquTlwcksLc?feature=share",
    },
  ];
  const responsive = [
    {
      breakpoint: 2200,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ];
  return (
    <div className={styles.live}>
      <Slider
        responsive={responsive}
        focusOnSelect
        autoplay
        slidesToScroll={1}
        rows={1}
        swipeToSlide
        swipeThreshold={50}
        slidesToShow={5}
        centerMode
        arrows={false}
        easing
      >
        {lives.map((item, index) => (
          <a key={index} target="_blank" href={item.link} className={styles.liveItem}>
            <img src={item.img} alt="live" />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default Live;
