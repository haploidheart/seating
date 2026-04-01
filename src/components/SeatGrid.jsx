import React from 'react'
import StudentCard from './StudentCard'
import './SeatGrid.css'

const SeatGrid = ({ students, emptySeatIndices, onSeatClick }) => {
  const rows = 7
  const cols = 7
  const totalSeats = rows * cols

  // Construct the grid
  const grid = Array(totalSeats).fill(null).map((_, i) => ({
    type: emptySeatIndices.includes(i) ? 'forced-empty' : 'empty'
  }))

  // Get available indices and sort them in column-major order
  // (Vertical priority: Row 0 Col 0, Row 1 Col 0, Row 2 Col 0...)
  const availableIndices = [...Array(totalSeats).keys()]
    .filter(i => !emptySeatIndices.includes(i))
    .sort((a, b) => {
      const colA = a % cols;
      const rowA = Math.floor(a / cols);
      const colB = b % cols;
      const rowB = Math.floor(b / cols);
      if (colA !== colB) return colA - colB;
      return rowA - rowB;
    })

  // Assign students to the column-major prioritized slots
  students.forEach((student, idx) => {
    if (idx < availableIndices.length) {
      grid[availableIndices[idx]] = { type: 'student', data: student }
    }
  })

  return (
    <div className="seat-grid">
      {grid.map((slot, index) => (
        <div 
          key={index} 
          className={`seat-slot ${slot.type}`}
          onClick={() => onSeatClick(index)}
        >
          {slot.type === 'student' ? (
            <StudentCard student={slot.data} />
          ) : (
            <div className="empty-placeholder">
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SeatGrid
