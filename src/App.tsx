import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LinksWidget } from './LinksWidget';
import { LinksWidgetEditor } from './LinksWidgetEditor';
import WidgetData from './WidgetData';
import { BaseWidget } from './BaseWidget';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
