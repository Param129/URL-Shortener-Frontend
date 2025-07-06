import axiosInstance from "../utils/axiosInstance.js"

export const createShortUrlFromFrontend = async(url,slug) => {
    const {data} = await axiosInstance.post("/api/create",{url,slug});
    return data;
}