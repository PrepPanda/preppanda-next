import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import PandaButton from "../panda/PandaButton";
import toast from 'react-hot-toast';

const JoinGroup = ({ ...props }: any) => {
  const session = useSession().data;
  const [code, setCode] = useState<string>("");

  const changeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value.length > 6) {
      return;
    }
    setCode(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.put("/api/group", {
        code: code,
        member: session?.user.id,
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast('Joined Group Successfully!',
        {
          icon: '🙆🏼‍♂️',
          style: {
            borderRadius: '10px',
            background: '#524f67',
            color: '#e0def4',
            fontWeight: 'bold',
          },
        }
      );
      props.setUpdate((prev: boolean) => !prev)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 z-10">
      <h1 className="text-3xl font-black mb-4">Join Group</h1>
      <div className="flex gap-5">
        <input className="bg-muted rounded-full px-3" value={code} name="code" id="code" onChange={changeCode} placeholder="Enter Group Code" />
        <PandaButton handleClick={handleSubmit}>
          Join
        </PandaButton>
      </div>
    </div>
  );
}

export default JoinGroup;

