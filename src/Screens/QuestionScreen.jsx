import React, { useState } from 'react';
import CopyLinkButton from '../Components/CopyLinkButton';
import questions from '../data/quizQuestions'
import christmasCharacters from '../data/personalities';
import '../Fonts/customFont.css'

const QuestionScreen = () => {
  //const language = useSelector((state) => state.language);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
    
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
  };

  const questionNumberStyles = {
    fontSize: '9vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin:0
  };

  const questionStyles = {
    fontSize: '10vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin:'0.5vh'

  };


  const answerContainerStyles = {

    border: '5px solid red'
  };


  const answerStyles = {
    fontSize: '7.5vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin: '2%', 
    border: '5px solid black'
  };




  const textStyles = {
    fontSize: '4.3vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin: '8px 0', 
  };
  
  const imageStyles = {
    width: '100vw',
    zIndex: -1,
  };

  
  const titleStyles = {
    fontSize: '9vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin: 0
  };

   const handleAnswerClick = (selectedOption) => {
    const selectedOptionData = questions[currentQuestion].options.find(
      (optionData) => optionData.text === selectedOption
    );
    setUserAnswers([...userAnswers, selectedOptionData.type]);
    if (currentQuestion < questions.length ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateMBTIPersonality = () => {
    const answerCounts = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers.forEach((answer) => {
      answerCounts[answer]++;
    });

    let mbtiType = '';
    mbtiType += answerCounts.E >= answerCounts.I ? 'E' : 'I';
    mbtiType += answerCounts.N >= answerCounts.S ? 'N' : 'S';
    mbtiType += answerCounts.T >= answerCounts.F ? 'T' : 'F';
    mbtiType += answerCounts.J >= answerCounts.P ? 'J' : 'P';
    console.log(mbtiType)
    return mbtiType;
  };

  const displayResults = () => {
    const mbtiType = calculateMBTIPersonality();
    const character = christmasCharacters.find((char) => char.result === mbtiType);
    return (
      <div style={containerStyles}>
        <img
          src="ISFP_2.png"
          style={imageStyles}
          onLoad={() => setIsImageLoaded(true)}
        />
        {isImageLoaded && (
          <div>
            <h4 style={titleStyles}>{character.personality}</h4>
            <p style={textStyles}>{character.description}</p>
            <p style={textStyles}>How to spend your Christmas:</p>
            <p style={textStyles}>{character.recommendation}</p>
            <p style={textStyles}>Who to spend your Christmas with:</p>
            <p style={textStyles}>{character.compatibility_1}</p>
            <p style={textStyles}>{character.compatibility_2}</p>
            <CopyLinkButton />
          </div>
        )}
      </div>
    );
        };  

  return (
    <div style={containerStyles}>
      {currentQuestion < questions.length ? (
      <div>
          <p style={questionNumberStyles}> {currentQuestion + 1}/{questions.length}</p>
          <p style={questionStyles}>{questions[currentQuestion].question}</p>
          <div style={answerContainerStyles}>
          {questions[currentQuestion].options.map((optionData, index) => (
            <p style={answerStyles} key={index} onClick={() => handleAnswerClick(optionData.text)}>
            {optionData.text}
            </p>
          ))}
        </div>  
      </div>
      ) : displayResults() }
    </div>
  );
};

export default QuestionScreen;
