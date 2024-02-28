import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Group = ({ group, owned=false }: { group: { _id: string, name: string, code: string }, owned:boolean }) => {
    const deleteGroup = async () => {
        try{
            const response = await axios.delete(`/api/group/${group._id}`);
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <h3>{group.name}</h3>
            <p>{group.code}</p>
            {owned && <button onClick={deleteGroup}><RxCross2/> </button>}
            
        </>
    );
}

export default Group;
