import axios from "axios";
import ThemeButton from "../shared/ThemeButton";
import { useSession } from "next-auth/react";
import  CryptoJS  from "crypto-js";

const TestCard = ({test}:any ) => {
    const startTest = async () => {
        try{
            const res = await axios.get('/api/test/' + test._id);
            const testData:any = res.data;
            console.log(res.data.questions);
            for(let i = 0; i < testData.questions.length; i++) {
                const currentAnswer = testData.questions[i].correctAnswer;
                testData.questions[i].correctAnswer = CryptoJS.AES.encrypt(currentAnswer, process.env.NEXT_PUBLIC_CRYPTO_SECRET).toString();
            }
            localStorage.setItem('originalTest', JSON.stringify(testData));
        }
        catch(error) {
            console.log(error)
        }
    }

    const userId = useSession().data?.user.id;

    return (
        <>
            <h2>{test.name}</h2>
            <p className="text-rose">{test.minutes}mins</p>
            <ThemeButton handleClick={startTest}>Start Test</ThemeButton>
            {
                userId === test.owner && <ThemeButton handleClick={() => console.log('clicked')}>Edit Test</ThemeButton>
            }
        </>
    );
}

export default TestCard;


