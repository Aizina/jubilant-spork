import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { fetchHistogramData, fetchSearchResults } from "../api/search";
import style from "../styles/SearchForm.module.scss";

const SearchForm = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const [form, setForm] = useState({
    inn: "",
    maxFullness: false,
    businessContext: false,
    mainRole: false,
    tonality: "any",
    riskFactors: false,
    techNews: false,
    announcements: false,
    digests: false,
    limit: "",
    startDate: "",
    endDate: "",
  });


  const [errors, setErrors] = useState({ inn: "", date: "" });
  const [loading, setLoading] = useState(false);

  const validateInn = (inn: string) => /^\d{10,12}$/.test(inn);

  const validateDates = () => {
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const now = new Date();
    if (start > end) return "Дата начала не может быть позже даты конца";
    if (end > now) return "Дата конца не может быть в будущем";
    return "";
  };

  const isFormValid =
    validateInn(form.inn) &&
    !validateDates() &&
    form.limit &&
    form.startDate &&
    form.endDate;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
      setForm((prev) => ({ ...prev, [name as keyof typeof form]: newValue }));
    
      if (name === "inn") {
        setErrors({ ...errors, inn: validateInn(value) ? "" : "Некорректный ИНН" });
      }
    
      if (name === "startDate" || name === "endDate") {
        setErrors({ ...errors, date: validateDates() });
      }
    };
    
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const histogramResponse = await fetchHistogramData(form);
      const histogramData = histogramResponse ?? []; 

      const searchResults = await fetchSearchResults(form);
      console.log("Histogram Results are:",histogramData );
      navigate("/results", { state: { histogramData, searchResults } });
    } catch (error) {
      alert("Ошибка поиска");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <div className={style.mainInfo}>
        <label>
          ИНН компании*:
          <input 
            type="text" 
            name="inn" 
            value={form.inn} 
            onChange={handleChange} 
            required
            placeholder="10 цифр"
          />
          {errors.inn && <span className={style.error}>{errors.inn}</span>}
        </label>

        <label>
          Тональность:
          <select name="tonality" value={form.tonality} onChange={handleChange}>
            <option value="any">Любая</option>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
          </select>
        </label>

        <label>
          Количество документов в выдаче*:
          <input 
            type="number" 
            name="limit" 
            min="1" max="1000" 
            value={form.limit} 
            onChange={handleChange} 
            required  
            placeholder="От 1 до 1000"
          />
        </label>
      </div>

      <div className={style.checkboxes}>
        <label className={form.maxFullness ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="maxFullness" checked={form.maxFullness} onChange={handleChange} />
          Признак максимальной полноты
        </label>

        <label className={form.businessContext ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="businessContext" checked={form.businessContext} onChange={handleChange} />
          Упоминания в бизнес-контексте
        </label>

        <label className={form.mainRole ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="mainRole" checked={form.mainRole} onChange={handleChange} />
          Главная роль в публикации
        </label>

        <label className={form.riskFactors ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="riskFactors" checked={form.riskFactors} onChange={handleChange} />
          Публикации только с риск-факторами
        </label>

        <label className={form.techNews ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="techNews" checked={form.techNews} onChange={handleChange} />
          Включать технические новости рынков
        </label>

        <label className={form.announcements ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="announcements" checked={form.announcements} onChange={handleChange} />
          Включать анонсы и календари
        </label>

        <label className={form.digests ? style.activeLabel : style.inactiveLabel}>
          <input type="checkbox" name="digests" checked={form.digests} onChange={handleChange} />
          Включать сводки новостей
        </label>
      </div>

      <div className={style.dateInfo}>
        <p>Диапазон поиска*</p>
        <div className={style.dates}>
          <div className={style.dateWrapper}>
            <input 
              type="date" 
              className={style.dateInput}
              name="startDate" 
              value={form.startDate} 
              onChange={handleChange} 
              required 
              data-placeholder="Дата начала"
            />
          </div>

          <div className={style.dateWrapper}>
            <input 
              type="date" 
              className={style.dateInput}
              name="endDate" 
              value={form.endDate} 
              onChange={handleChange} 
              required 
              data-placeholder="Дата конца"
            />
          </div>
        </div>
        {errors.date && <span className={style.error}>{errors.date}</span>}
      </div>

      <div className={style.submitDiv}>
        <button 
          type="submit" 
          disabled={!isFormValid || loading} 
          className={`${style.baseButton} ${isFormValid ? style.activeButton : ""}`}
        >
          {loading ? "Поиск..." : "Поиск"}
        </button>
        <p>* Обязательные к заполнению поля</p>
      </div>

    </form>
  );
};

export default SearchForm;
