export function ProfileForm() {
    return (
      <>
        <form className="profile-details">
          <input type="text" value={"Onyiriuka Justin Ifeanyi"} readOnly={true} />
          <input type="text" value={"Officer"} readOnly={true} />
          <span></span>
          <label htmlFor="number">Mobile Phone</label>
          <input
            readOnly={true}
            type="text"
            value={"+2347049460846"}
            name="number"
          />
          <label htmlFor="address">Permanent Address</label>
          <input
            readOnly={true}
            type="text"
            value={"Owerri Imo State"}
            name="address"
          />
          <label htmlFor="indegene">Indegen</label>
          <input readOnly={true} type="text" value={"Yes"} name="indegene" />
          <label htmlFor="date">Date Started</label>
          <input readOnly={true} type="text" value={"20/03/24"} name="date" />
        </form>
        <div className="btn-container">
          <button>Print ID</button>
          <button>Update Profile</button>
        </div>
      </>
    );
  }