"use client";

import ThemeLink from "@/components/shared/ThemeLink";

const About = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center w-screen px-10 sm:px-80 text-black relative pb-20 sm:pb-32 ">
        <div className="flex-col  basis-1/2 w-full">
          <p className="text-2xl font-semibold my-5">TEAM</p>
          <div className="flex gap-4 flex-row">
            <ThemeLink
              text={"Hitarth"}
              linkUrl={"https://github.com/patelhitarth08s"}
            />
            <ThemeLink
              text={"Kashyap"}
              linkUrl={"https://github.com/Kashyap3003"}
            />
            <ThemeLink
              text={"Rajat"}
              linkUrl={"https://github.com/rajatnai49"}
            />
          </div>
        </div>

        <div className="flex-col basis-1/2 w-full">
          <p className="text-2xl font-semibold my-5">Want to Contribute?</p>
          <div className="flex gap-4">
            <ThemeLink
              text={"PrepPanda"}
              linkUrl={"https://github.com/orgs/PrepPanda/"}
            />
          </div>
        </div>
        <div className="spacer2 layer2"></div>
      </div>
    </>
  );
};

export default About;
