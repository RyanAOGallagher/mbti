import React from 'react';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../Redux/languageSlice';

const Language = (props) => {
  const dispatch = useDispatch();
  const handleLanguageChange = () => {
    dispatch(changeLanguage(props.name));
  };

  return (
    <div>
      <button onClick={handleLanguageChange}>{props.name}</button>
    </div>
  );
};

export default Language;
