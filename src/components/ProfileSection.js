import { ProfileForm } from "./ProfileForm";
import { useFetchUser } from "./useFetchUser";

export function ProfileSection({ navOpen }) {
  const { loading, currentUser } = useFetchUser();

  return (
    <div className={`profile__section ${navOpen && "open"}`}>
      <div className="img-container">
        <img src={currentUser?.profileImg} alt=" " />
      </div>
      <ProfileForm dependencies={{ loading, currentUser }} />
    </div>
  );
}
