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
import { Onboarding, UpdateProfile } from "./components/Onboarding";
import signUpImg from "./img/signupImage.png";
import signInImg from "./img/loginImage.png";
import { useEffect, useState } from "react";
import loadingSVG from "./img/loading.svg";
import { ViewDashboard } from "./components/ViewDashboard";

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

  const writeUp = {
    text: "hello world",
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);

    if (user?.authenticated) {
      setIsAuthenticated(true);
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

        <Route
          path="/dashboard/edit"
          element={<UpdateProfile writeUp={writeUp} />}
        />
        <Route path="/view/users/:id" element={<ViewDashboard />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

function Dashboard({ authStatus }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const compsRequirements = { modalOpen, setModalOpen, userID, setUserID };

  return (
    <>
      <Navbar authStatus={authStatus} />
      <Main data={compsRequirements} />
      <MembersSection data={compsRequirements} />
    </>
  );
}
