import API from "./axios"; // or your axios instance

export const getDashboard = async () => {
    const { data } = await API.get("/dashboard");
    return data.data;
};