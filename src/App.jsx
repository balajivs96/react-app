import { useState } from "react";

import { Outlet } from "react-router";
import { Headers } from "./components/Headers";
import "./App.css";
function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <div className={`container-fluid theme-${theme}`} data-bs-theme={theme}>
        <div className="row">
          <div className="col-sm-12">
            <Headers title="Amzkart" theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="col-sm-12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
