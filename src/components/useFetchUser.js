import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function useFetchUser() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userColRef = collection(db, "members");

    const getUser = async () => {
      setLoading(true);
      try {
        const data = await getDocs(userColRef);
        const filteredDataForUsers = data.docs.map((user) => ({
          ...user.data(),
          id: user.id,
        }));

        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser || !loggedInUser.userID) {
          console.log("User not found in localStorage or userID is missing");
          setLoading(false);
          return;
        }

        const currentUserData = filteredDataForUsers.find(
          (user) => user.userID === loggedInUser.userID
        );

        if (!currentUserData) {
          console.log("No matching user found in Firebase");
        }

        setCurrentUser(currentUserData || {});
        setLoading(false);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "..Oops",
          text: "An error occurred",
        });
      }
    };
    getUser();
  }, []);
  return { loading, currentUser };
}
