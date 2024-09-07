import { Navbar } from "./components/Navbar";
import "./index.css";
import "./login.css";
import { MembersSection } from "./components/MembersSection";
import { Main } from "./components/Main";
import { LoginPage } from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Onboarding } from "./components/Onboarding";
import signUpImg from "./img/signupImage.png";
import signInImg from "./img/loginImage.png";

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
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage details={loginPageDetails} />}
        />
        <Route
          path="/signup"
          element={<LoginPage details={signupPageDetails} />}
        />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Main />
              <MembersSection />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
