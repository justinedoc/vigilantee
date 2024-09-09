import { useChangeNum } from "./useChangeNum";
import circleLoading from "../img/circleLoading.svg"

export function AnalyticsSection() {
  const { loading, dashboardItems, verifiedStatus, unVerifiedStatus } =
    useChangeNum();

  return (
    <div className="main-dash">
      {dashboardItems.map((item) => (
        <DashboardItems
          key={item.title}
          item={item}
          verifiedStatus={verifiedStatus}
          unVerifiedStatus={unVerifiedStatus}
          loading={loading}
        />
      ))}
    </div>
  );
}

function DashboardItems({ item, verifiedStatus, unVerifiedStatus, loading }) {
  return (
    <div
      className="dashboard"
      style={item.num === false ? { background: "#fa9999e2" } : null}
    >
      {loading ? (
        <img
          src={circleLoading}
          alt="loading"
          style={{
            margin: "20px auto",
          }}
        />
      ) : (
        <ul>
          <li className={item.classes[0]}>{item.svg}</li>
          <li className={item.classes[1]}>{item.title}</li>

          <li className={item.classes[2]}>
            <span>
              {typeof item.num === "boolean"
                ? item.num
                  ? verifiedStatus
                  : unVerifiedStatus
                : item.num}
            </span>{" "}
            {item.title.toLocaleLowerCase()}
          </li>
        </ul>
      )}
    </div>
  );
}
