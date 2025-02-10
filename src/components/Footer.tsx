import style from '../styles/Footer.module.scss';

const Footer = () => {

  return (
    <footer className={style.footer}>
        <div  className={style.footer_wrap}>
            <div className={style.logo}>
            <img src="/img/logo_white.png" alt="Логотип" />
            </div>

            <div className={style.info}>
                <p>
                    г. Москва, Цветной б-р, 40 <br />
                    +7 495 771 21 11 <br />
                    <a href="mailto:info@skan.ru">info@skan.ru</a>
                </p>

                <p>Copyright. 2022 </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
