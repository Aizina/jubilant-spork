import { useAppSelector } from "../store/store";
import style from "../styles/Tariffs.module.scss";
import { tariffs } from "../helpers/types";


const Tariffs = () => {
  const userTariff = useAppSelector((state) => state.auth.token);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);


  return (
    <div className={style.tariffs}> 
        <div className={style.tariffsContainer}>
          {tariffs.map((tariff) => {
              const isCurrent = isAuthenticated && userTariff === tariff.id;

              return (
                <div
                    key={tariff.id}
                    className={`${style.tariffCard} ${isCurrent ? style.currentTariff : ""}`}
                    style={{ border: isCurrent? `2px solid ${tariff.color}` : ""
                    }}
                >

                  <div className={style.upperPart}
                  style={{ backgroundColor: tariff.color,
                          color : tariff.name?.toLowerCase() === 'business' ? '#fff' : '#000'
                  }}> 
                    <div className={style.mainInfo}>
                        <h3>{tariff.name}</h3>
                        <p>{tariff.description}</p>
                    </div>
                    <img src={`/img/${tariff.name}.png`} alt="icon" className={style.icons} />
                  </div>

                  <div className={style.lowerPart}>
                      {isCurrent && <div className={style.badge}>Текущий тариф</div>}
                      <div className={style.priceInfo}>
                        <div className={style.price}>
                            <span className={style.newPrice}>{tariff.newPrice}</span>
                            <span className={style.oldPrice}>{tariff.oldPrice}</span>
                        </div>
                        {tariff.installment && <p className={style.installment}>или {tariff.installment}</p>}
                      </div>

                      <div className={style.featuresWrap}>
                        <h4>В тариф входит:</h4>
                        <ul className={style.features}>
                          {tariff.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                          ))}
                        </ul>

                      </div>

                      <button className={`${style.button} ${isCurrent ? style.currentButton : ""}`}>
                        {isCurrent ? "Перейти в личный кабинет" : "Подробнее"}
                      </button>

                  </div>
                </div>
              );
          })}
        </div>
    </div>
  );
};

export default Tariffs;
