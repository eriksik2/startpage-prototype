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

type WeatherDay = {
    date: Date,
    maxTemp: number,
    minTemp: number,
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
                    const dateString = data.daily.time[index];
                    console.log(index);
                    const dateSplit = dateString.split("-");
                    const date = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
                    weather.push({
                        date,
                        maxTemp,
                        minTemp,
                    });
                }
                this.setState({ weather: weather });
            });
    }

    render() {
        return (
            <StyledWeatherWidget>
                {this.state.weather.map((day: WeatherDay, index: number) => {
                    return <div className="day" key={day.date.toString()}>
                        {index == 0
                            ? <div>Today</div>
                            : <div>{dateFormat(day.date, "dddd")}</div>
                        }
                        <div>{day.maxTemp}°C</div>
                        <div>{day.minTemp}°C</div>
                    </div>
                })}
            </StyledWeatherWidget>
        )
    }
}