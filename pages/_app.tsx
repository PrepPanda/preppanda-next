import About from "@/components/About/About";
import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider";
import Use from "@/components/Use/Use";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
      <main className="overflow-x-hidden">
         <Navbar />
        <HeroSection />
        <Use />
        <About />
        <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}
