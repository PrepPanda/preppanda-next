"use client";

const HeroSection = () => {
  return (
    <>
      <div className="flex items-center justify-center w-screen px-24 my-10">
        <div className="basis-1/2 flex items-center justify-center">
          <img src="/images/hero.svg" width={600} height={75}></img>
        </div>
        <div className="basis-1/2 flex flex-col pr-36 gap-5">
          <div>
            <p className="text-3xl font-bold">PrepPanda - Make it easier</p>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              expedita esse atque eaque aliquid vitae iste, eveniet sequi
              reiciendis temporibus. Corrupti facere voluptas laborum
              perspiciatis a optio iste voluptatem provident.
            </p>
          </div>
          <div>
            <button className="bg-sky-500 px-5 py-2 text-white font-semibold rounded-full">
              Begin your journey →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
