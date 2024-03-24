const QuestionCardForm = ({ question }: any) => {
  return (
    <>
      <div>{question.question}</div>
      {
        question.iamge &&
        <img src={question.image} alt="question_image" />
      }
      {
        question.type == "mul e"
      }
    </>
  )
}

export default QuestionCardForm
