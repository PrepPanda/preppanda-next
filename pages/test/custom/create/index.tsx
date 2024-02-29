"use client";

import CustomQuestionForm from "@/components/Test/CustomTestForm";
import ThemeButton from "@/components/shared/ThemeButton";
import { useRouter } from "next/router";

const CreateTest = () => {
    const router = useRouter();

    const verify = () => {
        console.log("Hello")
        router.push("/test/custom/save");
    }

    return (
        <div className="py-80 bg-base flex flex-col w-screen z-10 items-center justify-center">
            <CustomQuestionForm/>
            <ThemeButton handleClick={verify} text="Save"/>
        </div>
    );
};

export default CreateTest;
