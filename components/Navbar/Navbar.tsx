// "use client";

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
      <div className="flex items-center justify-center h-28">
        <div className="sm:flex hidden ">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <img
                src={session?.user?.image || "no profile"}
                width={45}
                height={45}
                className="rounded-full  shadow-lg shadow-black  bg-black/50"
                alt="profile"
              />
              <button
                type="button"
                onClick={handleSignOut}
                className="black_btn"
              >
                Sign Out
              </button>
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
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
