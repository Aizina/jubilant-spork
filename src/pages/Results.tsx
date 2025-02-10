import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDocumentDetails } from "../api/search";
import styles from '../styles/Results.module.scss';
import HistogramTable from "../components/HistogramTable";
import { SearchResultItem, DocumentItem, HistogramData, HistogramEntry } from "../helpers/types";
import DocumentsList from "../components/DocumentsList";

const Results = () => {
  const location = useLocation();
  const { histogramData, searchResults } = location.state || {};
  const searchItems: SearchResultItem[] = searchResults?.items || [];

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const loadDocuments = async (page: number) => {
    setLoading(true);
    try {
      const ids: string[] = searchItems.slice(page * 10, (page + 1) * 10).map((item) => item.encodedId);
  
      if (ids.length === 0) {
        setHasMore(false);
        return;
      }
  
      const response: DocumentItem[] = await fetchDocumentDetails(ids);
      console.log(response);
  
      setDocuments((prev) => {
        const allDocuments = [...prev, ...response];
        const uniqueTitles = new Set<string>();
        
  
        // Фильтрация уникальных документов по title.text
        const filteredDocuments = allDocuments.filter((doc) => {
          const title = doc.title?.text;
          if (title && !uniqueTitles.has(title)) {
            uniqueTitles.add(title);
            return true;
          }
          return false;
        });
  
        return filteredDocuments;
      });
  
      setCurrentPage(page + 1);
    } catch (error) {
      console.error("❌ Ошибка загрузки документов:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (searchItems.length > 0) {
      loadDocuments(0);
    }
  }, [searchItems]);

  const totalDocumentsData = histogramData?.find((item: HistogramData) => item.histogramType === "totalDocuments")?.data || [];
  const riskFactorsData = histogramData?.find((item: HistogramData) => item.histogramType === "riskFactors")?.data || [];
  const totalDocumentsCount = totalDocumentsData.reduce((sum: number, item: HistogramEntry) => sum + item.value, 0);


  return (
    <div className={styles.results}>

      <div className={styles.resultsContainer}>
        <div className={styles.waiting}>
          <div className={styles.waitingText}>
            <h1>Ищем. Скоро будут результаты</h1>
            <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
          </div>
          <img src="/img/results.png" alt="Results" className={styles.waitingImage}/>
        </div>

        <div className={styles.histogramTable}>
          <h2>Общая сводка</h2>
          <p>Найдено {totalDocumentsCount} вариантов</p>
          <HistogramTable totalDocumentsData={totalDocumentsData} riskFactorsData={riskFactorsData} />
        </div>

        <div className={styles.documentsContainer}>
          <h2>Список документов</h2>
          <DocumentsList documents={documents} />
        </div>

        {hasMore && !loading && <button onClick={() => loadDocuments(currentPage)} className={styles.loadMore}>Показать больше</button>}
      </div>
    </div>

  );
};

export default Results;
