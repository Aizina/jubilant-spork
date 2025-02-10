import styles from '../styles/DocumentsList.module.scss';
import { parseXMLToText } from "../helpers/parseXMLToText";
import { DocumentItem } from "../helpers/types";

interface DocumentsListProps {
  documents: DocumentItem[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  return (
    <div className={styles.documentsContainer}>
      {documents.map((doc, index) => (
        <div key={`${doc.id}-${index}`} className={styles.documentCard}>
          <div className={styles.documentHeader}>
            <span>{doc.issueDate ? new Date(doc.issueDate).toLocaleDateString() : "Нет даты"}</span>
            <span>{doc.source?.name || "Неизвестный источник"}</span>
          </div>
          <h3>{doc.title?.text || "Без заголовка"}</h3>
          <p className={styles.documentTags}>
            {doc.attributes?.isAnnouncement && "Анонс"}{" "}
            {doc.attributes?.isDigest && "Сводка"}{" "}
            {doc.attributes?.isTechNews && "Тех. новость"}
          </p>
    
          <p className={styles.documentText}>{parseXMLToText(doc.content?.markup || "")}</p>
          <div className={styles.documentFooter}>
            <button className={styles.readMore}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                Читать в источнике
              </a>
            </button>
            <span className={styles.wordCount}>{doc.attributes?.wordCount || 0} слов</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
