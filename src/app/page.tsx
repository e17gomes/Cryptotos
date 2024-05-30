import BackgroundDn from "./Components/Background";
import { HeroSec } from "./Components/Hero";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      {/* <HeroSec/> */}
      <BackgroundDn>
      <HeroSec />
    </BackgroundDn>

    </main>
  );
}
