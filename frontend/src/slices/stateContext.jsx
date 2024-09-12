// Imports:
import { createContext, useState } from 'react';

// Context initiation:
const StateContext = createContext();

///////////////////////////////////////////////////
// Provider
export function StateProvider({ children }) {
  // State veriables:
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Set provider veriables:
  const globalVariables = { isCartOpen, setIsCartOpen };

  // Return Provider:
  return (
    <StateContext.Provider value={globalVariables}>{children}</StateContext.Provider>
  );
}
export default StateContext;
