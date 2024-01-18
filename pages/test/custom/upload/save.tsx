import React, { useState, useEffect } from 'react';
import Question from '@/components/shared/Question/verify/Question';
import { MdOutlineArrowCircleRight, MdOutlineArrowCircleLeft } from "react-icons/md";
import ThemeButton from '@/components/shared/ThemeButton';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import axios from 'axios';

const Save = () => {
    const session = useSession();
    const [formData, setFormData] = useState({
        testName: "",
        totalMins: "",
        expireDate: ""
    })
    const [questions, setQuestions] = useState([])

    const handleOnChange = (name: string, value: any) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        const data = localStorage.getItem('uploadedData')
        if (data) {
            const parsedData = JSON.parse(data).data
            setQuestions(parsedData)
        }
    }, [])

    const handleSave = async (e:any) => {
        e.preventDefault()
        console.log(session)
        if (!session) {
            console.log("no session")
            return;
        }

        try {
            const data = {
                testName: formData.testName,
                totalMins: formData.totalMins,
                expireDate: formData.expireDate,
                questions: questions,
                user: session?.data?.user
            }
            if(session != null)
                axios.post('/api/test/upload', data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="my-44 px-24 w-screen flex flex-col items-center">
            <h1 className="my-10">OKay time to save</h1>
            <Carousel questions={questions} />
            <div className="grid grid-cols-2 gap-5 my-5 ">
                <Input type="text" name="testName" label="Test Name" onchange={(value: any) => handleOnChange('testName', value)} />
                <Input type="number" name="totalMins" label="Total Mins" onchange={(value: any) => handleOnChange('totalMins', value)} />
                <Input type="date" name="expireDate" label="Expire Date" onchange={(value: any) => handleOnChange('expireDate', value)} className="col-span-2" />
            </div>
            <ThemeButton text="Save" handleClick={handleSave} />
        </div>
    )
}

const Input = ({ type, name, label, onchange, className }: any) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                id={name}
                className="border-rose-700 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-rose-700 peer"
                placeholder=" "
                onChange={(e) => onchange(e.target.value)}
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-700 peer-focus:dark:text-rose-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {label}
            </label>
        </div>
    )
}

const Carousel = ({ questions }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    return (
        <div className="flex items-center justify-center w-[100%]">
            <button onClick={handlePrev}><MdOutlineArrowCircleLeft className="text-4xl text-gray-400" />  </button>
            {questions.length > 0 && (
                <Question key={currentIndex} questiondata={questions[currentIndex]} uniqueValue={Math.random()} disabled={true} />
            )}
            <button onClick={handleNext}><MdOutlineArrowCircleRight className="text-4xl text-gray-400" /></button>
        </div>
    );
};

export default Save;

