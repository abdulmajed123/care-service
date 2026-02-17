import About from "@/Component/Home/About";
import Banner from "@/Component/Home/Banner";
import HowItWorks from "@/Component/Home/HowItWorks";
import OurService from "@/Component/Home/OurService";
import Testimonials from "@/Component/Home/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <OurService></OurService>
      <About></About>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
}
