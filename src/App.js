import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardOps from "./components/board-ops.component";
import BoardInf from "./components/board-inf.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showOpsBoard: false,
      showInfBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showOpsBoard: user.roles.includes("ROLE_OPS"),
        showInfBoard: user.roles.includes("ROLE_INF"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showOpsBoard: false,
      showInfBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showOpsBoard, showInfBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            KambalDashboard
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showOpsBoard && (
              <li className="nav-item">
                <Link to={"/ops"} className="nav-link">
                  OPS Board
                </Link>
              </li>
            )}

            {showInfBoard && (
              <li className="nav-item">
                <Link to={"/inf"} className="nav-link">
                  Inf Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/ops" element={<BoardOps />} />
            <Route path="/inf" element={<BoardInf />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;