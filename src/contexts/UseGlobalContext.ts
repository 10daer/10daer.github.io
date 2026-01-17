import { createContext, useContext } from "react";
import { IGlobals } from "./types";

export const GlobalContext = createContext<IGlobals | undefined>(undefined);

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("GlobalContext was used outside the GlobalProvider");
  return context;
}

export default useGlobalContext;
