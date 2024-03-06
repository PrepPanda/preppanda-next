import React from 'react';
import ThemeButton from '../shared/ThemeButton';
import { useRouter } from 'next/router';

const GivenTestCard = (test: any) => {
    const router = useRouter();
    const showStats = () => {
        router.push('/test/given/' + test.test._id);
    }
    return (
        <div className='text-rose flex gap-5 items-center'>
            <h2>{test.test.name}</h2>
            <ThemeButton handleClick={showStats}>Stats</ThemeButton>
        </div>
    );
}

export default GivenTestCard;


