import WidgetData from './WidgetData';
import { BaseWidget } from './BaseWidget';
import { QuoteWidget } from './QuoteWidget';
import { DateTimeWidget } from './DateTimeWidget';
import { styled } from '@linaria/react';
import { WeatherWidget, WeatherWidgetDefaultProps } from './WeatherWidget';
import React from 'react';
import { TimerWidget } from './TimerWidget';

export const IsEditModeContext = React.createContext(false);

const StyledAppAndBackground = styled.div`
  .App>div {
    max-width: 100%;
  }
`

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap');
  height: calc(100vh - 2*2em);
  color: white;
  font-family: "Montserrat", sans-serif;


  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2em 0em;
`

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(30,31,37);
  background: linear-gradient(0deg, rgba(30,31,37,1) 0%, rgba(30,31,37,1) 27%, rgba(36,18,41,1) 100%);
  z-index: -1;
`

const StyledRowLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 1000px;
`

type AppWidgetData = {

}

type AppStateType = {
  isEditMode: boolean,
}

class App extends React.Component<{}, AppStateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isEditMode: false,
    };
  }

  render() {
    return (
      <StyledAppAndBackground>
        <StyledBackground />
        <StyledApp className="App">
          <header>
            <button onClick={() => this.setState({isEditMode: !this.state.isEditMode})}>Edit</button>
          </header>
          <IsEditModeContext.Provider value={this.state.isEditMode}>
            <BaseWidget data={WidgetData.of(DateTimeWidget, {
              showTime: true,
              showDate: true,
              showDayOfWeek: true,
              showYear: false,
            })}/>
            <BaseWidget data={WidgetData.of(TimerWidget, {})}/>
            <BaseWidget data={WidgetData.of(QuoteWidget, {})}/>
            <StyledRowLayout>
              <BaseWidget data={WidgetData.of(WeatherWidget, WeatherWidgetDefaultProps)}/>
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
          </IsEditModeContext.Provider>
        </StyledApp>
      </StyledAppAndBackground>
    );
  }
}

export default App;
