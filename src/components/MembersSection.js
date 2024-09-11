import { useState } from "react";
import { MembersTable } from "./MemberTable";
import { useFetchUser } from "./useFetchUser";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";

export function MembersSection({ data }) {
  const { currentUser } = useFetchUser();
  const [section, setSection] = useState("all");

  if (currentUser?.level !== "admin") {
    return null;
  }

  function handleSetSection(val) {
    handleshowLoadingModal("Loading...");
    setTimeout(() => {
      setSection(val);
      handlecloseLoadingModal();
    }, 1000);
  }

  return (
    <div className="member__table__section">
      <div className="member__table-filter">
        <span
          className={section === "all" ? "active" : null}
          onClick={() => handleSetSection("all")}
        >
          All
        </span>
        <span
          className={section === "verified" ? "active" : null}
          onClick={() => handleSetSection("verified")}
        >
          Verified-only
        </span>
      </div>
      <div className="member__table-main">
        <div className="member__table-head">
          <h1>{section} Members</h1>
          {/* <div className="btn_box">
            <button className="btn delete">DELTE</button>
            <button className="btn add">ADD NEW</button>
          </div> */}
        </div>
        <MembersTable section={section} req={data} />
      </div>
    </div>
  );
}
