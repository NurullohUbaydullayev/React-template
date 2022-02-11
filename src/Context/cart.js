import React from "react";

const Context = React.createContext();

function Provider({ children }) {
  const [count, setCount] = React.useState(
    JSON.parse(window.localStorage.getItem("count")) || []
  );

  React.useEffect(() => {
    window.localStorage.setItem("count", JSON.stringify(count));
  }, [count]);
  return <Context.Provider value={{ count, setCount }}>{children}</Context.Provider>;
}

export { Context, Provider };
