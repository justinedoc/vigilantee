import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./idcard.css";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function IDCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, currentUser } = location.state;
  const cardRef = useRef();
  const profileImgRef = useRef(currentUser?.profileImg);

  const generatePDF = () => {
    const input = cardRef.current;
    // Define ID card dimensions (85.6mm x 54mm)
    const idCardWidth = 64;
    const idCardHeight = 103.37;

    try {
      html2canvas(input, { scale: 2, useCORS: true, allowTaint: true }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("potrait", "mm", [idCardWidth, idCardHeight]);

          // Add the image with proper scaling
          pdf.addImage(imgData, "PNG", 0, 0, idCardWidth, idCardHeight);

          // Save the PDF as vigilante_card.pdf
          pdf.save(`${currentUser?.otherNames}'s_ID.pdf`);
        }
      );
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="id-card-main">
      {/* The card structure */}
      <div className="card" ref={cardRef}>
        <div className="header">UMUOME VIGILANTE</div>
        <div className="avatar">
          <img src={profileImgRef.current} alt="profile" />
        </div>
        <div className="info__bg">
          <div className="info">
            <h2>{currentUser?.surname + " " + currentUser?.otherNames}</h2>
            <p>Position: {currentUser?.rank}</p>
          </div>
          <div className="qr-code">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}}`}
              alt="qr-code"
            />
          </div>
        </div>
      </div>
      <button className="id__card" onClick={generatePDF}>
        Download ID Card
      </button>
    </div>
  );
}
