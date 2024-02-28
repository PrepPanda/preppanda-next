// import { Inter } from "next/font/google";
import HeroSection from "@/components/HeroSection/HeroSection";
import Use from "@/components/Use/Use";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex flex-col items-center justify-between bg-base`}
        >
            <HeroSection />
            <Use />
        </main>
    );
}
