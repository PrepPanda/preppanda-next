import React from "react";
import ThemeLink from "@/components/shared/ThemeLink";

const GenerateTest = () => {
  return (
    <div className="flex flex-col items-center text-text text-4xl mt-40">
      <p className="text-7xl font-black mb-10">Generate Your Test</p>
      <ThemeLink linkUrl="/group" target="_self">
        <span className="text-3xl my-3">Handle Groups</span>
      </ThemeLink>
      <ThemeLink linkUrl="/test/custom/create" target="_self">
        <span className="text-3xl my-3">Create Test</span>
      </ThemeLink>
      <ThemeLink linkUrl="/test/custom/upload" target="_self">
        <span className="text-3xl my-3">Upload Test</span>
      </ThemeLink>
    </div>
  );
}

export default GenerateTest;
