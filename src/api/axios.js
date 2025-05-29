import axios from "axios";

// 可根據環境動態設定 baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 10000, // 10 秒超時
  headers: {
    "Content-Type": "application/json",
  },
});

// 依照 method 回傳對應的 console 背景顏色
function getMethodColor(method) {
  if (!method) return "background:#607D8B; color:#fff"; // 預設灰藍色
  switch (method.toLowerCase()) {
    case "get":
      return "background:#4CAF50; color:#fff"; // 綠色
    case "post":
      return "background:#2196F3; color:#fff"; // 藍色
    case "delete":
      return "background:#f44336; color:#fff"; // 紅色
    case "put":
      return "background:#FF9800; color:#fff"; // 橘色
    default:
      return "background:#607D8B; color:#fff";
  }
}
// 包裝 console.group，統一顯示樣式
function logGroup(type, method, url, data, isError = false) {
  const methodColor = getMethodColor(method);
  const label = `Method:[${method?.toUpperCase() || "UNKNOWN"}]; ${type}:[${url}]`;
  const groupStyle = isError ? "background:#f98686; color:#000" : methodColor;

  console.group(`%c ${label}`, groupStyle);
  if (data !== undefined) {
    console.log(type + " Data:", data);
  }
  console.groupEnd();
}

instance.interceptors.request.use(
  (config) => {
    logGroup("Request", config.method, config.url || "", config.data);
    // 可在此加入 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    logGroup("Request", error.config?.method, error.config?.url || "", error, true);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    logGroup("Response", response.config.method, response.config.url || "", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    logGroup("Error", error.config?.method, error.config?.url || "", error, true);

    // 統一處理錯誤，例如跳轉登入、toast 提示等
    if (error.response?.status === 401) {
      // 可以導向登入頁或清除登入狀態
      console.warn("請重新登入");
    }
    return Promise.reject(error);
  }
);
