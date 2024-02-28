import React from "react";
import ThemeLink from "@/components/shared/ThemeLink";

const GenerateTest = () => {
    return (
            <div className="flex flex-col items-center text-text my-80">
                <h1>Generate Test</h1>
                <ThemeLink linkUrl="/group" text="Handle Groups"/>
                <ThemeLink linkUrl="/test/custom/create" text="Create Test"/>
                <ThemeLink linkUrl="/test/custom/upload" text="Upload Test"/>
                
            </div>
    );
}

export default GenerateTest;
