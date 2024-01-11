import React, { useState } from 'react';

const Question = ({ questiondata }: { questiondata: any }) => {
    const [editedQuestion, setEditedQuestion] = useState(questiondata.question);
    const [editedAnswer, setEditedAnswer] = useState(questiondata.answer);
    const [editedOptions, setEditedOptions] = useState([...questiondata.options]);



    return (
        <div className="border-gray-700 flex flex-col rounded-md p-4 px-10 border-2 m-4 basis-1/4">
            {editedQuestion}
        </div>
    );
};

export default Question;

