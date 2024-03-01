import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CreateGroup = ({ onGroupCreated }: { onGroupCreated: (newGroup: any) => void }) => {
    const session = useSession().data;
    const [newGroupName, setNewGroupName] = useState("");
    
    const updateGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewGroupName(event.target.value);
    }

    const createGroup = async (event: any) => {
        event.preventDefault();
        try {
            if (!session) {
                return;
            }
            const res = await axios.post("/api/group/", {
                name: newGroupName,
                owner: session?.user.id,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            console.log(res);
        }
        catch(error) {
            console.log(error);
        }
        console.log("Group with name:", newGroupName);
    }
    
    return (
        <div className="flex gap-5 z-10">
            <h1>Create Group</h1>
            <input className="bg-muted" value={newGroupName} name="newGroupName" id="newGroupName" onChange={updateGroupName} />
            <button onClick={createGroup}>Create</button>
        </div>
    )
}

export default CreateGroup;