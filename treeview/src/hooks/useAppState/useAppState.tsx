import { useState, useCallback, useEffect, useMemo } from "react";
import api from "../../api";
import flattenTree from "../../helpers/flattenArray";
import type { FlatMap, TreeNode } from "../../types/types";

export const useAppState = () => {
  const [data, setData] = useState<TreeNode | null>(null);
  const [flatData, setFlatData] = useState<FlatMap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.get();
      const flat = flattenTree(result)
      setFlatData(flat);
      setData(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    run(); // automatically call api.get() on mount
  }, [run]);

  const appState = useMemo(() => ({
      data, flatData, loading, error, refresh: run
  }), [data, flatData, loading, error, run])

  return appState;
}