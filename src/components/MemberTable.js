import { useFetchUser } from "./useFetchUser";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import {
  handleshowLoadingModal,
  handlecloseLoadingModal,
} from "./HandleLoadingModal";

export function MembersTable({ section, req: { setModalOpen, setUserID } }) {
  const { allMembers } = useFetchUser();

  const filteredData = allMembers.filter(
    (member) => member.isVerified === true
  );

  function handleModalOpen(id) {
    setModalOpen(true);
    setUserID(id);
  }

  async function handleVerifyUser(id) {
    handleshowLoadingModal("Verifying...");
    try {
      const userDoc = doc(db, "members", id);
      await updateDoc(userDoc, { isVerified: true });
      setTimeout(() => {
        handlecloseLoadingModal();
        Swal.fire({
          title: "Verified",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }

  function beforeHandleVerifyUser(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00704b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Verify",
    }).then((result) => {
      if (result.isConfirmed) {
        handleVerifyUser(id);
      }
    });
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>STATUS</th>
          <th>NAME</th>
          <th>RANK</th>
          <th>DOMAIN</th>
          <th>AUTH</th>
          <th>DATE JOINED</th>
          <th>
            <span></span>
          </th>
        </tr>
        {(section === "all" ? allMembers : filteredData).map((member) => (
          <TableRowDetails
            key={member.id}
            data={member}
            onVerifyUser={beforeHandleVerifyUser}
            onModalOpen={handleModalOpen}
          />
        ))}
      </tbody>
    </table>
  );
}

function TableRowDetails({ data, onVerifyUser, onModalOpen }) {
  const isUserVerified = data.isVerified ? true : false;
  return (
    <tr>
      <td>
        <span className={`member__${isUserVerified ? "active" : "inactive"}`}>
          {isUserVerified ? "Verified" : "Unverified"}
        </span>
      </td>
      <td>{`${data.surname} ${data.otherNames}`}</td>
      <td>{data.rank.at(0).toLocaleUpperCase() + data.rank.slice(1)}</td>
      <td>N/A</td>
      <td>
        <button
          onClick={() => onVerifyUser(data.id)}
          disabled={isUserVerified}
          className="verify"
        >
          {isUserVerified ? "Verified" : "verify"}
        </button>
      </td>
      <td>{data.getCurrentDate}</td>
      <td>
        <button className="edit__btn" onClick={() => onModalOpen(data.id)}>
          Actions
        </button>
      </td>
    </tr>
  );
}
