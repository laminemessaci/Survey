import { useEffect, useState } from 'react';

/**
 * Retrieves data from a specified data source using the fetch API.
 *
 * @param {string} dataSource - The URL of the data source.
 * @return {object} - An object containing the fetched data, a boolean indicating whether the data is currently being fetched, and an error flag indicating whether an error occurred during the fetch operation.
 */
export function useFetch(dataSource) {
  const [data, setData] = useState({});
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataSource) return;

    async function fetchData() {
      try {
        const response = await fetch(dataSource);
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }

    fetchData();
  }, [dataSource]);

  return { data, isDataLoading, error };
}
