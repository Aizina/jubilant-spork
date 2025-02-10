export const login = async (login: string, password: string) => {
  try {
    const response = await fetch("https://gateway.scan-interfax.ru/api/v1/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации");
    }

    return response.json();
  } catch (error) {
    throw new Error("Ошибка сети. Проверьте интернет-соединение.");
  }
};
