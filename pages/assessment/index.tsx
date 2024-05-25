import PandaLink from "@/components/panda/PandaLink";

const AssessmentPage = () => {
  return (
    <div className="w-screen mt-40 flex flex-col items-center justify-center">
      <p className="text-7xl font-black mb-10">Mange Your Tests</p>
      <PandaLink linkUrl="/assessment/custom" target="_self"><span className="text-3xl my-3">Create assessment</span></PandaLink>
      <PandaLink linkUrl="/assessment/given" target="_self"><span className="text-3xl my-3">Given assessments</span></PandaLink>
      <PandaLink linkUrl="/assessment/my" target="_self"><span className="text-3xl my-3">My and Shared assessments</span></PandaLink>
    </div>
  );
}

export default AssessmentPage
