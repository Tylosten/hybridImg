import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  let location;
  try {
    location = useLocation();
  } catch {
    location = '';
  }
  const key = location.pathname + localStorageKey;
  defaultValue = defaultValue || '';
  const onServer = typeof window === 'undefined';
  const initValue = onServer
    ? defaultValue
    : localStorage.getItem(key) || defaultValue;

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (onServer) {
      localStorage.setItem(key, value);
    }
  }, [value]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
