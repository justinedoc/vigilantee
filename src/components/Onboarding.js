import OnboardingStyles from "../onboarding.module.css";
import noProfile from "../img/noprofile.png";
import addButton from "../img/addCircle.svg";
import { db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase/firebaseConfig";
import loadingAnim from "../img/loading.svg";
import { useEffect, useState } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";
import loadingSVG from "../img/loading.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "./useFetchUser";

export function Onboarding() {
  return <SignUpForm />;
}

export function UpdateProfile() {
  return <SignUpForm forUpdate={true} />;
}

function SignUpForm({ forUpdate }) {
  const { loading, currentUser } = useFetchUser();

  const [surname, setSurname] = useState(currentUser?.surname || "");
  const [otherNames, setOtherNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isIndegene, setIsIndegene] = useState("");
  const [address, setAddress] = useState("");
  const [rank, setRank] = useState("officer");
  const [level, setLevel] = useState("user");
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(noProfile);
  const [updateForProfile, setUpdateForProfile] = useState(null);

  useEffect(() => {
    setUpdateForProfile(currentUser?.profileImg);
    if (forUpdate) {
      currentUser?.isVerified ? setLevel("admin") : setLevel("user");
    }
  }, [currentUser, forUpdate]);

  const navigate = useNavigate();

  function getCurrentDate() {
    const timeStamp = Date.now();
    const date = new Date(timeStamp);
    return date.toLocaleDateString("en-GB");
  }

  const UserData = {
    surname: surname || currentUser?.surname,
    otherNames: otherNames || currentUser?.otherNames,
    phoneNumber: phoneNumber || currentUser?.phoneNumber,
    isIndegene: isIndegene || currentUser?.isIndegene,
    address: address || currentUser?.address,
    rank: rank || currentUser?.rank,
    level,
    profileImg: forUpdate ? updateForProfile : profile,
  };

  const membersColRef = collection(db, "members");

  async function updateUser(id) {
    const userDoc = doc(db, "members", id);
    try {
      await updateDoc(userDoc, { ...UserData });
    } catch (err) {
      console.error(err);
    }
  }

  function runAction(event) {
    if (currentUser?.userID !== auth?.currentUser?.uid) {
      onSubmitForm(event);
    } else {
      updateUser(currentUser?.id);
      navigate("/dashboard");
    }
  }

  async function onSubmitForm(event) {
    event.preventDefault();
    handleshowLoadingModal("Loading...");
    try {
      await addDoc(membersColRef, {
        ...UserData,
        user: JSON.parse(localStorage.getItem("user")),
        userID: auth?.currentUser?.uid,
        getCurrentDate: getCurrentDate(),
        shifts: 0,
        scans: 0,
        isVerified: false,
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

  if (forUpdate && loading) {
    return (
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

  return (
    <form className={OnboardingStyles.signup__form__container}>
      <h1 className={OnboardingStyles.signup__header}>
        {forUpdate ? "Update Profile" : "Let us Know You!"}
      </h1>
      <ImageContainer
        file={file}
        profile={profile}
        setFile={setFile}
        setProfile={setProfile}
        forUpdate={forUpdate}
        user={currentUser}
        profileUpdateSups={{ updateForProfile, setUpdateForProfile }}
      />
      <div className={OnboardingStyles.input_box}>
        <input
          type="text"
          placeholder="Surname"
          value={surname || currentUser?.surname}
          onChange={(e) => setSurname(e.target.value)}
          onClick={(e) => (e.target.value = "")}
        />
        <input
          type="text"
          placeholder="Other names"
          value={otherNames || currentUser?.otherNames}
          onChange={(e) => setOtherNames(e.target.value)}
          onClick={(e) => (e.target.value = "")}
        />
      </div>
      <div className={OnboardingStyles.input_box}>
        <input
          type="text"
          placeholder="Mobile phone"
          value={phoneNumber || currentUser?.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onClick={(e) => (e.target.value = "")}
        />
        <select
          value={isIndegene || currentUser?.isIndegene}
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
          value={address || currentUser?.address}
          onChange={(e) => setAddress(e.target.value)}
          onClick={(e) => (e.target.value = "")}
        />
      </div>
      <div className={OnboardingStyles.input_box}>
        <select
          value={rank || currentUser?.rank}
          onChange={(e) => setRank(e.target.value)}
        >
          <option value={"Officer"}>Officer</option>
          <option value={"CSO"}>CSO</option>
        </select>
        <select
          disabled={currentUser?.level === "admin" ? false : true}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value={null}>Select Level</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className={OnboardingStyles.btn__container}>
        <button onClick={(e) => runAction(e)} className={OnboardingStyles.btn}>
          Continue
        </button>
      </div>
    </form>
  );
}

function ImageContainer({
  file,
  setFile,
  profile,
  setProfile,
  forUpdate,
  user,
  profileUpdateSups: { updateForProfile, setUpdateForProfile },
}) {
  const handleFileChange = (e) => {
    handelFileUpload(e.target.files[0]);
  };

  const handelFileUpload = async (file) => {
    setProfile(loadingAnim);
    setUpdateForProfile(loadingAnim);
    try {
      const storageRef = ref(storage, `files${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      setProfile(downloadURL);
      setUpdateForProfile(downloadURL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={OnboardingStyles.img__container}>
      <img
        className={OnboardingStyles.profile__img}
        src={forUpdate ? updateForProfile : profile}
        alt=" "
      />
      <img src={addButton} alt="addbtn" />
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        name="profilePhoto"
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
}
