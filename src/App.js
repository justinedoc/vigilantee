import { Navbar } from "./components/Navbar";
import "./index.css";
import "./login.css";
import { MembersSection } from "./components/MembersSection";
import { Main } from "./components/Main";
import { LoginPage } from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Onboarding } from "./components/Onboarding";
import signUpImg from "./img/signupImage.png";
import signInImg from "./img/loginImage.png";
import { useEffect, useState } from "react";
import loadingSVG from "./img/loading.svg";

const loginPageDetails = {
  headerTexts: ["Welcome Back!", "Please enter your details"],
  forLogin: true,
  action: "Log in",
  img: signInImg,
};

const signupPageDetails = {
  headerTexts: ["Create your account", "Lets get started"],
  forLogin: false,
  action: "Sign up",
  img: signUpImg,
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);

    if (user?.authenticated) {
      setIsAuthenticated(true);
      console.log("isAuthenticated set");
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  return loading ? (
    <img
      src={loadingSVG}
      alt="loading"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard authStatus={{ isAuthenticated, setIsAuthenticated }} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage
                details={loginPageDetails}
                authStatus={{ isAuthenticated, setIsAuthenticated }}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <LoginPage
                details={signupPageDetails}
                authStatus={{ isAuthenticated, setIsAuthenticated }}
              />
            ) : (
              <Navigate to={"/dashboard"} />
            )
          }
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

function Dashboard({ authStatus }) {
  return (
    <>
      <Navbar authStatus={authStatus} />
      <Main />
      <MembersSection />
    </>
  );
}
