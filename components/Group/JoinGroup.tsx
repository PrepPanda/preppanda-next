import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const JoinGroup = () => {
    const session = useSession().data;
    const [code, setCode] = useState<string>("");

    const changeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if(event.target.value.length > 6) {
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
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
        console.log("Joining group with code:", code);
    }

    return (
        <div className="flex z-10">
            <h1>Join Group</h1>
            
                <input value={code} name="code" id="code" onChange={changeCode} />
                <button onClick={handleSubmit}>Join</button>
            
        </div>
    );
}

export default JoinGroup;

