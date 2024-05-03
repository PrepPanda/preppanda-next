"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import JoinGroup from "@/components/Group/JoinGroup";
import CreateGroup from "@/components/Group/CreateGroup";
import Group from "@/components/Group/Group";

const GroupSection = () => {
  const { data: session } = useSession();
  const [update, setUpdate] = useState(true)
  const [ownedGroups, setOwnedGroups] = useState<{ _id: string, name: string, code: string }[]>([]);
  const [inMemberGroups, setInMemberGroups] = useState<{ _id: string, name: string, code: string }[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = session?.user.id;
        const response = await axios.get(`/api/group/user/${userId}`);
        setOwnedGroups(response.data.ownedGroups);
        setInMemberGroups(response.data.inMemberGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    if (session) {
      fetchGroups();
    }
  }, [session, update]);

  const handleGroupCreated = (newGroup: any) => {
    setOwnedGroups([...ownedGroups, newGroup]);
  };

  return (
    <>
      <div className="mt-40 flex flex-col gap-5 text-2xl justify-center items-center z-[100] bg-base">
        <h1 className="text-7xl font-black mb-10">Manage Groups</h1>
        <div className="flex gap-10">
          <div className="mx-10 flex flex-col items-center">
            <JoinGroup setUpdate={setUpdate} />
            <h2 className="my-5 text-2xl underline">In Member Groups</h2>
            {
              inMemberGroups.map((group) => (
                <div key={group._id} className="flex items-center justify-center gap-4 z-[100]">
                  <Group group={group} owned={false} setUpdate={setUpdate} />
                </div>
              ))
            }
          </div>
          <div className="mx-10 flex flex-col items-center">
            <CreateGroup onGroupCreated={handleGroupCreated} setUpdate={setUpdate} />
            <h2 className="my-5 text-2xl underline">Owned Groups</h2>
            {
              ownedGroups.map((group) => (
                <div key={group._id} className="flex items-center justify-center gap-4 z-[100]">
                  <Group group={group} owned={true} setUpdate={setUpdate} />
                </div>
              ))
            }
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};

export default GroupSection;
