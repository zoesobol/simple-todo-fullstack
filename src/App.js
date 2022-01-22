import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "aws-amplify";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const listTodos = todos.map((d) => (
    <div className="todo">
      <h3>{d.name.S}</h3>
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
        <header className="App-header">
          <h1>Loading...</h1>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>To-do's</h1>
          <p>
            Agregar todo:{" "}
            <a href="https://q6n42psf5g.execute-api.us-east-1.amazonaws.com/dev/simpletodoapi">
              https://q6n42psf5g.execute-api.us-east-1.amazonaws.com/dev/simpletodoapi
            </a>
          </p>
          {listTodos}
        </header>
      </div>
    );
  }
}

export default App;
