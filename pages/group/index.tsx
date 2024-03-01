"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import JoinGroup from "@/components/Group/JoinGroup";
import CreateGroup from "@/components/Group/CreateGroup";
import Group from "@/components/Group/Group";

const GroupSection = () => {
    const { data: session } = useSession();
    const [ownedGroups, setOwnedGroups] = useState<{ _id: string, name: string, code: string }[]>([]);
    const [inMemberGroups, setInMemberGroups] = useState<{ _id: string, name: string, code: string }[]>([]);
    const [newGroupName, setNewGroupName] = useState("");


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
    }, [session]);

    const updateGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroupName(event.target.value);
    };

    const handleGroupCreated = (newGroup: any) => {
        setOwnedGroups([...ownedGroups, newGroup]);
    };

    const handleGroupDeleted = (deletedGroupId: string) => {
        setOwnedGroups(ownedGroups.filter(group => group._id !== deletedGroupId));
    };

    return (
        <>
            <div className="mt-40 flex flex-col gap-5 text-2xl justify-center items-center z-[100] bg-base">
                <h1 className="text-5xl">Group Section</h1>
                <JoinGroup />
                <CreateGroup onGroupCreated={handleGroupCreated}/>
                <div>
                    <h2>Owned Groups</h2>
                    {
                        ownedGroups.map((group) => (
                            <div key={group._id} className="flex items-center justify-center gap-2 z-[100]">
                                <Group group={group} owned={true}/>
                            </div>
                        ))
                    }
                    <h2>In Member Groups</h2>
                    {
                        inMemberGroups.map((group) => (
                            <div key={group._id} className="flex items-center justify-center gap-2 z-[100]">
                                <Group group={group} owned={false} />
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    );
};

export default GroupSection;
