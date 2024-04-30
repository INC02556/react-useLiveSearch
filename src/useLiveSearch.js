import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

function useLiveSearch(getFunction) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (payload) => {
    setLoading(true);
    try {
      const data = await getFunction(payload);
      setOptions(data);
    } catch (error) {
        setOptions([]);
    }
    setLoading(false);
  };

  const debouncedFetchData = useCallback(
    debounce((payload) => fetchData(payload), 800),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchData.cancel();
    };
  }, [debouncedFetchData]);

  const handleChangeInput = (payload) => {
    setInputValue(payload);
    debouncedFetchData(payload);
  };

  return [ options, loading, handleChangeInput];
}

export default useLiveSearch;
