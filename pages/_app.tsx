import About from "@/components/About/About";
import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <main className="overflow-x-hidden min-h-screen text-text font-body bg-base">
          <Navbar />
          <Component {...pageProps} />
          <About />
          <Toaster />
        </main>
      </Provider>
    </>
  );
}
