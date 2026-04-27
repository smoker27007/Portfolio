import Hero from "./Pages/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import Projects from "./Pages/Projects/Projects";
import Skills from "./Pages/Skills/Skills";
import ContactSection from "./components/ContactSection/ContactSection";
import Workspace from "./components/Workspace/Workspace";

function App() {
  return (
    <Workspace>
      <Hero />
      <AboutSection />
      <Skills />
      <Projects />
      <ContactSection />
    </Workspace>
  );
}

export default App;