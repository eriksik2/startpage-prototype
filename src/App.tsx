import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LinksWidget } from './LinksWidget';
import { LinksWidgetEditor } from './LinksWidgetEditor';
import WidgetData from './WidgetData';
import { BaseWidget } from './BaseWidget';
import { QuoteWidget } from './QuoteWidget';
import { DateTimeWidget } from './DateTimeWidget';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DateTimeWidget 
          showTime = {true} 
          showDate = {true} 
          showDayOfWeek = {true} 
          showYear = {false} 
        />
        <QuoteWidget applesPerWeek = {12} />
        <BaseWidget
          data={WidgetData.fromJson(
            {
              type: "LinksWidget",
              props: {
                name: "Base Links",
                links: [],
              },
            }
          )}
        />
      </header>
    </div>
  );
}

export default App;
