import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { login } from "../api/auth";
import styles from "../styles/LoginForm.module.scss";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState<{ login?: string; password?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const isFormValid = loginData.login.trim() !== "" && loginData.password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!isFormValid) return;

    dispatch(loginStart());
    setLoading(true);

    try {
      const data = await login(loginData.login, loginData.password);
      dispatch(loginSuccess({ token: data.accessToken, expire: data.expire }));

      setLoginData({ login: "", password: "" }); 
      navigate("/search");
    } catch (error: any) {
      setErrors({ server: error.message || "Ошибка соединения с сервером" });
      dispatch(loginFailure(error.message || "Ошибка входа"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.loginFormWrap}>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <div className={styles.container}>
          
          <img src="/img/Lock.png" alt="Lock" className={styles.lock} />

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="login">Логин или номер телефона:</label>
              <input
                type="text"
                id="login"
                name="login"
                value={loginData.login}
                onChange={handleChange}
                required
                className={errors.login ? styles.errorInput : ""}
              />
              {errors.login && <span className={styles.errorMessage}>{errors.login}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                className={errors.password ? styles.errorInput : ""}
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>

            {errors.server && <p className={styles.serverError}>{errors.server}</p>}

            <div className={styles.actions}>
              <button type="submit" className={`${styles.submitButton} ${isFormValid ? styles.active : ""}`} disabled={!isFormValid || loading}>
                {loading ? "Вход..." : "Войти"}
              </button>
              <button type="button" className={styles.forgotPassword}>Восстановить пароль</button>
            </div>
          </form>
        </div>

        <img src="/img/Characters.png" alt="Characters" className={styles.characters} />
      </div>
    </div>
  );
};

export default LoginForm;
