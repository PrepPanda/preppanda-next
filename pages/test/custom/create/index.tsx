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
        <div className="mt-20 text-xl bg-base gap-5 flex flex-col w-screen z-10 items-center justify-center">
            <CustomQuestionForm/>
            <ThemeButton handleClick={verify} >
                <p>Verify</p>
            </ThemeButton>
        </div>
    );
};

export default CreateTest;
