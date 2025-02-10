import style from "../styles/Search.module.scss";
import SearchForm from "../components/SearchForm";
const Search = () => {

  return (
    <div className={style.search}>
        <div className={style.searchWrap}>
            <div className={style.searchFormWrap}>
                <h1> Найдите необходимые данные в пару кликов.</h1>
                <p>Задайте параметры поиска. 
                Чем больше заполните, тем точнее поиск</p>
                <SearchForm />
                <img src='/img/Document.png' alt="Document" className={style.document} />
            </div>
            <div className={style.imagesWrap}>
                <img src='/img/Folders.png' alt="Folders" className={style.folders} />
                <img src='/img/Rocketguy.png' alt="Rocketguy" className={style.rocketguy} />
            </div>
            
        </div>
    </div>
  );
};

export default Search;
