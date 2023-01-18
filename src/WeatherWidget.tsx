import React from "react";
import { styled } from "@linaria/react"
import dateFormat from "dateformat";
import { WeatherDeatiledDay } from "./WeatherDetailedDay";

import { BsCloudFill, BsCloudDrizzleFill, BsCloudHailFill, BsCloudLightningFill, BsCloudLightningRainFill, BsCloudHazeFill, BsCloudRain, BsCloudRainHeavy, BsCloudSleet, BsCloudSnow, BsCloudHail, BsCloudRainFill, BsCloudRainHeavyFill, BsCloudSleetFill, BsCloudSnowFill, BsCloudSunFill, BsCloudsFill, BsSunFill } from "react-icons/bs";


const StyledWeatherAndDetailed = styled.div`
    font-size: min(3vw, 1em);
    max-width: 100%;
`

const StyledWeatherWidget = styled.div`
    display: flex;
    flex-direction: row;

    .day {
        margin: 0 0.5em;
        padding: 0.5em;
    }

    .day.active {
        background-color: #1473cb;
        border-radius: 15px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .day.active.no-hourly {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }

    .detailsConnector {
        position: relative;
        bottom: 0;
        margin: 0 5px;
        width: calc(100% - 10px);
        height: 100%;
        background-color: #1473cb;
    }
`

const StyledDayWithConnector = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
`

const StyledDayContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
`

const StyledDayTemperatures = styled.div`
    align-self: flex-start;
`

const StyledWeatherDetails = styled.div`
    --weather-day-open-anim-speed: 0.25s;

    div.details {
        margin: 0 0.5em;
        background-color: #1473cb;
        border-radius: 15px;

        transition: transform var(--weather-day-open-anim-speed) ease, border-radius var(--weather-day-open-anim-speed) ease;
        transform-origin: top;
    }

    div.details.closed {
        border-radius: 0px 0px 15px 15px / 25% 25% 50% 50%;
        transform: scaleY(0);
    }

    div.details.left {
        transition: border-top-left-radius var(--weather-day-open-anim-speed), border-top-right-radius 0.0s;
        border-top-right-radius: 0 !important;
    }

    div.details.right {
        transition: border-top-right-radius var(--weather-day-open-anim-speed), border-top-left-radius 0.0s;
        border-top-left-radius: 0 !important;
    }
`

const StyledWeatherCode = styled.span`
    margin-right: 0.25em;

`

