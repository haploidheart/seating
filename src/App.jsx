import React, { useState } from 'react'
import './App.css'
import SeatGrid from './components/SeatGrid'

function App() {
  const [classroomName, setClassroomName] = useState('1年A組')
  const [studentText, setStudentText] = useState(`1,田中,太郎,タナカ,M
2,鈴木,次郎,スズキ,M
3,佐藤,三郎,サトウ,M
4,井上,和子,イノウエ,F
5,木村,美由紀,キムラ,F
6,加藤,直樹,カトウ,M
7,清水,香織,シミズ,F
8,山口,健一,ヤマグチ,M
9,林,昌子,ハヤシ,F
10,斎藤,洋介,サイトウ,M`)

  const [emptySeatIndices, setEmptySeatIndices] = useState([])

  const students = studentText.trim().split('\n').filter(l => l.trim()).map(line => {
    const [id, lastName, firstName, reading, gender] = line.split(',')
    return { id, lastName, firstName, reading, gender }
  })

  const toggleEmptySeat = (index) => {
    setEmptySeatIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  // Calculate available seats (7x7 = 49)
  const totalSlots = 49 - emptySeatIndices.length
  const isOverLimit = students.length > totalSlots

  return (
    <div className="container">
      <header className="no-print">
        <h1>座席表ジェネレーター</h1>
        <div className="input-area glass">
          <p className="instruction">
            1. 教室名と名簿を入力してください（出席番号,姓,名,読み,性別(M/F)）<br />
            2. 下のグリッドで、<b>座らせたくない場所（空席）をクリック</b>して選択してください。<br />
            3. 「A5サイズで印刷」ボタンで印刷（縦方向）してください。
          </p>
          <div className="classroom-input">
            <label htmlFor="classroom-name">教室名：</label>
            <input 
              id="classroom-name"
              type="text" 
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              placeholder="例: 1年A組"
            />
          </div>
          <textarea 
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            placeholder="出席番号,姓,名,読み,性別(M/F) の形式で入力"
            rows={8}
          />
          {isOverLimit && (
            <div className="warning">
              ⚠️ 座席が足りません。空席設定を減らすか、名簿を調整してください。
              ({students.length}名に対して、利用可能座席は{totalSlots}席です)
            </div>
          )}
          <button onClick={() => window.print()} className="print-button">
            A5サイズで印刷
          </button>
        </div>
      </header>

      <main className="seat-chart-area">
        <div className="classroom-name-display">{classroomName}</div>
        <div className="teachers-desk">教卓</div>
        <SeatGrid 
          students={students} 
          emptySeatIndices={emptySeatIndices} 
          onSeatClick={toggleEmptySeat}
        />
      </main>

      <footer className="no-print">
        <p>※ 7×7のグリッドで表示されます（空席設定可能）</p>
      </footer>
    </div>
  )
}

export default App
