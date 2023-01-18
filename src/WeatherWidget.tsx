import React from "react";
import { css } from "@linaria/core"
import { styled } from "@linaria/react"
import dateFormat from "dateformat";

const StyledWeatherWidget = styled.div`
    display: flex;
    flex-direction: row;

    .day {
        margin: 0 10px;
    }
`

const StyledWeatherCode = styled.div`
    font-size: 0.6em;
`

const StyledUnit = styled.span`
    font-size: 0.65em;
    margin-left: 3px;
`

type WeatherDay = {
    date: Date,
    maxTemp: number,
    minTemp: number,
    weatherCode: number,
};

type WeatherWidgetPropsType = {
    days?: number,
};

type WeatherWidgetStateType = {
    weather: WeatherDay[],
};

export class WeatherWidget extends React.Component<WeatherWidgetPropsType, WeatherWidgetStateType> {
    constructor(props: WeatherWidgetPropsType) {
        super(props);
        this.state = {
            weather: [],
        };
    }

    getDays = () => this.props.days || 5;

    componentDidMount() {
        const daily = [
            "temperature_2m_max",
            "temperature_2m_min",
            "weathercode",
        ];
        const url = "https://api.open-meteo.com/v1/forecast?";
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + this.getDays() - 1);
        console.log(dateFormat(startDate, "yyyy-mm-dd"))
        const fullUrl = url + [
            `latitude=${52.52}`,
            `longitude=${13.41}`,
            `daily=${daily.join(",")}`,
            `start_date=${dateFormat(startDate, "yyyy-mm-dd")}`,
            `end_date=${dateFormat(endDate, "yyyy-mm-dd")}`,
            `timezone=${timezone}`,
        ].join("&");
        fetch(fullUrl)
            .then((response) => response.json())
            .then((data) => {
                const weather: WeatherDay[] = [];
                for (const index in data.daily.time) {
                    const maxTemp = data.daily.temperature_2m_max[index];
                    const minTemp = data.daily.temperature_2m_min[index];
                    const weatherCode = data.daily.weathercode[index];
                    const dateString = data.daily.time[index];
                    console.log(index);
                    const dateSplit = dateString.split("-");
                    const date = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    weather.push({
                        date,
                        maxTemp,
                        minTemp,
                        weatherCode,
                    });
                }
                this.setState({ weather: weather });
            });
    }

    renderWeatherCode(index: number) {
        switch (this.state.weather[index].weatherCode) {
            case 0:
                return <div>Clear</div>;
            case 1:
                return <div>Some clouds</div>;
            case 2:
                return <div>Cloudy</div>;
            case 3:
                return <div>Overcast</div>;
            case 45:
                return <div>Foggy</div>;
            case 48:
                return <div>Snow fog</div>; // depositing rime fog
            case 51:
                return <div>Light drizzle</div>;
            case 53:
                return <div>Drizzle</div>;
            case 55:
                return <div>Heavy drizzle</div>;
            case 56:
                return <div>Snow and drizzle</div>;
            case 57:
                return <div>Heavy snow and drizzle</div>;
            case 61:
                return <div>Light rain</div>;
            case 63:
                return <div>Rain</div>;
            case 65:
                return <div>Heavy rain</div>;
            case 66:
                return <div>Snow and rain</div>;
            case 67:
                return <div>Heavy snow and rain</div>;
            case 71:
                return <div>Light snow</div>;
            case 73:
                return <div>Snow</div>;
            case 75:
                return <div>Heavy snow</div>;
            case 77:
                return <div>Hailsnow</div>;
            case 80:
                return <div>Light rain showers</div>;
            case 81:
                return <div>Rain showers</div>;
            case 82:
                return <div>Heavy rain showers</div>;
            case 85:
                return <div>Light snow showers</div>;
            case 86:
                return <div>Heavy snow showers</div>;
            case 95:
                return <div>Light thunderstorm</div>;
            case 96:
                return <div>Thunderstorm</div>;
            case 99:
                return <div>Hailstorm</div>;
            default:
                return <div></div>;
        }
    }

    render() {
        const padMaxTemp = (day: WeatherDay) => day.maxTemp >= 0 && day.minTemp < 0
        const padMinTemp = (day: WeatherDay) => day.minTemp >= 0 && day.maxTemp < 0
        const tempPadding = <span style={{color:"transparent"}}>-</span>
        return (
            <StyledWeatherWidget>
                {this.state.weather.map((day: WeatherDay, index: number) => {
                    return <div className="day" key={day.date.toString()}>
                        {index == 0
                            ? <div>Today</div>
                            : <div>{dateFormat(day.date, "dddd")}</div>
                        }
                        <div>{padMaxTemp(day) && tempPadding}{day.maxTemp}<StyledUnit>°C</StyledUnit></div>
                        <div>{padMinTemp(day) && tempPadding}{day.minTemp}<StyledUnit>°C</StyledUnit></div>
                        <StyledWeatherCode>{this.renderWeatherCode(index)}</StyledWeatherCode>
                    </div>
                })}
            </StyledWeatherWidget>
        )
    }
}