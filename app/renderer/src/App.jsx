import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [dbCount, setDbCount] = useState(0);

  const dbCountClick = () => {
    setDbCount(() => dbCount + 1);
  };

  const fetchData = async () => {
    const newData = await window.api.fetch("fetch-database", "goals");
    console.log(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        <button
          id="test"
          onClick={async () => {
            dbCountClick();
            await window.api.insert("insert-database", {
              title: `Title ${dbCount}`,
            });
          }}
        >
          Insert
        </button>
        <button id="test" onClick={fetchData}>
          Fetch
        </button>
        <button
          onClick={async () => console.log(await window.api.test("test"))}
        >
          Test
        </button>
        <h1>HEY WE DID IT!</h1>
      </header>
    </div>
  );
}

export default App;