export const StyledUnit = styled.span`
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
    daysShown?: number,
    hoursShown?: number,
    temperatureUnit?: "celsius" | "fahrenheit",
    dailyShowMaxTemp?: boolean,
    dailyShowMinTemp?: boolean,
    dailyShowWeatherCode?: boolean,
    hourlyShowTemp?: boolean,
    hourlyIndicateCurrentTime?: boolean,
};

export const WeatherWidgetDefaultProps: WeatherWidgetPropsType = {
    daysShown: 5,
    hoursShown: 7,
    temperatureUnit: "celsius",
    dailyShowMaxTemp: true,
    dailyShowMinTemp: true,
    dailyShowWeatherCode: true,
    hourlyShowTemp: true,
    hourlyIndicateCurrentTime: false,
};

type WeatherWidgetStateType = {
    weather: WeatherDay[],
    showDetails: number | null,
};

export class WeatherWidget extends React.Component<WeatherWidgetPropsType, WeatherWidgetStateType> {
    constructor(props: WeatherWidgetPropsType = WeatherWidgetDefaultProps) {
        super(props);
        this.state = {
            weather: [],
            showDetails: 0,
        };

        this.handleClickDay = this.handleClickDay.bind(this);
    }

    celciusToFahrenheit = (c: number) => c * 9 / 5 + 32;

    getDaysShown = () => this.props.daysShown || 5;
    getHoursShown = () => this.props.hoursShown || 5;

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
        endDate.setDate(endDate.getDate() + this.getDaysShown() - 1);
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
        const iconSize = "0.8em";
        switch (this.state.weather[index].weatherCode) {
            case 0:
                return <span title="Clear"><BsSunFill size={iconSize}/></span>
            case 1:
                return <span title="Lightly cloudy"><BsCloudSunFill size={iconSize}/></span>
            case 2:
                return <span title="Cloudy"><BsCloudFill size={iconSize}/></span>
            case 3:
                return <span title="Overcast"><BsCloudsFill size={iconSize}/></span>
            case 45:
                return <span title="Foggy"><BsCloudHazeFill size={iconSize}/></span>
            case 48:
                return <span title="Depositing rime fog"><BsCloudHazeFill size={iconSize}/></span>
            case 51:
                return <span title="Light drizzle"><BsCloudDrizzleFill size={iconSize}/></span>
            case 53:
                return <span title="Drizzle"><BsCloudDrizzleFill size={iconSize}/></span>
            case 55:
                return <span title="Heavy drizzle"><BsCloudDrizzleFill size={iconSize}/></span>
            case 56:
                return <span title="Snow and drizzle"><BsCloudSleetFill size={iconSize}/></span>
            case 57:
                return <span title="Heavy snow and drizzle"><BsCloudSleetFill size={iconSize}/></span>
            case 61:
                return <span title="Light rain"><BsCloudRainFill size={iconSize}/></span>
            case 63:
                return <span title="Rain"><BsCloudRainFill size={iconSize}/></span>
            case 65:
                return <span title="Heavy rain"><BsCloudRainHeavyFill size={iconSize}/></span>
            case 66:
                return <span title="Snow and rain"><BsCloudSleetFill size={iconSize}/></span>
            case 67:
                return <span title="Heavy snow and rain"><BsCloudSleetFill size={iconSize}/></span>
            case 71:
                return <span title="Light snow"><BsCloudSnowFill size={iconSize}/></span>
            case 73:
                return <span title="Snow"><BsCloudSnowFill size={iconSize}/></span>
            case 75:
                return <span title="Heavy snow"><BsCloudSnowFill size={iconSize}/></span>
            case 77:
                return <span title="Hail and snow"><BsCloudHailFill size={iconSize}/></span>
            case 80:
                return <span title="Light rain showers"><BsCloudDrizzleFill size={iconSize}/></span>
            case 81:
                return <span title="Rain showers"><BsCloudRainFill size={iconSize}/></span>
            case 82:
                return <span title="Heavy rain showers"><BsCloudRainHeavyFill size={iconSize}/></span>
            case 85:
                return <span title="Light snow showers"><BsCloudSnowFill size={iconSize}/></span>
            case 86:
                return <span title="Heavy snow showers"><BsCloudSnowFill size={iconSize}/></span>
            case 95:
                return <span title="Thunderstorm"><BsCloudLightningFill size={iconSize}/></span>
            case 96:
                return <span title="Thunderstorm with rain"><BsCloudLightningRainFill size={iconSize}/></span>
            case 99:
                return <span title="Hailstorm"><BsCloudHailFill size={iconSize}/></span>
            default:
                return <div></div>;
        }
    }

    handleClickDay(event: React.MouseEvent<HTMLDivElement>, index: number) {
        if (this.state.showDetails === index) {
            this.setState({ showDetails: null });
        } else {
            this.setState({ showDetails: index });
        }
    }

    getTempInUnit(celsius: number) {
        return this.props.temperatureUnit === "celsius" ? celsius : celsius * 9 / 5 + 32;
    }
    renderTemperature(celsius: number) {
        const unit = this.props.temperatureUnit === "celsius" ? "°C" : "°F";
        const value = this.props.temperatureUnit === "celsius" ? celsius : celsius * 9 / 5 + 32;
        return <span>{value.toFixed(1)}<StyledUnit>{unit}</StyledUnit></span>
    }

    render() {
        const padMaxTemp = (day: WeatherDay) => this.getTempInUnit(day.maxTemp) >= 0 && this.getTempInUnit(day.minTemp) < 0
        const padMinTemp = (day: WeatherDay) => this.getTempInUnit(day.minTemp) >= 0 && this.getTempInUnit(day.maxTemp) < 0
        const tempPadding = <span style={{color:"transparent"}}>-</span>

        const detailsLeftOrRight = this.state.showDetails === 0
            ? " right"
            : this.state.showDetails === this.state.weather.length - 1
            ? " left"
            : "";

        const showAnyHourly = this.props.hourlyShowTemp
        return (
            <StyledWeatherAndDetailed>
                <StyledWeatherWidget>
                    {this.state.weather.map((day: WeatherDay, index: number) => {
                        let dayClassName = "day";
                        if (this.state.showDetails === index) {
                            dayClassName += " active";
                        }
                        if (!showAnyHourly) {
                            dayClassName += " no-hourly";
                        }
                        return <StyledDayWithConnector>
                            <div className={dayClassName} key={day.date.toString()} onClick={(event) => this.handleClickDay(event, index)}>
                                {this.props.dailyShowWeatherCode
                                    ? <div>
                                        <StyledWeatherCode>{this.renderWeatherCode(index)}</StyledWeatherCode>
                                    </div>
                                    : null
                                }
                                {index === 0
                                    ? <span>Today</span>
                                    : <span>{dateFormat(day.date, "dddd")}</span>
                                }
                                <StyledDayContent>
                                    <StyledDayTemperatures>
                                        {this.props.dailyShowMaxTemp
                                            ? <div>{padMaxTemp(day) && tempPadding}{this.renderTemperature(day.maxTemp)}</div>
                                            : null
                                        }
                                        {this.props.dailyShowMinTemp
                                            ? <div>{padMinTemp(day) && tempPadding}{this.renderTemperature(day.minTemp)}</div>
                                            : null
                                        }
                                    </StyledDayTemperatures>
                                </StyledDayContent>
                                
                            </div>
                            {this.state.showDetails === index && showAnyHourly
                                ? <div className="detailsConnector"></div>
                                : <div></div>
                            }
                        </StyledDayWithConnector>
                    })}
                </StyledWeatherWidget>
                <StyledWeatherDetails>
                    {this.state.showDetails !== null && showAnyHourly
                        ? <div className={"details " + detailsLeftOrRight}>
                            <WeatherDeatiledDay
                                key={this.state.showDetails}
                                date={this.state.showDetails < this.state.weather.length
                                    ? this.state.weather[this.state.showDetails].date
                                    : new Date()
                                }
                                temperatureUnit={this.props.temperatureUnit}
                                showTemp={this.props.hourlyShowTemp}
                                indicateCurrentTime={this.props.hourlyIndicateCurrentTime}
                                samples={this.getHoursShown()}
                            />
                        </div>
                        : <div className={"details closed"}>
                            <WeatherDeatiledDay
                                key={this.state.showDetails}
                                temperatureUnit={this.props.temperatureUnit}
                                showTemp={this.props.hourlyShowTemp}
                                indicateCurrentTime={this.props.hourlyIndicateCurrentTime}
                                samples={this.getHoursShown()}
                            />
                        </div>
                    }
                </StyledWeatherDetails>
            </StyledWeatherAndDetailed>
        )
    }
}