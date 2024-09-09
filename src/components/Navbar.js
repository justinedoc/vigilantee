import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";

export function Navbar({ authStatus: { setIsAuthenticated } }) {

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
  return (
    <nav className="navbar">
      <button onClick={handleLogOut}>Logout</button>
    </nav>
  );
}
