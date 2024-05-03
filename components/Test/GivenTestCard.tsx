import React from 'react';
import ThemeButton from '../shared/ThemeButton';
import { useRouter } from 'next/router';

const GivenTestCard = (test: any) => {
  const router = useRouter();
  const showStats = () => {
    router.push('/test/given/' + test.test._id);
  }
  return (
    <div className='grid grid-cols-2 text-rose gap-5 items-center'>
      <h2 className='text-3xl'>{test.test.name}</h2>
      <ThemeButton handleClick={showStats}>Show Stats</ThemeButton>
    </div>
  );
}

export default GivenTestCard;


