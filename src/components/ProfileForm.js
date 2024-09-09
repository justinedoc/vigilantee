import circleLoading from "../img/circleLoading.svg";

export function ProfileForm({ dependencies: { loading, currentUser } }) {
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
        />
        <label htmlFor="address">Permanent Address</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.address}
          name="address"
        />
        <label htmlFor="indegene">Indegene</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.isIndegene ? "Yes" : "No"}
          name="indegene"
        />
        <label htmlFor="date">Date Started</label>
        <input
          readOnly={true}
          type="text"
          value={currentUser?.getCurrentDate}
          name="date"
        />
      </form>
      <div className="btn-container">
        <button>Print ID</button>
        <button>Update Profile</button>
      </div>
    </>
  );
}
