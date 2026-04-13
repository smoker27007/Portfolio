import Navbar from "./components/Navbar/Navbar";
import Hero from "./Pages/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import Projects from "./Pages/Projects/Projects";
import ContactSection from "./components/ContactSection/ContactSection";

const PROJECTS = [
  {
    number: "01",
    total: "04",
    title: "TIDAL\nMUSIC",
    category: "Marketing UX & Design System",
    role: "Design Direction",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    accentColor: "#7B61FF",
  },
  {
    number: "02",
    total: "04",
    title: "FIRST\nMET",
    category: "UX Redesign & Optimization",
    role: "Lead UI/UX",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    accentColor: "#FF6B4A",
  },
  {
    number: "03",
    total: "04",
    title: "FIN\nSYNC",
    category: "Fintech Dashboard & Analytics",
    role: "Full-Stack Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    accentColor: "#00D4AA",
  },
  {
    number: "04",
    total: "04",
    title: "LUXE\nCOMMERCE",
    category: "E-Commerce Platform Redesign",
    role: "Creative Direction",
    image: "https://images.unsplash.com/photo-1517694712202-14dd93e9e02a?auto=format&fit=crop&w=800&q=80",
    accentColor: "#FFB84D",
  },
];

function App() {
  return (
    <>
      <main>

      <Navbar />

      <Hero />

      <AboutSection />

      <Projects />

      <ContactSection />
    </main>
    </>
  );
}

export default App;