import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutPreview } from "./components/AboutPreview";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Process } from "./components/Process";
import { WhyUs } from "./components/WhyUs";
import { Reviews } from "./components/Reviews";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { BookingDialog } from "./components/BookingDialog";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header onBook={openBooking} />

      <main>
        <Hero onBook={openBooking} />
        <AboutPreview />
        <Services onBook={openBooking} />
        <Projects onBook={openBooking} />
        <Process />
        <WhyUs onBook={openBooking} />
        <Reviews />
        <ContactSection onBook={openBooking} />
      </main>

      {/* Extra bottom padding on mobile so the fixed contact bar never covers content */}
      <div className="pb-[76px] md:pb-0">
        <Footer />
      </div>

      <FloatingActions onBook={openBooking} />
      <BookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
