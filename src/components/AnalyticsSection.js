import { useChangeNum } from "./useChangeNum";

export function AnalyticsSection() {
  const { dashboardItems, verifiedStatus } = useChangeNum();
  return (
    <div className="main-dash">
      {dashboardItems.map((item) => (
        <div key={item.title} className="dashboard">
          <ul>
            <li className={item.classes[0]}>{item.svg}</li>
            <li className={item.classes[1]}>{item.title}</li>

            <li className={item.classes[2]}>
              <span>{item.num === true ? verifiedStatus : item.num}</span>{" "}
              {item.title.toLocaleLowerCase()}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
