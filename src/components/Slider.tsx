import { useState } from "react";
import styles from "../styles/Slider.module.scss";
import { slides } from "../helpers/types";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderBlockWrapper}>
        <h1>Почему именно мы</h1>
        <div className={styles.sliderContainer}>
          <div
            className={styles.sliderWrapper}
            style={{ transform: `translateX(-${index * 33}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className={styles.slide}>
                <img src={slide.icon} alt="icon" className={styles.icon} />
                <p className={styles.text}>{slide.text}</p>
              </div>
            ))}
          </div>

          {/* Navigation (only on mobile) */}
          <button onClick={prevSlide} className={`${styles.navButton} ${styles.left}`}>
            <img src="/img/left.png" alt="icon" className={styles.icon} />
          </button>
          <button onClick={nextSlide} className={`${styles.navButton} ${styles.right}`}>
            <img src="/img/right.png" alt="icon" className={styles.icon} />
          </button>

        </div>

        <img src='/img/Baner2.png' alt="Baner2" className={styles.slider_banner} />
      </div>

    </div>

  );
};

export default Slider;
