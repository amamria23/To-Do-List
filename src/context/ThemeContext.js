import { createContext, useReducer } from "react";
const ThemeContext = createContext();

const initialData = {
  theme:
    localStorage.getItem("mytheme") === null
      ? "light"
      : localStorage.getItem("mytheme") === "light"
      ? "light"
      : "dark",
};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "ChangeTheme":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeTheme = (newName) => {
    localStorage.setItem("mytheme", newName);
    dispatch({ type: "ChangeTheme", newValue: newName });
  };
  return (
    <ThemeContext.Provider value={{ ...firstState, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
