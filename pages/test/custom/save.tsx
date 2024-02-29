import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios";
import ThemeButton from "@/components/shared/ThemeButton";

const Save = () => {
    const session = useSession().data;
    const [selectedGroup, setSelectedGroup] = useState<any>(null)
    const [groups, setGroups] = useState<any[]>([])
    const [formData, setFormData] = useState<{
        testName: string,
        totalMins: number,
        expireDate: string,
        questions: any[],
        sharedWith: any[],
        owner: string
    }>({
        testName: "",
        totalMins: 0,
        expireDate: "",
        questions: [],
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

    const fetchGroups = async () => {
        try {
            const res = await axios.get("/api/group/user/" + session?.user?.id)
            setGroups(res.data.ownedGroups);
            setSelectedGroup(res.data.ownedGroups[0]._id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("questions");
        if (data) {
            setFormData({
                ...formData,
                questions: JSON.parse(data)
            })
        }
        if (session) {
            setFormData({
                ...formData,
                owner: session.user.id,
            })
            fetchGroups();
        }
    }, [session]);

    useEffect(() => {
        console.log("Updated sharedWith:", formData.sharedWith);
    }, [formData.sharedWith]);

    const handleAddGroup = () => {
        console.log("Selected Group: ", selectedGroup)
        // Check if the group is already added
        if (formData.sharedWith.includes(selectedGroup)) {
            return;
        }
        // Add the id of the selected group
        setFormData(prevState => ({
            ...prevState,
            sharedWith: [...prevState.sharedWith, selectedGroup]
        }));

        console.log(formData.sharedWith)
    };

    const handleRemoveGroup = (id:string) => {
        return () => {
            console.log("Removing: ", id)
            setFormData(prevState => ({
                ...prevState,
                sharedWith: prevState.sharedWith.filter(curr_id => curr_id !== id)
            }));
        }
    }

    const handleSaveTest = async () => {
        try {
            const res = await axios.post("/api/test", formData)
            console.log(res.data)
            console.log(formData)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="py-80 bg-base flex flex-col w-screen items-center justify-center">
            <div className="flex flex-col w-screen items-center justify-center bg-base relative z-10">
                <h1>Okay Time To Save</h1>
                <input type="text"
                    name="testName"
                    value={formData.testName}
                    placeholder="Test Name"
                    onChange={handleChange}
                />
                <input type="number"
                    name="totalMins"
                    value={formData.totalMins}
                    placeholder="Total Mins"
                    onChange={handleChange}
                />
                <input type="date"
                    name="expireDate"
                    value={formData.expireDate}
                    placeholder="Expire Date"
                    onChange={handleChange}
                />

                {/* make a dropdown menu for group  */}
                <select name="group" id="group" onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedGroup(e.target.value)
                }}>
                    {groups.map((group, index) => (
                        <option key={index} value={group._id}>{group.name}</option>
                    ))}
                </select>

                <ThemeButton handleClick={handleAddGroup} text="Add Group" />

                <div>
                    {formData.sharedWith && formData.sharedWith.map((id, index) => {
                        const group = groups.find(group => group._id === id);
                        return (
                            <div key={index}>
                                <p>{group.name}</p>
                                <button onClick={handleRemoveGroup(id)}>Remove</button>
                            </div>
                        )
                    })}
                </div>

                <ThemeButton handleClick={handleSaveTest} text="Save Test" />
            </div>
        </div>
    )
}

export default Save;
