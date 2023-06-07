import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import image1 from "../../../assets/banner/image1.jpg";
import image2 from "../../../assets/banner/image2.jpg";
import image3 from "../../../assets/banner/image3.jpg";
import image4 from "../../../assets/banner/image4.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel className="">
        <div>
          <img src={image1} />
        </div>
        <div>
          <img src={image2} />
        </div>
        <div>
          <img src={image3} />
        </div>
        <div>
          <img src={image4} />
        </div>
      </Carousel>
      <div className="mx-auto text-center my-6">
        <h3 className="text-amber-600 text-3xl font-bold">
          --------Popular Classes--------
        </h3>
      </div>
    </div>
  );
};

export default Banner;
