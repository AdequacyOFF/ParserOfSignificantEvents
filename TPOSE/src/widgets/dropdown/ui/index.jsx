import React, { useState } from 'react';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = {
  "января": "yanvarya",
  "февраля": "fevralya",
  "марта": "marta",
  "апреля": "aprelya",
  "мая": "maya",
  "июня": "iyunya",
  "июля": "iyulya",
  "августа": "avgusta",
  "сентября": "sentyabrya",
  "октября": "oktyabrya",
  "ноября": "noyabrya",
  "декабря": "dekabrya"
};

function Dropdown({ fetchEvents }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("января");

  const handleFetch = () => {
    const englishMonth = months[selectedMonth];
    fetchEvents(selectedDay, englishMonth);
  };

  return (
    <div className="dropdown">
      <label>
        День:
        <select value={selectedDay} onChange={(e) => setSelectedDay(Number(e.target.value))}>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </label>
      <label>
        Месяц:
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {Object.keys(months).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </label>
      <button onClick={handleFetch}>Получить события</button>
    </div>
  );
}

export default Dropdown;
