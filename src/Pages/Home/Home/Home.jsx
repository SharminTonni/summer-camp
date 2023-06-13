import Banner from "../Banner/Banner";
import BannerSwipper from "../Banner/BannerSwipper";
import Classes from "../Classes/Classes";
import Instructors from "../Instructor/Instructors";
import MotionCompo from "../MotionCompo/MotionCompo";

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <BannerSwipper></BannerSwipper>
      <Classes></Classes>
      <Instructors></Instructors>
      <MotionCompo></MotionCompo>
    </div>
  );
};

export default Home;
