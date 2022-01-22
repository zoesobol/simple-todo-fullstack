import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "aws-amplify";

function App() {
  const [message, setMessage] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const listTodos = todos.map((d) => (
    <div>
      <h2>{d.name.S}</h2>
      <p>{d.description.S}</p>
    </div>
  ));

  const getData = async () => {
    const data = await API.get("simpletodoapi", "/simpletodoapi");
    setTodos(data.data.Items);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(todos);
  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">{listTodos}</header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>To-do's</h1>
          {listTodos}
        </header>
      </div>
    );
  }
}

export default App;
