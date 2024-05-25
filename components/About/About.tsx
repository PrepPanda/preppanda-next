import PandaLink from "@/components/panda/PandaLink";

const About = () => {
  return (
    <div className="mt-40">
      <div className="flex flex-col mb-40 w-screen bg-base items-center justify-center">
        <p className="text-xl mobile:text-5xl font-black">About</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center w-screen px-10 sm:px-80 text-text relative pb-20 sm:pb-32 bg-base">

        <div className="flex-col  basis-1/2 w-full z-10">
          <p className="text-3xl font-semibold ">TEAM</p>
          <div className="flex gap-4 flex-row mt-3">
            <PandaLink
              linkUrl={"https://github.com/patelhitarth08"}
            >
              <p>Hitarth</p>
            </PandaLink>
            <PandaLink
              linkUrl={"https://github.com/Kashyap3003"}
            >
              <p>Kashyap</p>
            </PandaLink>
            <PandaLink
              linkUrl={"https://github.com/rajatnai49"}
            >
              <p>Rajat</p>
            </PandaLink>
          </div>
        </div>

        <div className="flex-col basis-1/2 w-full z-10">
          <p className="text-3xl font-semibold ">Want to Contribute?</p>
          <div className="flex gap-4 mt-3">
            <PandaLink
              linkUrl={"https://github.com/orgs/PrepPanda/"}
            >
              <p>PrepPanda</p>
            </PandaLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


