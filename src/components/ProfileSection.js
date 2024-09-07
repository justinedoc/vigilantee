import profileImage from "../img/temp.jpg";
import { ProfileForm } from "./ProfileForm";

export function ProfileSection() {
  return (
    <div className="profile__section">
      <div className="img-container">
        <img src={profileImage} alt="profile" />
      </div>
      <ProfileForm />
    </div>
  );
}
