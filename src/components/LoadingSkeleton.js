import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton() {
  <div>
    <Skeleton
      height={40}
      width={300}
      style={{ backgroundColor: "#0e0", color: "#0e0" }}
    />
    <Skeleton height={40} width={300} style={{ backgroundColor: "#0e0" }} />
    <Skeleton height={40} width={300} style={{ backgroundColor: "#0e0" }} />
  </div>;
}
