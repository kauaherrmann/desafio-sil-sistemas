import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export function useFetchData<T = any>(
  url: string | null,
  config?: AxiosRequestConfig,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setData(null); 

    (async () => {
      try {
        const res = await axios.get(url, config);
        // Delay artificial para visualização do loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData(res.data);
        setError(null);
      } catch (err: any) {
        setError("Erro ao buscar dados. Tente novamente mais tarde.");
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, deps);

  return { data, loading, error };
}
