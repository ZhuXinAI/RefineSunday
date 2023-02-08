import { useState, useEffect } from "react";
import axios from "axios";
export function useCountData(endpoint: string, key?: string) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      if (endpoint) {
        setIsLoading(true);
        const { data } = await axios.get(endpoint);
        setData(key ? data[key] : data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    isLoading,
  };
}

export function useMultipleCountData(
  endpoints: {
    url: string;
    label: string;
  }[] = [],
  key?: string
) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      if (endpoints.length) {
        setIsLoading(true);
        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            const { data } = await axios.get(endpoint.url);
            return {
              label: endpoint.label,
              count: key ? data?.[key] : data,
            };
          })
        );
        setData(results);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    isLoading,
  };
}