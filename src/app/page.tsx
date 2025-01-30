import FeaturedCourses from "@/components/FeaturedCourses";
import Herosection from "@/components/Herosection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Aboutus from "@/components/Aboutus";
import Testimonials from "@/components/Testimonials";
import { Upcomingevent } from "@/components/Upcomingevents";
import { Instructors } from "@/components/Instructors";




export default function Home() {
  return (
   <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.2] text-center dark " >
     <h2>Helo World</h2>
     <Herosection/>
     <FeaturedCourses/>
     <WhyChooseUs/>
     {/* <Aboutus/> */}
     <Testimonials/>
     <Upcomingevent/>
     <Instructors/>
     

   </main>
  );
}
