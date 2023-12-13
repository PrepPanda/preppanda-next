import Navbar from "@/components/Navbar/Navbar";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
