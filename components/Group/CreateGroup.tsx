import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import PandaButton from "../panda/PandaButton";
import toast from "react-hot-toast";

const CreateGroup = ({ onGroupCreated, ...props }: any) => {
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
      props.setUpdate((prev: boolean) => !prev)
      toast('Group Created',
        {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#524f67',
            color: '#e0def4',
            fontWeight: 'bold',
          },
        }
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 z-10">
      <h1 className="text-3xl font-black mb-4">Create Group</h1>
      <div className="flex gap-5">
        <input className="bg-muted rounded-full px-3" value={newGroupName} name="newGroupName" id="newGroupName" onChange={updateGroupName} placeholder="Enter Group Name" />
        <PandaButton handleClick={createGroup}>Create</PandaButton>
      </div>

    </div>
  )
}

export default CreateGroup;
