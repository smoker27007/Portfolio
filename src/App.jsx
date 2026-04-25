import Hero from "./Pages/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import Projects from "./Pages/Projects/Projects";
import ContactSection from "./components/ContactSection/ContactSection";
import Workspace from "./components/Workspace/Workspace";

function App() {
  return (
    <Workspace>
      <Hero />
      <AboutSection />
      <Projects />
      <ContactSection />
    </Workspace>
  );
}

export default App;