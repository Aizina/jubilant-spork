import { apiRequest } from "./interceptor";


export const fetchHistogramData = async (formData: any) => {
  try {
    const response = await apiRequest("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms", {
      method: "POST",
      body: JSON.stringify({
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
        issueDateInterval: {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: formData.inn,
                maxFullness: formData.maxFullness,
                inBusinessNews: formData.businessContext,
              },
            ],
            onlyMainRole: formData.mainRole,
            tonality: formData.tonality,
            onlyWithRiskFactors: formData.riskFactors,
          },
        },
        limit: parseInt(formData.limit, 10),
        sortType: "issueDate",
        sortDirectionType: "desc",
      }),
    });
    console.log("Response is ", response);
    return response.data;

    
  } catch (error) {
    console.error("Ошибка получения гистограммы:", error);
    return [];
  }
};



export const fetchSearchResults = async (formData: any) => {
    return await apiRequest("https://gateway.scan-interfax.ru/api/v1/objectsearch", {
        method: "POST",
        body: JSON.stringify({
          intervalType: "month",
          histogramTypes: ["totalDocuments", "riskFactors"],
          issueDateInterval: {
            startDate: formData.startDate,
            endDate: formData.endDate,
          },
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: "company",
                  inn: formData.inn,
                  maxFullness: formData.maxFullness,
                  inBusinessNews: formData.businessContext,
                },
              ],
              onlyMainRole: formData.mainRole,
              tonality: formData.tonality,
              onlyWithRiskFactors: formData.riskFactors,
            },
          },
          limit: parseInt(formData.limit, 10),
          sortType: "issueDate",
          sortDirectionType: "desc",
        }),
    })
};

export const fetchDocumentDetails = async (ids: string[]) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      console.error("Ошибка: передан пустой массив `ids`");
      return [];
    }
  
    try {
      const response = await apiRequest("https://gateway.scan-interfax.ru/api/v1/documents", {
        method: "POST",
        body: JSON.stringify({ ids }),
      });
  
      if (!response || !Array.isArray(response)) {
        throw new Error("Некорректный ответ от сервера");
      }
  
      return response
        .filter((doc) => doc.ok) 
        .map((doc) => doc.ok);
    } catch (error) {
      console.error("Ошибка загрузки документов:", error);
      return [];
    }
  };
  