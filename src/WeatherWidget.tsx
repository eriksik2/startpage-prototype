import React from "react";
import { css } from "@linaria/core"
import { styled } from "@linaria/react"

const StyledWeatherWidget = styled.div`
`
class WeatherWidget extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            weather: null,
        };
    }

    componentDidMount() {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=59.85882&lon=17.63889&appid=1d1fa46e4408e168dee375fc9153fdba")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ weather: data });
            });
    }

    render() {
        return (
            <StyledWeatherWidget>
                {this.state.weather == null 
                    ? "" 
                    : this.state.weather.main.temp
                }
            </StyledWeatherWidget>
        )
    }
}