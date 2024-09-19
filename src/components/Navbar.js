import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import avatarImg from "../img/temp.jpg";
import exitIcon from "../img/exit.svg";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";
import { Logo } from "./Login";
import { useFetchUser } from "./useFetchUser";

export function Navbar({
  authStatus: { setIsAuthenticated },
  onHandleSetNavOpen,
  navOpen,
}) {
  async function handleLogOut() {
    handleshowLoadingModal("Logging out...");
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setTimeout(() => {
        handlecloseLoadingModal();
        setIsAuthenticated(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }
  const { currentUser } = useFetchUser();

  return (
    <nav className="navbar">
      <div className="logo">
        <div
          className={`hambuger ${navOpen && "close"}`}
          onClick={onHandleSetNavOpen}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        {window.screen.availWidth >= 480 ? (
          <>
            <Logo />
            <span>Vigilantee</span>
          </>
        ) : null}
      </div>

      <div className="nav__options">
        <img src={currentUser?.profileImg} alt="avatar" className="avatar" />
        <img
          className="exitIcon"
          src={exitIcon}
          alt="exit"
          onClick={handleLogOut}
        />
      </div>
    </nav>
  );
}
