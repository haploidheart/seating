import React from 'react'
import './StudentCard.css'

const StudentCard = ({ student }) => {
  const g = (student.gender || '').toLowerCase()
  const isFemale = g === 'f' || g === '女' || g === 'female'
  
  return (
    <div className={`student-card glass ${isFemale ? 'female' : 'male'}`}>
      <div className="card-side">
        <div className="number-box">{student.id}</div>
        <div className="reading-vertical">{student.reading}</div>
      </div>
      <div className="card-main">
        <div className="surname-vertical">{student.lastName}</div>
        <div className="firstname-vertical">{student.firstName}</div>
      </div>
    </div>
  )
}

export default StudentCard
