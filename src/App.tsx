import React from 'react';
import logo from './logo.svg';
import { LinksWidget } from './LinksWidget';
import { LinksWidgetEditor } from './LinksWidgetEditor';
import WidgetData from './WidgetData';
import { BaseWidget } from './BaseWidget';
import { QuoteWidget } from './QuoteWidget';
import { DateTimeWidget } from './DateTimeWidget';
import { styled } from '@linaria/react';

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap');
  background-color: #1E1F25;
  height: 100vh;
  color: white;
  font-family: "Montserrat", sans-serif;
`

function App() {
  return (
    <StyledApp className="App">
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
    </StyledApp>
  );
}

export default App;
