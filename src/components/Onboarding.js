import OnboardingStyles from "../onboarding.module.css";
import noProfile from "../img/noprofile.png";
import addButton from "../img/addCircle.svg";
import { db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import loadingAnim from "../img/loading.svg";
import { useState } from "react";

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

  const UserData = {
    surname,
    otherNames,
    phoneNumber,
    isIndegene,
    address,
    rank,
    level,
  };

  return (
    <form className={OnboardingStyles.signup__form__container}>
      <h1 className={OnboardingStyles.signup__header}>Let us Know You!</h1>
      <ImageContainer />
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
        <button className={OnboardingStyles.btn}>Continue</button>
      </div>
    </form>
  );
}

function ImageContainer() {
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(noProfile);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handelFileUpload();
  };

  const handelFileUpload = async () => {
    setProfile(loadingAnim);

    try {
      if (!file) return;
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
