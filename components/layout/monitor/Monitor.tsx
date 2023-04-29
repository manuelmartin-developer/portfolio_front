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

const Monitor: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  // Component states
  const [monitorRequestData, setMonitorRequestData] = useState<
    "CPU" | "RAM" | "DISK"
  >("CPU");
  const [cpuData, setCPUData] = useState<any[]>([]);
  const [ramData, setRAMData] = useState<any[]>([]);
  const [diskData, setDiskData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);

  // WebSocket
  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(
    process.env.NEXT_PUBLIC_MONITOR_WS_URL as string,
    {
      onOpen: () =>
        console.log("%cMonitor WebSocket Connected", "color: green"),
      shouldReconnect: (closeEvent) => true
    }
  );

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
            data: [values[index]]
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
            data: [values[index]]
          };
        });
        setRAMData(ramData);
      } else if (lastMessage.data.startsWith("DISK")) {
        // Pie chart
        const pieData = lastMessage.data.split("DISK:")[1];
        const parsedData = JSON.parse(pieData);
        const keys = Object.keys(parsedData);
        const values = Object.values(parsedData);
        const data = keys.map((key, index) => {
          return {
            name: key,
            value: values[index]
          };
        });
        setDiskData(data);
      }
    }
  }, [lastMessage]);

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container_header}>
        <div className={styles.container_header__title}>
          <h3>Monitor</h3>
          <div className={styles.container_header__title__status}>
            <FiCpu
              size="1.5rem"
              className={monitorRequestData === "CPU" ? styles.active : ""}
              onClick={() => setMonitorRequestData("CPU")}
            />
            <BsMemory
              size="1.5rem"
              className={monitorRequestData === "RAM" ? styles.active : ""}
              onClick={() => setMonitorRequestData("RAM")}
            />
            <FiHardDrive
              size="1.5rem"
              className={monitorRequestData === "DISK" ? styles.active : ""}
              onClick={() => setMonitorRequestData("DISK")}
            />
          </div>
        </div>
        <div
          className={styles.container_header__close}
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose size="2rem" />
        </div>
      </div>
      <div className={styles.container_content}>
        {monitorRequestData === "CPU" && (
          <CPUChart data={cpuData} labels={labels} />
        )}
        {monitorRequestData === "RAM" && (
          <RAMChart data={ramData} labels={labels} />
        )}
        {monitorRequestData === "DISK" && (
          <DISKChart data={diskData} labels={labels} />
        )}
      </div>
    </div>
  );
};

export default Monitor;
