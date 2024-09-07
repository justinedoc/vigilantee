import { MembersTable } from "./MemberTable";

export function MembersSection() {
  return (
    <div className="member__table__section">
      <div className="member__table-filter">
        <span className="active">All</span>
        <span>Verified-only</span>
      </div>
      <div className="member__table-main">
        <div className="member__table-head">
          <h1>All Members</h1>
          <div className="btn_box">
            <button className="btn delete">DELTE</button>
            <button className="btn add">ADD NEW</button>
          </div>
        </div>
        <MembersTable />
      </div>
    </div>
  );
}
