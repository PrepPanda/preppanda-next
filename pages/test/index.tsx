import ThemeLink from "@/components/shared/ThemeLink";

const TestPage = () => {
  return (
    <div className="w-screen mt-40 flex flex-col items-center justify-center">
      <p className="text-7xl font-black mb-10">Mange Your Tests</p>
      <ThemeLink linkUrl="/test/custom" target="_self"><span className="text-3xl my-3">Create Test</span></ThemeLink>
      <ThemeLink linkUrl="/test/given" target="_self"><span className="text-3xl my-3">Given Tests</span></ThemeLink>
      <ThemeLink linkUrl="/test/my" target="_self"><span className="text-3xl my-3">My and Shared Tests</span></ThemeLink>
    </div>
  );
}

export default TestPage
