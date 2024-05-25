import React from "react";
import PandaLink from "@/components/panda/PandaLink";

const GenerateAssessment = () => {
  return (
    <div className="flex flex-col items-center text-text text-4xl mt-40">
      <p className="text-7xl font-black mb-10">Generate Your Assessment</p>
      <PandaLink linkUrl="/group" target="_self">
        <span className="text-3xl my-3">Handle Groups</span>
      </PandaLink>
      <PandaLink linkUrl="/assessment/custom/create" target="_self">
        <span className="text-3xl my-3">Create Assessment</span>
      </PandaLink>
      <PandaLink linkUrl="/assessment/custom/upload" target="_self">
        <span className="text-3xl my-3">Upload Assessment</span>
      </PandaLink>
    </div>
  );
}

export default GenerateAssessment;
