import { createContext, useState } from "react";

export const ConvContext = createContext();

const ConvProvider = ({ children }) => {
  const [conv, setConv] = useState({
    conv_id: null,
    chats: [],
  });

  return (
    <ConvContext.Provider value={{ conv, setConv }}>
      {children}
    </ConvContext.Provider>
  );
};

export default ConvProvider;
