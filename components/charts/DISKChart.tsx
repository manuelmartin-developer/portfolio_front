import ReactECharts from "echarts-for-react";

const DISKChart: React.FC<{ data: any; labels: any }> = ({ data, labels }) => {
  const options = {
    title: {
      text: "DISK Usage",
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
    series: [
      {
        name: "DISK Usage",
        type: "sunburst",
        radius: ["13%", "90%"],
        label: {
          show: true,
          position: "inner",
          formatter: (params: any) => {
            return params.data.value.toFixed(2) + "GB";
          },
          fontSize: 12,
          fontWeight: "500",
          color: "#3e3e3e"
        },
        data: data
      }
    ],
    tooltip: {
      show: false
    }
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

export default DISKChart;
