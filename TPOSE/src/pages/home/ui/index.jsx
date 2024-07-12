import React, { useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Dropdown from '../../../widgets/dropdown/ui/index.jsx';
import { saveAs } from 'file-saver';
import '../../../app/styles/App.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (day, month) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://calendaronline.ru/den-v-istorii-${day}-${month}/`);
      const html = response.data;
      const $ = cheerio.load(html);

      const eventItems = [];
      $('#post-4222 div div ul li').each(index, element).each((index, element) => {
        const year = $(element).find('b').text();
        const description = $(element).text().replace(year, '');
        eventItems.push({ year, description });
      });

      setEvents(eventItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const docContent = `Знаменательные события произошедшие ${new Date().toLocaleDateString()}\n\n`;
    const tableContent = events.map(event => `${event.year}\t${event.description}\n`).join('');
    const blob = new Blob([docContent + tableContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'events.txt');
  };
  return (
    <div className="App">
      <h1>TPOSE</h1>
      <h2>The Parser Of Significant Events</h2>
      <p>Это персональный инструмент для поиска и формирования таблиц с знаменательными событиями, произошедшими в мире конкретным числом</p>
      <Dropdown fetchEvents={fetchEvents} />
      {loading ? <p>Загрузка...</p> : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Год</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.year}</td>
                  <td>{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length > 0 && <button onClick={handleDownload}>Скачать</button>}
        </div>
      )}
    </div>
  )
}
export default Home;