// import TestDisplay from "@/components/Profile/TestDisplay";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const index = () => {
    const session = useSession().data;

    useEffect(() => {
        try {

        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>

        </div>
    );
};

export default index;
