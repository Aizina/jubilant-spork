export const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      console.warn("Нет токена! Перенаправление на вход...");
      return window.location.replace("/login");
    }
  
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
  
      if (response.status === 401) {
        console.warn("Токен недействителен! Выход...");
        if (localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken");
          window.location.replace("/login");
        }
        return;
      }
  
      return response.json();
    } catch (error) {
      console.error("Ошибка сети:", error);
      throw new Error("Ошибка сети. Попробуйте позже.");
    }
  };
  