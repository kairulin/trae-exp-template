import { instance } from "./axios";

export const getApiUsers = () => instance.get("/api/users");

export const postApiUsers = (data) => instance.post("/api/users", data);