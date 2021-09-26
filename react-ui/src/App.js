import "./App.css";
import PrivateApp from "./Components/PrivateApp";
import Login from "./Components/Login";
import React from "react";

class App extends React.Component {
  // here we want to put if logged in then show private app otherwise show the login screen

  render() {
    let loggedin;
    if (window.localStorage.getItem("AuthToken") !== null) {
      loggedin = true;
    } else {
      loggedin = false;
    }
    return <div id="parentDiv">{loggedin ? <PrivateApp /> : <Login />}</div>;
  }
}

export default App;
