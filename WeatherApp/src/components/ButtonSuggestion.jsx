import React from 'react'
import './ButtonSuggestion.css'

const ButtonSuggestion = ({city}) => {
  return (
    <div className='buttonSuggestion'>
        <p>{city}</p>
    </div>
  )
}

export default ButtonSuggestion