import { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEYS, STORAGE_PREFIX } from "../admin/utils/constants";
import { getData } from "../admin/utils/storage";
import {
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_SERVICES,
  DEFAULT_SOFTWARE,
  DEFAULT_BIDANG_DATA,
  DEFAULT_CORE_SERVICES,
  DEFAULT_FOOTER,
} from "../data/defaults";

const DataContext = createContext();

function loadAllData() {
  return {
    hero: getData(STORAGE_KEYS.hero, DEFAULT_HERO),
    about: getData(STORAGE_KEYS.about, DEFAULT_ABOUT),
    services: getData(STORAGE_KEYS.services, DEFAULT_SERVICES),
    software: getData(STORAGE_KEYS.software, DEFAULT_SOFTWARE),
    bidang: getData(STORAGE_KEYS.bidang, DEFAULT_BIDANG_DATA),
    coreServices: getData(STORAGE_KEYS.coreServices, DEFAULT_CORE_SERVICES),
    footer: getData(STORAGE_KEYS.footer, DEFAULT_FOOTER),
  };
}

export function DataProvider({ children }) {
  const [data, setData] = useState(() => loadAllData());

  const refresh = () => setData(loadAllData());

  useEffect(() => {
    const handler = (e) => {
      if (e.key && e.key.startsWith(STORAGE_PREFIX)) {
        setData(loadAllData());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <DataContext.Provider value={{ ...data, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(DataContext);
}
