"use client";

import CustomQuestionForm from "@/components/Assessment/CustomAssessmentForm";
import PandaButton from "@/components/panda/PandaButton";
import { useRouter } from "next/router";

const CreateAssessment = () => {
  const router = useRouter();

  const verify = () => {
    router.push("/assessment/custom/save");
  }

  return (
    <div className="mt-20 text-xl bg-base gap-5 flex flex-col w-screen z-10 items-center justify-center">
      <CustomQuestionForm />
      <PandaButton handleClick={verify} >
        <p>Verify</p>
      </PandaButton>
    </div>
  );
};

export default CreateAssessment;
