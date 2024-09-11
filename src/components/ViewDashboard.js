import dasboardStyles from "../dashboardView.module.css";
import { useParams } from "react-router-dom";
import loadingSVG from "../img/circleLoading.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

export function ViewDashboard() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const userColRef = collection(db, "members");
    async function getUser() {
      setLoading(true);
      try {
        const data = await getDocs(userColRef);
        const users = data.docs.map((user) => ({
          ...user.data(),
          id: user.id,
        }));
        setLoading(false);
        setUser(users.find((user) => user.id === id));
      } catch (err) {
        console.error(err);
      }
    }
    getUser();

  }, [id]);
  return !loading ? (
    <div className={dasboardStyles.dashboard__view}>
      <div className={dasboardStyles.dashboard__profile_info}>
        <div className={dasboardStyles.profile__img_box}>
          <img src={user?.profileImg} alt="user" />
        </div>
        <div className={dasboardStyles.profile__info}>
          <h2
            className={dasboardStyles.name}
          >{`${user?.surname} ${user?.otherNames}`}</h2>
          <label htmlFor="rank">Rank</label>
          <h4 name="rank">{user?.rank}</h4>
          <label htmlFor="date">Date Started</label>
          <h4 name="date">{user?.getCurrentDate}</h4>
          <label htmlFor="address">Address</label>
          <h4 name="address">{user?.address}</h4>
        </div>
      </div>

      <div className={dasboardStyles.headtags__section}>
        <div className={dasboardStyles.head}>
          <li>ABOUT</li>
          <li className={dasboardStyles.active}>WORK</li>
          <li>ACTIVITY</li>
        </div>
      </div>

      <Works userData={user} />
    </div>
  ) : (
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
  );
}

function Works({ userData }) {
  return (
    <div className={dasboardStyles.work__section}>
      <div className={dasboardStyles.work}>
        <div className={dasboardStyles.work__text}>
          {userData?.isVerified ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "#910210" }}
            >
              <path d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.293-4.707L18 10.586l-2.293-2.293-1.414 1.414 2.292 2.292-2.293 2.293 1.414 1.414 2.293-2.293 2.294 2.294 1.414-1.414L19.414 12l2.293-2.293z"></path>
            </svg>
          )}
          <span>{userData?.isVerified ? "Verified" : "Unverified"}</span>
        </div>

        <div className={dasboardStyles.svg__box}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="35"
            viewBox="0 0 24 24"
          >
            <path d="M17.988 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h11.988zM9 5h6v2H9V5zm5.25 6.25A2.26 2.26 0 0 1 12 13.501c-1.235 0-2.25-1.015-2.25-2.251S10.765 9 12 9a2.259 2.259 0 0 1 2.25 2.25zM7.5 18.188c0-1.664 2.028-3.375 4.5-3.375s4.5 1.711 4.5 3.375v.563h-9v-.563z"></path>
          </svg>
        </div>
      </div>
      <div className={dasboardStyles.work}>
        <div className={dasboardStyles.work__text}>
          <h1>{userData?.shifts}</h1>
          <span>Shifts</span>
        </div>

        <div className={dasboardStyles.svg__box}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            // style={{ fill: "" }}
          >
            <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v3h20V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-8v2z"></path>
          </svg>
        </div>
      </div>
      <div className={dasboardStyles.work}>
        <div className={dasboardStyles.work__text}>
          <h1>{userData?.scans}</h1>
          <span>Scans</span>
        </div>
        <div className={dasboardStyles.svg__box}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
          >
            <path d="M3 4v5h2V5h4V3H4a1 1 0 0 0-1 1zm18 5V4a1 1 0 0 0-1-1h-5v2h4v4h2zm-2 10h-4v2h5a1 1 0 0 0 1-1v-5h-2v4zM9 21v-2H5v-4H3v5a1 1 0 0 0 1 1h5zM2 11h20v2H2z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
