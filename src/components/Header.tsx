import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/authSlice";
import { fetchAccountInfo } from "../api/account";
import style from "../styles/Header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<{ usedCompanyCount: number; companyLimit: number } | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccountInfo()
        .then((data) => {
          setCompanyInfo(data.eventFiltersInfo);
        })
        .catch(() => setCompanyInfo(null))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      {/* Desktop Navigation */}
      <div className={style.desktop}>
        <div className={style.logo}>
          <img src="/img/header_logo.png" alt="Логотип" />
        </div>
        <nav className={style.nav}>
          <Link to="/" className={style.navLink}>Главная</Link>
          <Link to="#" className={style.navLink}>Тарифы</Link>
          <Link to="#" className={style.navLink}>FAQ</Link>
        </nav>

        {isAuthenticated ? (
          <div className={style.authSection}>
            {loading ? (
              <div className={style.loader}>Загрузка...</div>
            ) : (
              companyInfo && (
                <div className={style.companyInfo}>
                  <div className={style.limitInfo}>
                    Использовано компаний <span className={style.highlightOne}>{companyInfo.usedCompanyCount}</span>
                  </div>
                  <div className={style.limitInfo}>
                    Лимит по компаниям <span className={style.highlightTwo}>{companyInfo.companyLimit}</span>
                  </div>
                </div>
              )
            )}
            <div className={style.userSection}>
              <span className={style.userName}>Алексей А.</span>
              <button className={style.logoutButton} onClick={handleLogout}>
                Выйти
              </button>
              <div className={style.userIcon}>
                <img src="/img/user_icon.png" alt="Аватар" width={30} height={30} />
              </div>
            </div>
          </div>
        ) : (
          <div className={style.authLinks}>
            <Link to="#" className={style.registerLink}>Зарегистрироваться</Link>
            <Link to="/login" className={style.loginLink}>Войти</Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className={`${style.mobile} ${menuOpen ? style.open : ""}`}>
        <div className={style.mobileHeader}>
          <div className={style.logo}>
            <img src={menuOpen ? "/img/logo_white.png" : "/img/header_logo.png"} alt="Лого" />
          </div>

          {isAuthenticated && (
            <div className={style.companyInfo}>
              {loading ? (
                <div className={style.loader}>Загрузка...</div>
              ) : (
                companyInfo && (
                  <>
                    <div className={style.limitInfo}>
                      Использовано компаний <span className={style.highlightOne}>{companyInfo.usedCompanyCount}</span>
                    </div>
                    <div className={style.limitInfo}>
                      Лимит по компаниям <span className={style.highlightTwo}>{companyInfo.companyLimit}</span>
                    </div>
                  </>
                )
              )}
            </div>
          )}

          <button className={style.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <img src={menuOpen ? "/img/close.png" : "/img/hamburger.png"} alt="Меню" />
          </button>

          <div className={`${style.mobileMenu} ${menuOpen ? style.open : ""}`}>
            <nav className={style.nav}>
              <Link to="/" className={style.navLink}>Главная</Link>
              <Link to="#" className={style.navLink}>Тарифы</Link>
              <Link to="#" className={style.navLink}>FAQ</Link>
            </nav>

            {isAuthenticated ? (
              <div className={style.userSection}>
                <span className={style.userName}>Алексей А.</span>
                <button className={style.logoutButton} onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            ) : (
              <div className={style.authLinks}>
                <Link to="#" className={style.registerLink}>Зарегистрироваться</Link>
                <Link to="/login" className={style.loginLink}>Войти</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
