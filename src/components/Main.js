import { Activities } from "./Activities";
import { AnalyticsSection } from "./AnalyticsSection";
import { ProfileSection } from "./ProfileSection";
import { useFetchUser } from "./useFetchUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import {
  handlecloseLoadingModal,
  handleshowLoadingModal,
} from "./HandleLoadingModal";
import Swal from "sweetalert2";
import { useGenerateUserQrCode } from "./useGenerateUserQrCode";
import circleLoading from "../img/circleLoading.svg";

export function Main({ data: { modalOpen, userID, setModalOpen }, navOpen }) {
  const { allMembers, loading } = useFetchUser();
  const [addShift, setAddShift] = useState(0);

  

  const user = allMembers.find((member) => member.id === userID);
  useEffect(() => {
    function handleInitailShift() {
      if (modalOpen && user?.shifts === 0) {
        setAddShift(0);
      }
    }
    handleInitailShift();
    if (user?.shifts) setAddShift(Number(user?.shifts));
  }, [user?.shifts, modalOpen]);

  function handelCloseModal(e) {
    if (e.target.className === "background") {
      setModalOpen(false);
    }
  }

  function handleUpdateShift() {
    setAddShift((cur) => cur + 1);
  }

  const {
    code: qrCode,
    loadingQRCode,
    setLoadingQRCode,
  } = useGenerateUserQrCode(
    `https://umuome-vigilantee.vercel.app/view/${user?.id.trim()}`
  );

  modalOpen &&
    setTimeout(() => {
      setLoadingQRCode(false);
    }, 2000);

  async function handleSaveUpdateShifts(id) {
    const userDoc = doc(db, "members", id);
    handleshowLoadingModal("Saving...");
    try {
      await updateDoc(userDoc, { shifts: addShift });
      handlecloseLoadingModal();
      Swal.fire({
        title: "Saved",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setModalOpen(false);
      setAddShift(Number(user?.shifts));
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "...Oops",
        icon: "error",
        text: "An error occured, please try again later",
        showConfirmButton: false,
        timer: 2000,
      });
      setModalOpen(false);
    }
  }

  return (
    <main className="container">
      <ProfileSection navOpen={navOpen} />
      <div className="analytics__section">
        <AnalyticsSection />
        <Activities />
      </div>

      {modalOpen ? (
        <div className="background" onClick={handelCloseModal}>
          <div className="member__modal">
            {loading ? null : (
              <>
                <div className="header_text">
                  <h2>QR CODE</h2>
                </div>
                <div className="img_box">
                  <img src={loadingQRCode ? circleLoading : qrCode} alt="" />
                  <span>
                    QR code for {`${user?.surname} ${user?.otherNames}`}
                  </span>
                </div>
                <div className="actions">
                  <div className="shifts">
                    <h3>Worked Shifts:</h3>
                    <span>{addShift}</span>
                  </div>
                  <div className="btn__container">
                    <button onClick={() => handleUpdateShift(user.id)}>
                      Add
                    </button>
                    <button onClick={() => handleSaveUpdateShifts(user.id)}>
                      Confirm
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
