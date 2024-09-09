import OnboardingStyles from "../onboarding.module.css";
import noProfile from "../img/noprofile.png";
import addButton from "../img/addCircle.svg";
import { db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase/firebaseConfig";
import loadingAnim from "../img/loading.svg";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function Onboarding() {
  return <SignUpForm />;
}

function SignUpForm() {
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isIndegene, setIsIndegene] = useState("");
  const [address, setAddress] = useState("");
  const [rank, setRank] = useState("officer");
  const [level, setLevel] = useState("user");

  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(noProfile);

  function getCurrentDate() {
    const timeStamp = Date.now();
    const date = new Date(timeStamp);
    return date.toLocaleDateString("en-GB");
  }

  const UserData = {
    surname,
    otherNames,
    phoneNumber,
    isIndegene,
    address,
    rank,
    level,
    shifts: 0,
    scans: 0,
    isVerified: false,
  };

  const membersColRef = collection(db, "members");
  const navigate = useNavigate();

  async function onSubmitForm(event) {
    event.preventDefault();
    handleshowLoadingModal("Loading...");
    try {
      await addDoc(membersColRef, {
        ...UserData,
        user: JSON.parse(localStorage.getItem("user")),
        userID: auth?.currentUser?.uid,
        getCurrentDate: getCurrentDate(),
        profileImg: profile,
      });
      handlecloseLoadingModal();
      Swal.fire({
        title: "Login Successful",
        icon: "success",
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "An error has occured, please try again later",
        icon: "error",
        timer: 4000,
      });
      console.log(err);
    }
  }

  return (
    <form className={OnboardingStyles.signup__form__container}>
      <h1 className={OnboardingStyles.signup__header}>Let us Know You!</h1>
      <ImageContainer
        file={file}
        profile={profile}
        setFile={setFile}
        setProfile={setProfile}
      />
      <div className={OnboardingStyles.input_box}>
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Other names"
          value={otherNames}
          onChange={(e) => setOtherNames(e.target.value)}
        />
      </div>
      <div className={OnboardingStyles.input_box}>
        <input
          type="text"
          placeholder="Mobile phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <select
          value={isIndegene}
          onChange={(e) => setIsIndegene(e.target.value)}
        >
          <option value={null}>An Indegene?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={OnboardingStyles.input_box}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={OnboardingStyles.input_box}>
        <select value={rank} onChange={(e) => setRank(e.target.value)}>
          <option value={null}>Select Rank</option>
          <option value={"Officer"}>Officer</option>
          <option value={"CSO"}>CSO</option>
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value={null}>Select Level</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className={OnboardingStyles.btn__container}>
        <button
          onClick={(e) => onSubmitForm(e)}
          className={OnboardingStyles.btn}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function ImageContainer({ file, setFile, profile, setProfile }) {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handelFileUpload();
  };

  const handelFileUpload = async () => {
    if (!file) return;
    setProfile(loadingAnim);
    try {
      const storageRef = ref(storage, `files${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfile(downloadURL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={OnboardingStyles.img__container}>
      <img
        className={OnboardingStyles.profile__img}
        src={profile}
        alt="profile"
      />
      <img src={addButton} alt="addbtn" />
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        name="profilePhoto"
        onChange={handleFileChange}
      />
    </div>
  );
}
