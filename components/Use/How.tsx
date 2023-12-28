"use client";

const How = ({ how, extra }: any) => {
  return (
    <>
      <div className="basis-1/3 flex items-center justify-center">
        <img src={how.imageUrl} width={600} height={75}></img>
      </div>
      <div
        className={`basis-2/3 flex flex-col pr-36 gap-5 justify-center ${extra}`}
      >
        <div>
          <p className="text-3xl font-bold">{how.user}</p>
        </div>
        <div>
          <p className={`${extra == "items-end" ? "text-right" : "text-left"}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            expedita esse atque eaque aliquid vitae iste, eveniet sequi
            reiciendis temporibus. Corrupti facere voluptas laborum perspiciatis
            a optio iste voluptatem provident.
          </p>
        </div>
        <div>
          <button className="bg-sky-500 px-5 py-2 text-white font-semibold rounded-full">
            Begin your journey →
          </button>
        </div>
      </div>
    </>
  );
};

export default How;
