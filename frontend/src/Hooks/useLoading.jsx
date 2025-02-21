
import { useState } from 'react';

const useLoading = (initialLoading = false) => {
  const [loading, setLoadingState] = useState(initialLoading);

  const setLoading = (state) => {
    setLoadingState(state);
  };

  return { loading, setLoading };
};

export default useLoading;
