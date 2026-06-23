// app/page.tsx — Landing page UQ AI Solution
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Academy from "@/components/Academy";
import Lab from "@/components/Lab";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a1a]">
      <Navbar />
      <Hero />
      <Services />
      <Academy />
      <Lab />
      <ContactForm />
      <Footer />
    </main>
  );
}
