import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [NumeroDaPergunta, setNumeroDaPergunta] = useState({
    num: 0,
  });

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setNumeroDaPergunta(JSON.parse(userStorage));
    } else {
      setNumeroDaPergunta({
        num: 0,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ NumeroDaPergunta, setNumeroDaPergunta }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
