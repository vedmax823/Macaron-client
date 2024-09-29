import { useEffect, useState } from "react";

export const useFetchData = <T extends { id: string | number }>(fetchDataFunction: () => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchDataFunction();
        setData(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFunction]);

  const addOne = (one: T) => {
    setData((prev) => {
      const existingIndex = prev.findIndex((o) => o.id === one.id);
  
      if (existingIndex !== -1) {
        return [
          ...prev.slice(0, existingIndex),
          one,
          ...prev.slice(existingIndex + 1),
        ];
      } else {
        return [one, ...prev];
      }
    });
  };

  return { data, loading, error, addOne };
};