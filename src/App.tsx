import WidgetData from './WidgetData';
import { BaseWidget } from './BaseWidget';
import { QuoteWidget } from './QuoteWidget';
import { DateTimeWidget } from './DateTimeWidget';
import { styled } from '@linaria/react';
import { WeatherWidget } from './WeatherWidget';

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap');
  height: 100vh;
  color: white;
  font-family: "Montserrat", sans-serif;

  background: rgb(30,31,37);
  background: linear-gradient(0deg, rgba(30,31,37,1) 0%, rgba(30,31,37,1) 27%, rgba(36,18,41,1) 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StyledRowLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1000px;
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
        <QuoteWidget />
        <StyledRowLayout>
          <WeatherWidget />
          <BaseWidget
            data={WidgetData.fromJson(
              {
                type: "LinksWidget",
                props: {
                  name: "",
                  links: [
                    {"name": "Google", "url": "https://www.google.com"},
                    {"name": "Netflix", "url": "https://www.netflix.com"},
                    {"name": "Reddit", "url": "https://www.reddit.com"},
                  ],
                },
              }
            )}
          />
        </StyledRowLayout>
    </StyledApp>
  );
}

export default App;
