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
    axios
      .get(url, config)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Erro ao buscar dados"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}