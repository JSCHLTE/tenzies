import React from 'react'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isDieHeld ? "#800080" : "#fff",
        color: props.isDieHeld ? "#fff" : "#000"
    }

  return (
    <div className='dieStyle' onClick={props.dieClick} style={styles}>
        <p>{props.dieValue}</p>
    </div>
  )
}
