import { useRef } from "react";
import styles from "../styles/HistogramTable.module.scss";
import { HistogramTableProps } from "../helpers/types";


const HistogramTable: React.FC<HistogramTableProps> = ({ totalDocumentsData, riskFactorsData }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft -= 200; 
    }
  };

  const scrollRight = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft += 200; 
    }
  };

  return (
    <div className={styles.histogramWrapper}>
      {/* Navigation buttons */}
      <div className={styles.histogramNav}>
        <button className={styles.scrollLeft} onClick={scrollLeft}>
          <img src="/img/left.png" alt="Left icon"/>
          </button>
        <button className={styles.scrollRight} onClick={scrollRight}>
          <img src="/img/right.png" alt="Right icon"/>  
        </button>
      </div>

      {/* Scrollable Table */}
      <div className={styles.histogramTable} ref={tableRef}>
        <div className={styles.histogramHeadings}>
          <div className={styles.eachHeading}>Период</div>
          <div className={styles.eachHeading}>Всего</div>
          <div className={styles.eachHeading}>Риски</div>
        </div>
        <div className={styles.tableDiv}>
          <table>
            <thead>
              <tr>
                {totalDocumentsData.map((entry, idx) => (
                  <th key={`period-${idx}`} className={styles.histogramDate}>
                    {new Date(entry.date).toLocaleDateString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {totalDocumentsData.map((entry, idx) => (
                  <td key={`total-${idx}`} className={styles.histogramValue}>
                    {entry.value}
                  </td>
                ))}
              </tr>
              <tr>
                {riskFactorsData.map((entry, idx) => (
                  <td key={`risk-${idx}`} className={styles.histogramValue}>
                    {entry.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default HistogramTable;
