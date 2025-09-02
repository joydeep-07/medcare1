import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import Banner from "../Components/Banner";
import About from "./About";
import Contact from "./Contact";
import Department from "../Components/Department";
import AppointmentForm from "../Components/AppoinmentForm";
import Testimonial from "./Testimonial";
import DoctorsForm from "../Components/DoctorsForm";
import SendNewsLetter from "../Components/SendNewsLetter";
import Ambulance from "../Components/Ambulance";
// import UsersLIst from "../Components/UsersLIst";

const Home = () => {
  const { isAdminAuthenticated } = useContext(AdminContext);

  return (
    <>
      <Banner />
      {/* <Ambulance/> */}
      {!isAdminAuthenticated && <AppointmentForm />}
      <About />

      {/* {isAdminAuthenticated && <DoctorsForm />} */}
      {/* {isAdminAuthenticated && <UsersLIst />} */}
      {isAdminAuthenticated && <SendNewsLetter />}
      {!isAdminAuthenticated && <Department />}
      {!isAdminAuthenticated && <Contact />}
      {!isAdminAuthenticated && <Testimonial />}
    </>
  );
};

export default Home;
