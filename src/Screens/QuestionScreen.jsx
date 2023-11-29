import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CopyLinkButton from '../Components/CopyLinkButton';
import questions from '../data/quizQuestions'
import christmasCharacters from '../data/personalities';
import './customFont.css'

const QuestionScreen = () => {
  const language = useSelector((state) => state.language);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const languageText = {
    English: 'Hello!',
    한국어: '안녕하세요!',
  };

  const text = languageText[language] || 'Language not supported';
    
  const textStyles = {
    fontSize: '4.3vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin: '8px 0', // Add some spacing between text elements
  };

  const questionStyles = {
    fontSize: '3vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
    margin: '8px 0', // Add some spacing between text elements
  };
  
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
  };
  
  const imageStyles = {
    width: '100vw',
    zIndex: -1,
  };

  
  const titleStyles = {
    fontSize: '9vw',
    fontFamily: 'MyFont, sans-serif',
    textAlign: 'center',
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
    console.log(userAnswers)
    return mbtiType;
  };

  const displayResults = () => {
    const mbtiType = calculateMBTIPersonality();
    const character = christmasCharacters.find((char) => char.result === mbtiType);

    if (!character) {
      return <p>Character not found for your MBTI type.</p>;
    }

    
    
    return (
      <div style={containerStyles}>
        <img
          src="ISFP.png"
          alt="Your Image"
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
  <p style={titleStyles}>Question {currentQuestion + 1}/{questions.length}</p>
  <p style={questionStyles}>{questions[currentQuestion].question}</p>
  <div style={textStyles}>
    {questions[currentQuestion].options.map((optionData, index) => (
      <p key={index} onClick={() => handleAnswerClick(optionData.text)}>
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
