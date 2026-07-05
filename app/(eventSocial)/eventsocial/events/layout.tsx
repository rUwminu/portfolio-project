import AuthGate from "../../_components/AuthGate";
import BlobBackground from "../../_components/BlobBackground";
import Header from "../../_components/Header";

const EventsLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGate>
    <div className="relative min-h-svh">
      <BlobBackground />
      <div className="relative">
        <Header />
        {children}
      </div>
    </div>
  </AuthGate>
);

export default EventsLayout;
