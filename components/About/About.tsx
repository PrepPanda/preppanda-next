"use client";

import Link from "next/link";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center h-40 w-screen px-80 bg-rose-500 text-white">
        <div className="flex-col basis-1/2 border-r-indigo-50 border-r">
          <p className="text-2xl font-semibold my-3">Team</p>
          <div className="flex gap-4">
            <p>
              <Link
                className="hover:underline"
                target="_blank"
                href="https://github.com/patelhitarth08"
              >
                Hitarth↗
              </Link>
            </p>
            <p>
              <Link
                target="_blank"
                className="hover:underline"
                href="https://github.com/Kashyap3003"
              >
                Kashyap↗
              </Link>
            </p>
            <p>
              <Link
                target="_blank"
                className="hover:underline"
                href="https://github.com/rajatnai49"
              >
                Rajat↗
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-col basis-1/2 ml-10">
          <p className="text-2xl font-semibold my-3">Want to Contribute?</p>
          <div className="flex gap-4">
            <p>
              <Link
                target="_blank"
                className="hover:underline"
                href="https://github.com/orgs/PrepPlus/"
              >
                PrepPlus↗
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
