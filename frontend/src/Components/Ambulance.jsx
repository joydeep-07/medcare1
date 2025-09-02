import React from "react";
import Lottie from "lottie-react";
import Heartrate from "../assets/Heartbeat Lottie Animation.json";

const Ambulance = () => {
  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <Lottie animationData={Heartrate} loop autoplay />
    </div>
  );
};

export default Ambulance;
