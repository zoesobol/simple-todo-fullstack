import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "aws-amplify";

function App() {
  const [message, setMessage] = useState(null);

  const getData = async () => {
    const data = await API.get("simpletodoapi", "/simpletodoapi");
    setMessage(data.message);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
