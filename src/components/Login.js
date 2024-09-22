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
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";

export function Logo() {
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
  formFunctions: { setEmail, setPassword, verifyInput, signInWithGoogle },
}) {
  const [passwordShowing, setPasswordShowing] = useState(false);

  // function validatePassword(password) {
  //   // Conditions
  //   const conditions = [
  //     {
  //       regex: /[a-z]/,
  //       message: "Password must contain at least one lowercase letter (a-z).",
  //     },
  //     {
  //       regex: /[A-Z]/,
  //       message: "Password must contain at least one uppercase letter (A-Z).",
  //     },
  //     {
  //       regex: /[0-9]/,
  //       message: "Password must contain at least one digit (0-9).",
  //     },
  //     {
  //       regex: /[!@#\$%\^&\*]/,
  //       message:
  //         "Password must contain at least one special character (!@#$%^&*).",
  //     },
  //     {
  //       regex: /.{8,}/,
  //       message: "Password must be at least 8 characters long.",
  //     },
  //   ];

  //   let errors = [];

  //   conditions.forEach((condition) => {
  //     if (!condition.regex.test(password)) {
  //       errors.push(condition.message);
  //     }
  //   });

  //   if (errors.length === 0) {
  //     return {
  //       isValid: true,
  //       message: "Password is strong!",
  //     };
  //   } else {
  //     return {
  //       isValid: false,
  //       errors: errors,
  //     };
  //   }
  // }

  return (
    <form className="login__form">
      <div className="input-box">
        <input
          value={email}
          type="email"
          name="email"
          id="email"
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
          id="password"
          minLength={6}
          placeholder="password"
          required
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
        btnFunctions={{ verifyInput, signInWithGoogle }}
      />
    </form>
  );
}

function LoginButtons({
  buttonText,
  btnFunctions: { verifyInput, signInWithGoogle },
}) {
  return (
    <div className="btn__container">
      <button onClick={verifyInput} type="submit">
        {buttonText}
      </button>
      <button onClick={signInWithGoogle}>
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

export function LoginPage({ details, authStatus: { setIsAuthenticated } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handlesignInOrSignUp = async (
    action,
    email,
    password,
    shouldWelcome = true
  ) => {
    handleshowLoadingModal("Signing in...");
    try {
      email && password
        ? await action(auth, email, password)
        : await action(auth, googleProvider);

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

  const signInWithGoogle = (e) => {
    e.preventDefault();
    details.forLogin
      ? handlesignInOrSignUp(signInWithPopup)
      : handlesignInOrSignUp(signInWithPopup, null, null, false);
  };

  const verifyInput = (e) => {
    e.preventDefault();
    if (email && password) {
      details.forLogin
        ? handlesignInOrSignUp(signInWithEmailAndPassword, email, password)
        : handlesignInOrSignUp(
            createUserWithEmailAndPassword,
            email,
            password,
            false
          );
    } else {
      Swal.fire({
        title: "Error",
        text: `Input login details to ${
          details.forLogin ? "login" : "sign up"
        }`,
        icon: "error",
      });
    }
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
          formFunctions={{
            setEmail,
            setPassword,
            verifyInput,
            signInWithGoogle,
          }}
        />
        <LoginToSignUp text={details} />
      </div>
    </div>
  );
}
