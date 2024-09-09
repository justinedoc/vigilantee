import logo from "../img/vigilante.svg";
import googleLogo from "../img/googleIcon.svg";
import eyeIcon from "../img/eyeIcon.svg";
import eyeClosed from "../img/eyeClosed.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Logo() {
  return <img className="logo" src={logo} alt="logo" />;
}

function LogoinHeaderText({ text }) {
  return (
    <div className="login__header-text">
      <h1>{text[0]}</h1>
      <h4>{text[1]}</h4>
    </div>
  );
}

function LogoinForm({
  formDetails: details,
  formValues: { email, password },
  formFunctions: { setEmail, setPassword, verifyInput },
}) {
  const [passwordShowing, setPasswordShowing] = useState(false);

  return (
    <form className="login__form">
      <div className="input-box">
        <input
          value={email}
          type="email"
          name="email"
          required={true}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email" className="email_label">
          Email
        </label>
      </div>
      <div className="input-box">
        <input
          value={password}
          type={passwordShowing ? "text" : "password"}
          name="password"
          minLength={6}
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className="password_label">
          Password
        </label>
        <img
          className="eyeIcon"
          src={passwordShowing ? eyeIcon : eyeClosed}
          alt=""
          onClick={() => {
            setPasswordShowing((cur) => (cur ? false : true));
          }}
        />
      </div>

      <div className="loginSupplementaries">
        <div className="remember_me">
          <input type="checkbox" />
          <span>Remember me</span>
        </div>
        {details.forLogin ? (
          <div className="forgot_password">
            <span>forgot password?</span>
          </div>
        ) : null}
      </div>
      <LoginButtons
        buttonText={details.action}
        btnFunctions={{ verifyInput }}
      />
    </form>
  );
}

function LoginButtons({ buttonText, btnFunctions: { verifyInput } }) {
  return (
    <div className="btn__container">
      <button onClick={(e) => verifyInput(e)} type="submit">
        {buttonText}
      </button>
      <button>
        <img className="googleLogo" src={googleLogo} alt="google" />
        <span>{buttonText} with Google</span>
      </button>
    </div>
  );
}

function LoginToSignUp({ text }) {
  const action = text.forLogin ? "signup" : "login";
  return (
    <span className="alreadyHaveAcc">
      {text.forLogin ? "Don't already" : "Already"} have an account?{" "}
      <Link to={`/${action}`}>{action}</Link>
    </span>
  );
}

const handleshowLoadingModal = () => {
  Swal.fire({
    title: "Signing in...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const handlecloseLoadingModal = () => {
  Swal.close();
};

export function LoginPage({ details, authStatus: { setIsAuthenticated } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlesignInOrSignUp = async (action, shouldWelcome = true) => {
    handleshowLoadingModal("Signing in...");
    try {
      await action(auth, email, password);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              userID: user.uid,
              authenticated: true,
            })
          );

          handlecloseLoadingModal();

          shouldWelcome &&
            Swal.fire({
              title: "Login Successful",
              icon: "success",
            });
        }
      });

      setIsAuthenticated(true);
      if (details.forLogin) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      handlecloseLoadingModal();
      if (err.code === "auth/invalid-credential") {
        Swal.fire({
          title: "Invalid Credential",
          text: "The password or email you entered is incorrect. Please try again.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "...Oops",
          text: "Something went wrong",
          icon: "error",
        });
      }

      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          text: "Account is Already in use",
          icon: "error",
        });
        navigate("/login");
      }
      console.error(err.message);
    }
  };

  const verifyInput = (e) => {
    e.preventDefault();
    if (email && password) {
      details.forLogin
        ? handlesignInOrSignUp(signInWithEmailAndPassword)
        : handlesignInOrSignUp(createUserWithEmailAndPassword, false);
    } else {
      Swal.fire({
        title: "Error",
        text: `Input login details to ${
          details.forLogin ? "login" : "sign up"
        }`,
        icon: "error",
      });
    }
    console.log("clicked");
  };
  return (
    <div className="login__container">
      <div className="display__page">
        <img src={details.img} alt="" />
      </div>
      <div className="login_page">
        <Logo />
        <LogoinHeaderText text={details.headerTexts} />
        <LogoinForm
          formDetails={details}
          formValues={{ email, password }}
          formFunctions={{ setEmail, setPassword, verifyInput }}
        />
        <LoginToSignUp text={details} />
      </div>
    </div>
  );
}
