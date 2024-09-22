import circleLoading from "../img/circleLoading.svg";
import { useNavigate } from "react-router-dom";

export function ProfileForm({ dependencies: { loading, currentUser } }) {
  const navigate = useNavigate();
  return loading ? (
    <img
      src={circleLoading}
      alt="loading"
      style={{
        margin: "20px auto",
      }}
    />
  ) : (
    <>
      <form className="profile-details">
        <input
          type="text"
          value={`${currentUser?.surname} ${currentUser?.otherNames}`}
          readOnly={true}
        />
        <input type="text" value={currentUser?.rank} readOnly={true} />
        <span></span>
        <label htmlFor="number">Mobile Phone</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.phoneNumber}
          name="number"
          id="number"
        />
        <label htmlFor="address">Permanent Address</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.address}
          name="address"
          id="address"
        />
        <label htmlFor="indegene">Indegene</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.isIndegene ? "Yes" : "No"}
          name="indegene"
          id="indegene"
        />
        <label htmlFor="date">Date Started</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.getCurrentDate}
          name="date"
          id="date"
        />
      </form>
      <div className="btn-container">
        <button
          onClick={() =>
            navigate("/dashboard/id-card", {
              state: {
                url: `https://umuome-vigilantee.vercel.app/view/${currentUser?.id}`,
                currentUser,
              },
            })
          }
        >
          Print ID
        </button>
        <button onClick={() => navigate("/dashboard/edit")}>
          Update Profile
        </button>
      </div>
    </>
  );
}
