import ThemeLink from "@/components/shared/ThemeLink";

const TestPage = () => {
    return (
        <div className="w-screen mt-40 flex flex-col items-center justify-center">
            <ThemeLink linkUrl="/test/custom" target="_self"><span className="text-2xl">Create Test</span></ThemeLink>
            <ThemeLink linkUrl="/test/given" target="_self"><span className="text-2xl">Given Tests</span></ThemeLink>
            <ThemeLink linkUrl="/test/my" target="_self"><span className="text-2xl">My and Shared Tests</span></ThemeLink>
        </div>
    );
}

export default TestPage
