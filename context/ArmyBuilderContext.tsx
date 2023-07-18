import { createContext, useContext } from 'react';

const armyBuilderContext = createContext<{} | null>(null);

export function ArmyBuilderContext({ children }: { children: JSX.Element }) {
  return (
    <armyBuilderContext.Provider value={null}>
      {children}
    </armyBuilderContext.Provider>
  );
}
export const useArmyBuilder = () => useContext(armyBuilderContext);
