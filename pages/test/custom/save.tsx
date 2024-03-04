import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios";
import ThemeButton from "@/components/shared/ThemeButton";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Save = () => {
    const router = useRouter();
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
    };

    const handleRemoveGroup = (id: string) => {
        return () => {
            setFormData(prevState => ({
                ...prevState,
                sharedWith: prevState.sharedWith.filter(curr_id => curr_id !== id)
            }));
        }
    }

    const handleSaveTest = async () => {
        try {
            const res = await axios.post("/api/test", formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            localStorage.removeItem("questions");
            router.push("/test/my")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-40 text-2xl bg-base flex flex-col w-screen items-center justify-center">
            <div className="flex flex-col gap-5 w-screen items-center justify-center bg-base relative z-10">
                <h1>Okay Time To Save</h1>
                <input type="text"
                    className="bg-muted"
                    name="testName"
                    value={formData.testName}
                    placeholder="Test Name"
                    onChange={handleChange}
                />
                <input type="number"
                    className="bg-muted"
                    name="totalMins"
                    value={formData.totalMins}
                    placeholder="Total Mins"
                    onChange={handleChange}
                />
                <input type="date"
                    className="bg-muted"
                    name="expireDate"
                    value={formData.expireDate}
                    placeholder="Expire Date"
                    onChange={handleChange}
                />

                {/* make a dropdown menu for group  */}
                <select className="bg-muted" name="group" id="group" onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedGroup(e.target.value)
                }}>
                    {groups.map((group, index) => (
                        <option key={index} value={group._id}>{group.name}</option>
                    ))}
                </select>

                <ThemeButton handleClick={handleAddGroup} >
                    <p>Add Group</p>
                </ThemeButton>

                <div>
                    {formData.sharedWith && formData.sharedWith.map((id, index) => {
                        const group = groups.find(group => group._id === id);
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <p>{group.name}</p>
                                <ThemeButton handleClick={handleRemoveGroup(id)}>
                                    <IoRemoveCircleOutline />
                                </ThemeButton>
                            </div>
                        )
                    })}
                </div>

                <ThemeButton handleClick={handleSaveTest}>
                    <p>Save Test</p>
                </ThemeButton>
            </div>
        </div>
    )
}

export default Save;


