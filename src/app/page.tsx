import BackgroundDn from "./Components/Background";
import Footer from "./Components/Footer";
import { HeroSec } from "./Components/Hero";


export default function Home() {
  return (
    <main className="min-h-screen">
      <BackgroundDn>
      <HeroSec />
    </BackgroundDn>
    <Footer/>
    </main>
  );
}
