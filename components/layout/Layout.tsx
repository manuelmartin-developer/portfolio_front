import { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import dynamic from "next/dynamic";
import { useCursorStore } from "../../store/cursorStore";
import { useProjectsStore } from "../../store/projectsStore";
import TopOverlay from "./TopOverlay";
import { AnimatePresence } from "framer-motion";
import { useAdminStore } from "../../store/adminStore";
// Dynamic imports
const Monitor = dynamic(() => import("./monitor/Monitor"), { ssr: false });
const AdminPanel = dynamic(() => import("../admin/AdminPanel"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // Component states
  const [isMonitorOpen, setIsMonitorOpen] = useState<boolean>(false);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();
  const { projectSelected } = useProjectsStore();
  const { isAdminLoggedIn } = useAdminStore();

  // Methods
  const onEnterAPP = () => {
    setCursorVariant("default");
  };

  const onLeaveAPP = () => {
    setCursorVariant("hidden");
  };

  const onEnterServerButton = () => {
    setCursorVariant("server");
    setCursorText("Server stats");
  };

  const onLeaveServerButton = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  useEffect(() => {
    isMonitorOpen
      ? document.body.setAttribute("style", "overflow: hidden")
      : document.body.setAttribute("style", "overflow: auto");
  }, [isMonitorOpen]);

  return (
    <>
      {isAdminLoggedIn && <AdminPanel />}
      <AnimatePresence mode="wait" initial={false}>
        {isMonitorOpen && <Monitor setIsOpen={setIsMonitorOpen} />}
      </AnimatePresence>
      <TopOverlay />
      <Nav />
      <main
        onMouseEnter={onEnterAPP}
        onMouseLeave={onLeaveAPP}
        className="main"
        style={{
          backgroundColor: projectSelected?.backgroundColor || "#1e293b"
        }}
      >
        {children}
      </main>
      <Footer />
      <button
        onMouseEnter={onEnterServerButton}
        onMouseLeave={onLeaveServerButton}
        aria-label="Abrir monitor"
        className="server_button"
        onClick={() => setIsMonitorOpen(!isMonitorOpen)}
      >
        <TbDeviceHeartMonitor size={15} color="#94a3b8" />
      </button>
    </>
  );
};

export default Layout;
