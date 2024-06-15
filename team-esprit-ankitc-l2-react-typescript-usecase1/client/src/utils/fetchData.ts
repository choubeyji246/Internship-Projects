import { useState, useEffect } from "react";
import getResponse from "./GetResponse";
import { Order } from "./type";

const useFetchData = (url: string, dependencies: any[]) => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getResponse("GET", url);
        setData(response.data.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();

  }, dependencies);

  return data;
};

export default useFetchData;