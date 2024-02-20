import React, { useState, useEffect } from "react";
import TodoComponent from "./TodoComponent";
import MyLoader from "./MyLoader";

const App = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return <>{Loading ? <MyLoader /> : <TodoComponent />}</>;
};

export default App;
