import { useEffect, useState } from "react";

/**
 * Custom hook to fetch data from a data source.
 * @param {string} dataSource - The URL of the data source.
 * @returns {object} - An object containing the fetched data, loading state, and error state.
 */
export function useFetch(dataSource) {
  // State variables
  const [data, setData] = useState({});
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataSource) return;

    // Fetch data from the data source
    setDataLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(dataSource);
        const data = await response.json();

        setData(data);
      } catch (err) {
        console.error(`An error occurred while fetching ${dataSource}: ${err}`);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }

    fetchData();
  }, [dataSource]);

  return { data, isDataLoading, error };
}
