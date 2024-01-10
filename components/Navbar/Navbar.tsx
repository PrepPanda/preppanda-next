"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <nav className="relative bg-rose-700 border-0 my-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/logo.svg" className="h-12 sm:h-16" alt="logo" />
            <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-white">
              PrepPanda
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
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
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
                    alt="profile"
                  />
                </div>
              ) : (
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        className="black_btn text-white font-semibold"
                      >
                        Sign in
                      </button>
                    ))}
                </>
              )}
            </button>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 hover:bg-gray-200 "
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 rounded md:p-0">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 rounded md:p-0">
                  Services
                </a>
              </li>
              <li>
                <a href="custom_test/" className="block py-2 px-3 rounded md:p-0">
                  Tests
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      <div className="spacer1 layer1 m-0 t-0"></div>
      </nav>
    </>
  );
};

export default Navbar;
