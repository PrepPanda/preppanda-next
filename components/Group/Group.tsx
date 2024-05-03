import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import ThemeButton from "../shared/ThemeButton";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Group = ({ group, owned = false, ...props }: any) => {
  const { data: session } = useSession();
  const deleteGroup = async () => {
    try {
      const response = await axios.delete(`/api/group/${group._id}`);
      console.log(response.data)
      props.setUpdate((prev: boolean) => !prev)
      toast('Group Deleted',
        {
          icon: '🗑',
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
      console.log(error)
    }
  }

  const leaveGroup = async () => {
    try {
      const userId = session?.user.id
      const response = await axios.post(`/api/group/user/${userId}`, { groupId: group._id })
      props.setUpdate((prev: boolean) => !prev)
     
      toast('Leaved Group Successfully!',
        {
          icon: ' 🫵🏻',
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
      console.log(error)
    }
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-5 my-2 content-center">
        <h3>{group.name}</h3>
        <p>{group.code}</p>
        {owned && <ThemeButton handleClick={deleteGroup}><span className="text-lg">Delete</span></ThemeButton>}
        {!owned && <ThemeButton handleClick={leaveGroup}><span className="text-lg">Leave</span></ThemeButton>}
      </div>
    </>
  );
}

export default Group;
