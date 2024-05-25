import React from 'react';
import PandaButton from '../panda/PandaButton';
import { useRouter } from 'next/router';

const GivenAssessmentCard = (assessment: any) => {
  const router = useRouter();
  const showStats = () => {
    router.push('/assessment/given/' + assessment.assessment._id);
  }
  return (
    <div className='grid grid-cols-2 text-rose gap-5 items-center'>
      <h2 className='text-3xl'>{assessment.assessment.name}</h2>
      <PandaButton handleClick={showStats}>Show Stats</PandaButton>
    </div>
  );
}

export default GivenAssessmentCard;
