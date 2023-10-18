import ReactECharts from "echarts-for-react";

const CPUChart: React.FC<{ data: any; labels: any }> = ({ data, labels }) => {
  const options = {
    title: {
      text: "CPU Usage",
      textStyle: {
        color: "#94a3b8",
        fontSize: 18,
        fontWeight: 700
      }
    },
    grid: {
      left: "1%",
      right: "1%",
      bottom: "15%",
      top: "15%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: ["CPU Usage"],
      show: false,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        color: "#94a3b8"
      }
    },
    series: data,
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      show: true,
      data: labels,
      bottom: 0,
      left: 0,
      padding: 20,
      textStyle: {
        fontSize: 12,
        fontWeight: 500,
        color: "#94a3b8"
      },
      itemWidth: 25,
      itemHeight: 10,
      itemGap: 20,
      icon: "roundRect",
      itemStyle: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowBlur: 6
      }
    },
    dataZoom: false
  };
  return (
    <ReactECharts
      option={options}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
        maxHeight: "500px",
        margin: "0 auto",
        minWidth: "300px",
        maxWidth: "900px",
        padding: "0 20px"
      }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default CPUChart;
