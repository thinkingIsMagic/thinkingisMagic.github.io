// useSearch.ts
import { useEffect, useState } from 'react';

const useSearch = (files: string[], query: string) => {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      const filteredResults = files
        .filter(file => file.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [files, query]);

  return results;
};

export default useSearch;
