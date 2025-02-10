import { apiRequest } from "./interceptor";

export const fetchAccountInfo = async () => {
  return await apiRequest("https://gateway.scan-interfax.ru/api/v1/account/info");
};
