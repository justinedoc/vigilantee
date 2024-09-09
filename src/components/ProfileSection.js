import { ProfileForm } from "./ProfileForm";
import { useFetchUser } from "./useFetchUser";

export function ProfileSection() {
  const { loading, currentUser } = useFetchUser();

  return (
    <div className="profile__section">
      <div className="img-container">
        <img src={currentUser?.profileImg} alt=" " />
      </div>
      <ProfileForm dependencies={{ loading, currentUser }} />
    </div>
  );
}
