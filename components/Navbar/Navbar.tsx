"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import PandaLink from "../panda/PandaLink";

interface Provider {
  id: string;
  name: string;
}

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="relative bg-surface text-text border-0 my-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/logo.svg" className="hue-rotate-0 brightness-90 contrast-150 h-12 tablet:h-16" alt="logo" />
            <span className="self-center font-logo font-bold text-xl mobile:text-3xl whitespace-nowrap">
              PrepPanda
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div
              className="flex text-sm rounded-full md:me-0 focus:ring-4"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                  <img
                    src={session?.user?.image || "no profile"}
                    className="rounded-full w-10 h-10 mobile:w-12 mobile:h-12"
                    alt="profile"
                  />
                  <button
                    onClick={handleSignOut}
                    className="black_btn font-bold text-xl"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        className="black_btn font-bold text-xl"
                      >
                        Sign in
                      </button>
                    ))}
                </>
              )}
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <PandaLink linkUrl="/" target="_self">
                  <p>Home</p>
                </PandaLink>
              </li>
              <li>
                <PandaLink linkUrl="#" target="_self">
                  <p>Services</p>
                </PandaLink>
              </li>
              <li>
                <PandaLink linkUrl="/assessment" target="_self">
                  <p>Assessment</p>
                </PandaLink>
              </li>
              <li>
                <PandaLink linkUrl="/group" target="_self">
                  <p>Group</p>
                </PandaLink>
              </li>

              <li>
                <PandaLink linkUrl="/profile" target="_self">
                  <p>Profile</p>
                </PandaLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
