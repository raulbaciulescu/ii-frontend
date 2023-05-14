import axios from "axios";
import { React, useState } from "react";
import { HOST, PORT } from "../../prodURL";

const Quiz = ({ quizQuestions, quizId, onSubmit }) => {
    const [answers, setAnswers] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const closePopup = () => setShowScorePopup(false);

    const handleSubmit = () => {
        setSubmitting(true);
        
        var temp = 0;
        answers.forEach((answer, index) => quizQuestions.questions[index].correctOption === answer && ++temp);
        setScore(temp);
        onSubmit(temp);

        setShowScorePopup(true);

        axios
            .post(`http://${HOST}:${PORT}/quiz?userId=${localStorage.getItem('uid')}&quizId=${quizId}&score=${score}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(resp => console.log(JSON.stringify(resp)))
            .catch(console.error);
    };

    return (
        <div>
            {showScorePopup && (
                <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                }}>
                <div style={{ backgroundColor: "#ffffff", padding: 20, borderRadius: 10 }}>
                    <h3>Your final score is: {score}</h3>
                    <button onClick={closePopup}>OK</button>
                </div>
                </div>
            )}
            {quizQuestions.questions.map((question, index) => (
                <div key={question.id} style={{ marginBottom: 25 }}>
                    <h3>{index + 1 + '.) ' + question.text}</h3>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} style={{ marginBottom: 20, marginLeft: 20, backgroundColor: `${submitting && optionIndex === answers[index] ? (answers[index] === question.correctOption ? 'green' : 'red')  : '#ffffff'}` }}>
                            <input type="radio" name={`question${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => handleAnswerChange(index, optionIndex)}/>
                            {option}
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={handleSubmit} style={{
                marginTop: 15,
                width: 80,
                height: 30,
                fontSize: 20,
                textAlign: 'center',
                backgroundColor: '#f59d37e6',
                cursor: 'pointer',
                borderRadius: 10,
                borderColor: '#f59d37e6'
            }}>Submit</button>
        </div >
    );
};

export default Quiz;
