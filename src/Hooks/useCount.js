import React from "react";
import { Context } from "../Context/cart";
const useTheme = () => {
  const ctx = React.useContext(Context);

  return [ctx.count, ctx.setCount];
};

export default useTheme;
