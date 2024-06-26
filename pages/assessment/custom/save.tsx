import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios";
import PandaButton from "@/components/panda/PandaButton";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Save = () => {
  const router = useRouter();
  const session = useSession().data;
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [groups, setGroups] = useState<any[]>([])
  const [formData, setFormData] = useState<{
    assessmentName: string,
    totalMins: number,
    expireDate: string,
    sharedWith: any[],
    owner: string
  }>({
    assessmentName: "",
    totalMins: 0,
    expireDate: "",
    sharedWith: [],
    owner: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    )
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("/api/group/user/" + session?.user?.id)
        setGroups(res.data.ownedGroups);
        setSelectedGroup(res.data.ownedGroups[0]._id)
      } catch (error) {
        console.log(error)
      }
    }
    if (session) {
      setFormData({
        ...formData,
        owner: session.user.id,
      })
      fetchGroups();
    }
  }, [session]);

  const handleAddGroup = () => {
    // Check if the group is already added
    if (formData.sharedWith.includes(selectedGroup)) {
      return;
    }
    // Add the id of the selected group
    setFormData(prevState => ({
      ...prevState,
      sharedWith: [...prevState.sharedWith, selectedGroup]
    }));
    toast('Group Added',
      {
        icon: '🥳',
        style: {
          borderRadius: '10px',
          background: '#524f67',
          color: '#e0def4',
          fontWeight: 'bold',
        },
      }
    );
  };

  const handleRemoveGroup = (id: string) => {
    return () => {
      setFormData(prevState => ({
        ...prevState,
        sharedWith: prevState.sharedWith.filter(curr_id => curr_id !== id)
      }));
      toast('Group Removed',
        {
          icon: '😯',
          style: {
            borderRadius: '10px',
            background: '#524f67',
            color: '#e0def4',
            fontWeight: 'bold',
          },
        }
      );
    }
  }

  const handleSaveAssessment = async () => {
    try {
      const localStorageData = localStorage.getItem("questions");
      if (!localStorageData) {
        return;
      }
      const questions = JSON.parse(localStorageData);
      const res = await axios.post("/api/assessment", { formData, questions },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      localStorage.removeItem("questions");
      toast('Assessment Created Successfully!',
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
      router.push("/assessment/my")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-40 text-2xl bg-base flex flex-col w-screen items-center justify-center">
      <div className="flex flex-col gap-5 w-screen items-center justify-center bg-base relative z-10">
        <h1>Okay Time To Save</h1>
        <input type="text"
          className="bg-muted rounded-full px-3 py-2"
          name="assessmentName"
          value={formData.assessmentName}
          placeholder="Assessment Name"
          onChange={handleChange}
        />
        <div className="flex gap-3 justify-center items-center">
          <label className="text-foam font-semibold text-2xl">Total Time in Mins</label>
          <input type="number"
            className="bg-muted rounded-full px-3 py-2"
            name="totalMins"
            value={formData.totalMins}
            placeholder="Total Mins"
            onChange={handleChange}
          />
        </div>
        <input type="date"
          className="bg-muted rounded-full px-3 py-2"
          name="expireDate"
          value={formData.expireDate}
          placeholder="Expire Date"
          onChange={handleChange}
        />

        {/* make a dropdown menu for group  */}
        <select
          className="bg-muted rounded-full px-3 py-2"
          name="group" id="group" onChange={(e) => {
            setSelectedGroup(e.target.value)
          }}>
          {groups.map((group, index) => (
            <option key={index} value={group._id}>{group.name}</option>
          ))}
        </select>

        <PandaButton handleClick={handleAddGroup} >
          <p>Add Group</p>
        </PandaButton>

        <div>
          {formData.sharedWith && formData.sharedWith.map((id, index) => {
            const group = groups.find(group => group._id === id);
            return (
              <div key={index} className="flex items-center gap-3">
                <p>{group.name}</p>
                <PandaButton handleClick={handleRemoveGroup(id)}>
                  <IoRemoveCircleOutline />
                </PandaButton>
              </div>
            )
          })}
        </div>

        <PandaButton handleClick={handleSaveAssessment}>
          <p>Save Assessment</p>
        </PandaButton>
      </div>
    </div >
  )
}

export default Save;


