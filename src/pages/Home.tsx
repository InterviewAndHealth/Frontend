import HomeSectionOne from "@/components/custom/HomeSectionOne";
import HomeSectionThree from "@/components/custom/HomeSectionThree";
import HomeSectionTwo from "@/components/custom/HomeSectionTwo";
import Navbar from "@/components/custom/navbar";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      window.location.href = "/dashboard/overview";
    }
  }, []);
  return (
    <>
      <Navbar />
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
    </>
  );
};

export default Home;
