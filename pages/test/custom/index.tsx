import React from "react";
import ThemeLink from "@/components/shared/ThemeLink";

const GenerateTest = () => {
    return (
        <div className="flex flex-col items-center text-text text-4xl mt-40">
            <h1>Generate Test</h1>
            <ThemeLink linkUrl="/group" target="_self">
                <p className="text-xl">Handle Groups</p>
            </ThemeLink>
            <ThemeLink linkUrl="/test/custom/create" target="_self">
                <p className="text-xl">Create Test</p>
            </ThemeLink>
            <ThemeLink linkUrl="/test/custom/upload" target="_self">
                <p className="text-xl">Upload Test</p>
            </ThemeLink>
        </div>
    );
}

export default GenerateTest;
