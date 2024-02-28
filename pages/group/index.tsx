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

    useEffect(() => {
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
            <div className="py-80 flex flex-col justify-center items-center z-[100] bg-base">
                <JoinGroup />
                <CreateGroup onGroupCreated={handleGroupCreated}/>
                <h1>Group Section</h1>
                <div className="z-[100]">
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
