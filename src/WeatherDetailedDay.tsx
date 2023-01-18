import { styled } from "@linaria/react";
import dateFormat from "dateformat";
import React from "react";
import { StyledUnit } from "./WeatherWidget";

const StyledWeatherDetailedDay = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    align-content: stretch;
    

    div.weather-now-indicator {
        position: relative;
        margin-right: -1px;
        width: 1px;
        background-color: red;
    }
    div.weather-hours {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: calc(100% - 1px);
        padding: 0.5em;
    }

`

const StyledWeatherHour = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin: 0;

    p {
        margin: 0;
    }

    p.weather-hour {
        font-size: 0.8em;
        margin-bottom: 0.5em;
    }
`

type WeatherHour = {
    date: Date,
    temp: number,
}

type WeatherDeatiledDayProps = {
    date?: Date,
    samples?: number,
    showTemp?: boolean,
    temperatureUnit?: "celsius" | "fahrenheit",
    indicateCurrentTime?: boolean,
}

type WeatherDeatiledDayState = {
    weather: WeatherHour[],
}

export class WeatherDeatiledDay extends React.Component<WeatherDeatiledDayProps, WeatherDeatiledDayState> {

    constructor(props: WeatherDeatiledDayProps) {
        super(props);
        this.state = {
            weather: [],
        }
    }

    getSamples = () => this.props.samples || 24;

    resample(data: WeatherHour[]): WeatherHour[] {
        const samples = this.getSamples();
        const result = [];
        for (let i = 0; i < samples - 1; i++) {
            const index = Math.floor(i * data.length / samples);
            result.push(data[index]);
        }
        result.push(data[data.length - 1]);
        return result;
    }

    componentDidMount() {
        if (this.props.date == null) {
            return;
        }
        const year = this.props.date.getFullYear();
        const month = this.props.date.getMonth();
        const day = this.props.date.getDate();
        const hourly = [
            "temperature_2m",
        ];
        const url = "https://api.open-meteo.com/v1/forecast?";
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const startDate = new Date(year, month, day);
        const endDate = new Date(year, month, day);
        console.log(dateFormat(startDate, "yyyy-mm-dd"))
        const fullUrl = url + [
            `latitude=${52.52}`,
            `longitude=${13.41}`,
            `hourly=${hourly.join(",")}`,
            `start_date=${dateFormat(startDate, "yyyy-mm-dd")}`,
            `end_date=${dateFormat(endDate, "yyyy-mm-dd")}`,
            `timezone=${timezone}`,
        ].join("&");
        fetch(fullUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const weather: WeatherHour[] = [];
                for (const index in data.hourly.time) {
                    const temp = data.hourly.temperature_2m[index];
                    const dateString = data.hourly.time[index];
                    const timeSplit = dateString.split("T")[1].split(":");
                    const date = new Date(year, month, day, parseInt(timeSplit[0]), parseInt(timeSplit[1]));
                    weather.push({
                        date,
                        temp,
                    });
                }
                this.setState({ weather: this.resample(weather) });
            });
    }

    renderTemperature(celsius: number) {
        const unit = this.props.temperatureUnit === "celsius" ? "°C" : "°F";
        const value = this.props.temperatureUnit === "celsius" ? celsius : celsius * 9 / 5 + 32;
        return <span>{value.toFixed(1)}<StyledUnit>{unit}</StyledUnit></span>
    }

    render() {
        const now = new Date();
        const nowPercentage = (now.getHours() * 60 + now.getMinutes()) / (24 * 60) * 100;
        const isToday = this.props.date != null && dateFormat(this.props.date, "yyyy-mm-dd") === dateFormat(now, "yyyy-mm-dd");
        return <StyledWeatherDetailedDay>
            {isToday && this.props.indicateCurrentTime
                ? <div className="weather-now-indicator" style={{left:`${10 + nowPercentage*0.8}%`}}/>
                : null
            }
            <div className="weather-hours">
                {this.state.weather.map((hour) => {
                    return <StyledWeatherHour>
                        <p className="weather-hour">{dateFormat(hour.date, "HH:MM")}</p>
                        {this.props.showTemp
                            ? <p>{this.renderTemperature(hour.temp)}</p>
                            : null
                        }
                    </StyledWeatherHour>
                })}
                {this.state.weather.length === 0
                    ? <StyledWeatherHour>
                        <p style={{color: "transparent"}}>{"."}</p>
                        {this.props.showTemp
                            ? <p style={{color: "transparent"}}>{"."}</p>
                            : null
                        }
                    </StyledWeatherHour>
                    : <></>
                }
            </div>
        </StyledWeatherDetailedDay>
    }
}