// services/types.ts
export interface AccountInfoResponse {
  eventFiltersInfo: {
    usedCompanyCount: number;
    companyLimit: number;
  };
}
  
export interface BalanceResponse {
  freeSearchAmount: number;
  totalDocuments: number;
  totalIdentifiedDocuments: number;
}

export interface HistogramEntry {
  date: string;
  value: number;
}

export interface HistogramData {
  histogramType: string;
  data: HistogramEntry[];
}

export interface SearchResultItem {
  encodedId: string;
}

export interface DocumentItem {
  attributes?: {
    isTechNews?: boolean;
    isAnnouncement?: boolean;
    isDigest?: boolean;
    wordCount?: number;
  };
  content?: { markup?: string };
  id: string;
  issueDate?: string;
  source?: { name?: string };
  title?: { text?: string };
  url?: string;
}

export interface HistogramTableProps {
  totalDocumentsData: HistogramEntry[];
  riskFactorsData: HistogramEntry[];
}

export const slides = [
  {
    text: "Высокая и оперативная скорость обработки заявки",
    icon: "/img/timer.png", // Путь к иконке
  },
  {
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    icon: "/img/search.png",
  },
  {
    text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    icon: "/img/security.png",
  },
];

export const tariffs = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Для небольшого исследования",
    color: "#FFB64F",
    newPrice: "799 ₽",
    oldPrice: "1 200 ₽",
    installment: "150 ₽/мес. при рассрочке на 24 мес.",
    features: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Для HR и фрилансеров",
    color: "#7CE3E1",
    newPrice: "1 299 ₽",
    oldPrice: "2 600 ₽",
    installment: "279 ₽/мес. при рассрочке на 24 мес.",
    features: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Для корпоративных клиентов",
    color: "#000000",
    newPrice: "3 700 ₽",
    oldPrice: "2 379 ₽",
    installment: null,
    features: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
  },
];