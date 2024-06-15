import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const getResponse = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> => {
  // console.log(data);
  // console.log(url);

  const config: AxiosRequestConfig = {
    method: method,
    url: `http://localhost:3001/${url}`,
    headers: { "Content-Type": "application/json" },
    data: data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getResponse;
