import React from "react";

const NoData = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ width: "50%", textAlign: "center" }}>
        There is no bookings in that period of time
      </p>
    </div>
  );
};

export default NoData;
