import logo from "../img/vigilante.svg";
import googleLogo from "../img/googleIcon.svg";
import eyeIcon from "../img/eyeIcon.svg";
import eyeClosed from "../img/eyeClosed.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

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
  formDetails,
  formValues: { email, password },
  formFunctions: { setEmail, setPassword },
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
        {formDetails.forLogin ? (
          <div className="forgot_password">
            <span>forgot password?</span>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function LoginButtons({ buttonText, btn }) {
  return (
    <div className="btn__container">
      <button>{buttonText}</button>
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

export function LoginPage({ details }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showLoadingModal = () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const closeLoadingModal = () => {
    Swal.close();
  };

  const signIn = async () => {
    showLoadingModal();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      closeLoadingModal();
    } catch (err) {
      console.error(err);
    }
  };

  const verifyInput = () => {
    if (email && password) signIn();
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
          formFunctions={{ setEmail, setPassword }}
        />
        <LoginButtons buttonText={details.action} btnFunctions={{ verifyInput }} />
        <LoginToSignUp text={details} />
      </div>
    </div>
  );
}
