import React from 'react'
import Language from './Language'

const LanguagesList = (props) => {
    const languages = props.languages;
  return (
    <div>{languages.map((language) => (
        <Language key={language.id} name={language.name} />
      ))}</div>
  )
}

export default LanguagesList