"use client";

import ThemeButton from "../shared/ThemeButton";

const How = ({ how }: any) => {
    return (
        <>
            <div className="basis-1/3 flex">
                <img src={how.imageUrl} className="w-[300px]" alt="howimage"></img>
            </div>
            <div>
                <p className="text-3xl font-bold my-2">{how.user}</p>
            </div>
            <div
                className="basis-2/3 flex flex-col gap-5"
            >
                <div className="my-2 flex flex-col gap-2 mobile:text-lg font-medium">
                    {how.text.map((t: string, index: number) => (
                        <p key={index} className="text-xl font-bold ">
                            {t}
                        </p>
                    ))}
                </div>
            </div>
            <br className="mt-5"/>
            <ThemeButton text={"Know More"} />
        </>
    );
};

export default How;
