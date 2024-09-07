import { Activities } from "./Activities";
import { AnalyticsSection } from "./AnalyticsSection";
import { ProfileSection } from "./ProfileSection";

export function Main() {
    return (
      <main className="container">
        <ProfileSection />
        <div className="analytics__section">
          <AnalyticsSection />
          <Activities />
        </div>
      </main>
    );
  }