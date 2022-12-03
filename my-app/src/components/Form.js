import Card from "./Card";
import Axios from "axios";
import classes from "./Form.module.css";
import { useEffect, useState } from 'react';


function Form() {
    const [quiz, setQuiz] = useState(null);
    const [quizItration, setQuizItration] = useState(null);

    const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

    useEffect(() => {
         getQuestion();
    }, [])

    const getQuestion = () => {
        Axios.get("https://the-trivia-api.com/api/questions?limit=20"
        ).then((Response)=> {
            console.log(Response.data)
            console.log(Response.data[0].incorrectAnswers[0])
            console.log(Response.data[0].correctAnswer[0])

            setQuiz(Response.data)
            setQuizItration(Response.data[currentQuizNumber])
         }
        );
    };
    const nextQuiz = () => {
        console.log(quiz.length)
        if (currentQuizNumber >= quiz.length - 1){
            return;
        }
        setCurrentQuizNumber(prevNumber => prevNumber + 1)
        setQuizItration(quiz[currentQuizNumber])
    }

    const prevQuiz = () => {
        if (currentQuizNumber<= 0){
            return;
        }
        setCurrentQuizNumber(prevNumber => prevNumber - 1)
        setQuizItration(quiz[currentQuizNumber])
    }

    return(
        <form className={classes.form}>
            {quizItration != null &&
                <Card className={classes.card} >
                    <div>
                        <h4 className={classes.questionNumber} htmlFor="question">Question {currentQuizNumber+1}</h4>
                        <p className={classes.question} id="question">{quizItration.question}</p>
                    </div>
                    <div className={classes.control}>
                        <input name={currentQuizNumber} id="option-a" required type='radio' />
                        <span>{quizItration.incorrectAnswers[0]}</span>
                    </div>
                    <div className={classes.control}>
                        <input name={currentQuizNumber} id="option-b" required type='radio' />
                        <span>{quizItration.incorrectAnswers[1]}</span>
                    </div>
                    <div className={classes.control}>
                        <input name={currentQuizNumber} id="option-c" required type='radio' />
                        <span>{quizItration.incorrectAnswers[2]}</span>
                    </div>
                    <div className={classes.control}>
                        <input name={currentQuizNumber} id="option-d" required type='radio' />
                        <span>{quizItration.correctAnswer}</span>
                    </div>
                    <div className={classes.action}>
                        <button type="button" className={classes.back}onClick={prevQuiz}>Previous</button>
                        <button type="button" className={classes.next} onClick={nextQuiz}>Next</button>
                    </div>
                </Card>
             }
        </form>
    )
    
}

export default Form;