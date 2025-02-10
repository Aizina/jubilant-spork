import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store"; 
import style from "../styles/Banner.module.scss";

const Banner = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/search"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <footer className={style.banner}>
      <div className={style.banner_wrap}>
        <div className={style.main_info}>
          <h1>Сервис по поиску публикаций о компании по его ИНН</h1>
          <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
          <button onClick={handleClick}>Запросить данные</button> 
        </div>

        <div className={style.banner_img}>
          <img src="/img/Baner.png" alt="Banner" />
        </div>
      </div>
    </footer>
  );
};

export default Banner;
