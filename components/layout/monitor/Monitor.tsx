import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import styles from "./Monitor.module.scss";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FiCpu } from "@react-icons/all-files/fi/FiCpu";
import { BsMemory } from "react-icons/bs";
import { FiHardDrive } from "react-icons/fi";
import CPUChart from "../../charts/CPUChart";
import RAMChart from "../../charts/RAMChart";
import DISKChart from "../../charts/DISKChart";
import { useCursorStore } from "../../../store/cursorStore";
import { AnimatePresence, motion } from "framer-motion";

const Monitor: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  // Component states
  const [monitorRequestData, setMonitorRequestData] = useState<
    "CPU" | "RAM" | "DISK"
  >("CPU");
  const [cpuData, setCPUData] = useState<any[]>([]);
  const [ramData, setRAMData] = useState<any[]>([]);
  const [diskData, setDiskData] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // WebSocket
  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(
    process.env.NEXT_PUBLIC_MONITOR_WS_URL as string,
    {
      onOpen: () =>
        console.log("%cMonitor WebSocket Connected", "color: green"),
      shouldReconnect: (closeEvent) => true
    }
  );

  // Methods
  const onEnterLink = (text: string) => {
    setCursorText(text);
    setCursorVariant("link_small");
  };

  const onLeaveLink = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  // LifeCycle component
  useEffect(() => {
    sendMessage(monitorRequestData);
  }, [monitorRequestData]);

  useEffect(() => {
    return () => {
      setCPUData([]);
      setRAMData([]);
      setDiskData([]);
      sendMessage("STOP");
      getWebSocket()?.close();
    };
  }, []);

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.data.startsWith("CPU")) {
        const data = lastMessage.data.split("CPU:")[1];
        const parsedData = JSON.parse(data);

        const keys = Object.keys(parsedData);
        setLabels(keys);
        const values = Object.values(parsedData);
        const cpuData = keys.map((key, index) => {
          return {
            name: key,
            type: "bar",
            data: [Number(values[index]).toFixed(2)],
            color:
              key === "avgLoad"
                ? "#809bce"
                : key === "currentLoad"
                ? "#ff686b"
                : "#84dcc6"
          };
        });
        setCPUData(cpuData);
      } else if (lastMessage.data.startsWith("RAM")) {
        const data = lastMessage.data.split("RAM:")[1];
        const parsedData = JSON.parse(data);

        const keys = Object.keys(parsedData);
        setLabels(keys);
        const values = Object.values(parsedData);
        const ramData = keys.map((key, index) => {
          return {
            name: key,
            type: "bar",
            data: [Number(values[index]).toFixed(2)],
            color:
              key === "total"
                ? "#809bce"
                : key === "active"
                ? "#ff686b"
                : "#84dcc6"
          };
        });
        setRAMData(ramData);
      } else if (lastMessage.data.startsWith("DISK")) {
        const pieData = lastMessage.data.split("DISK:")[1];
        const parsedData = JSON.parse(pieData);
        const keys = Object.keys(parsedData);
        const values = Object.values(parsedData);
        const data = keys.map((key, index) => {
          return {
            name: key,
            value: values[index],
            itemStyle: {
              color: key === "size" ? "#ffd97d" : "#84dcc6"
            }
          };
        });

        setDiskData(data);
      }
    }
  }, [lastMessage]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.container_header}>
        <div className={styles.container_header__title}>
          <h3>Monitor__</h3>
          <div className={styles.container_header__title__status}>
            <FiCpu
              size="1.7rem"
              className={monitorRequestData === "CPU" ? styles.active : ""}
              onClick={() => setMonitorRequestData("CPU")}
              onMouseEnter={() => onEnterLink("CPU")}
              onMouseLeave={onLeaveLink}
            />
            <BsMemory
              size="1.7rem"
              className={monitorRequestData === "RAM" ? styles.active : ""}
              onClick={() => setMonitorRequestData("RAM")}
              onMouseEnter={() => onEnterLink("RAM")}
              onMouseLeave={onLeaveLink}
            />
            <FiHardDrive
              size="1.7rem"
              className={monitorRequestData === "DISK" ? styles.active : ""}
              onClick={() => setMonitorRequestData("DISK")}
              onMouseEnter={() => onEnterLink("DISK")}
              onMouseLeave={onLeaveLink}
            />
          </div>
        </div>
        <div
          className={styles.container_header__close}
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose
            size="2rem"
            onMouseEnter={() => onEnterLink("")}
            onMouseLeave={onLeaveLink}
          />
        </div>
      </div>
      <div className={styles.container_content}>
        <AnimatePresence mode="wait" initial={false}>
          {monitorRequestData === "CPU" && (
            <motion.div
              key="CPU"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center"
              }}
            >
              <CPUChart data={cpuData} labels={labels} />
            </motion.div>
          )}
          {monitorRequestData === "RAM" && (
            <motion.div
              key="RAM"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center"
              }}
            >
              <RAMChart data={ramData} labels={labels} />
            </motion.div>
          )}
          {monitorRequestData === "DISK" && (
            <motion.div
              key="DISK"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center"
              }}
            >
              <DISKChart data={diskData} labels={labels} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Monitor;
