"use client"
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const data = [
  { name: "For Rent", value: 18, color: "#477899" }, // 40% of 45
  { name: "For Sale", value: 10, color: "#C7D9E5" }, // 60% of 45
  { name: "For Shortlet", value: 17, color: "#C7D9E7" }
];

const PropertiesPieChart = () => {
  return (
    <div style={styles.container}>
      {/* Responsive Pie Chart */}
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%" // Responsive donut effect
              outerRadius="60%"
              dataKey="value"
              cornerRadius={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Labels Below Chart */}
      <div style={styles.labels}>
        {data.map((item, index) => (
          <div key={index} style={styles.labelItem}>
            <div style={{ ...styles.colorBox, backgroundColor: item.color }} />
            <span style={styles.span}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles for responsiveness
const styles = {
  container: {
    position: "relative",
    width: "100%",
    // maxWidth: "200px",
    paddingBottom: "10px",
    // marginTop: "-40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chartWrapper: {
    width: "100%",
    minWidth: "200px",
    // maxWidth: "250px",
    height: "200px",
  },
  labels: {
    display: "flex",
    // position: "absolute",
    justifyContent: "center",
    flexDirection: "column",
    bottom: "4px",
    right: 0,
    flexWrap: "wrap",
  },
  span: {
    fontFamily: "Unitext Regular",
  },
  labelItem: {
    display: "flex",
    alignItems: "center",
    gap: '4px',
  },
  colorBox: {
    width: "14px",
    height: "14px",
    marginRight: "5px",
  },
};

export default PropertiesPieChart;
