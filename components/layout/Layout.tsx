import { useEffect, useState } from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import Footer from "./Footer";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import dynamic from "next/dynamic";
import { useCursorStore } from "../../store/cursorStore";
// Dynamic imports
const Monitor = dynamic(() => import("./monitor/Monitor"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // Constants
  const { asPath } = useRouter();

  // Component states
  const [isMonitorOpen, setIsMonitorOpen] = useState<boolean>(false);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

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
      {isMonitorOpen && <Monitor setIsOpen={setIsMonitorOpen} />}
      <Nav />
      <main
        onMouseEnter={onEnterAPP}
        onMouseLeave={onLeaveAPP}
        className="main"
        style={{
          backgroundColor:
            asPath === "/"
              ? "#f5ebe0"
              : asPath === "/info"
              ? "#d6ccc2"
              : asPath === "/blog"
              ? "#d5bdaf"
              : asPath.startsWith("/projects/")
              ? "#f5ebe0"
              : "#f5ebe0"
        }}
      >
        {children}
      </main>
      <Footer />
      <button
        onMouseEnter={onEnterServerButton}
        onMouseLeave={onLeaveServerButton}
        aria-label="Abrir monitor"
        style={{
          backgroundColor: "transparent",
          border: "none",
          position: "fixed",
          bottom: 0,
          right: 0,
          padding: "2rem 1rem 1rem 2rem"
        }}
        onClick={() => setIsMonitorOpen(!isMonitorOpen)}
      >
        <TbDeviceHeartMonitor size={15} color="#3e3e3e" />
      </button>
    </>
  );
};

export default Layout;
