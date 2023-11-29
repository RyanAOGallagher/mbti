import React from 'react'
import LanguagesList from '../Components/LanguagesList';
import { Link } from 'react-router-dom';
const languages = [
    { id: 1, name: '한국어' },
    { id: 2, name: 'English' },
  ];


const HomeScreen = () => {
  return (
    <div><LanguagesList languages={languages} />
       <Link to="/questions">
        <button > Questions </button>
      </Link>
      </div>

  )
}

export default HomeScreen