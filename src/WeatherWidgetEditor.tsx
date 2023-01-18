import { styled } from "@linaria/react";
import React from "react";
import { WeatherWidget } from "./WeatherWidget";
import { WidgetEditorProps } from "./WidgetData";


type PropsType = WidgetEditorProps<typeof WeatherWidget>;

type StateType = {
    data: React.ComponentProps<typeof WeatherWidget>,
}

export class WeatherWidgetEditor extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            data: {
                temperatureUnit: this.props.data?.temperatureUnit ?? "celsius",
                dailyShowMaxTemp: this.props.data?.dailyShowMaxTemp ?? true,
                dailyShowMinTemp: this.props.data?.dailyShowMinTemp ?? true,
                dailyShowWeatherCode: this.props.data?.dailyShowWeatherCode ?? true,
                hourlyShowTemp: this.props.data?.hourlyShowTemp ?? true,
            },
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectValue = this.handleSelectValue.bind(this);
    }

    handleToggle(item: string, e: React.ChangeEvent<HTMLInputElement>) {
        const newData = {
            ...this.state.data,
            [item]: e.target.checked,
        };
        this.setState({
            data: newData,
        });
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    }

    handleSelectValue(item: string, e: React.ChangeEvent<HTMLSelectElement>) {
        const newData = {
            ...this.state.data,
            [item]: e.target.value,
        };
        this.setState({
            data: newData,
        });
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.data);
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="temperatureUnit">Show Time</label>
                <select name="temperatureUnit" value={this.state.data!.temperatureUnit} onChange={e => this.handleSelectValue("temperatureUnit", e)}>
                    <option value="celsius">Celsius</option>
                    <option value="fahrenheit">Fahrenheit</option>
                </select>
                <h1>Daily readings</h1>
                <label htmlFor="dailyShowMaxTemp">Max temperature</label>
                <input type="checkbox" name="dailyShowMaxTemp" checked={this.state.data!.dailyShowMaxTemp} onChange={e => this.handleToggle("dailyShowMaxTemp", e)} />
                <br />
                <label htmlFor="dailyShowMinTemp">Min temperature</label>
                <input type="checkbox" name="dailyShowMinTemp" checked={this.state.data!.dailyShowMinTemp} onChange={e => this.handleToggle("dailyShowMinTemp", e)} />
                <br />
                <label htmlFor="dailyShowWeatherCode">Weather</label>
                <input type="checkbox" name="dailyShowWeatherCode" checked={this.state.data!.dailyShowWeatherCode} onChange={e => this.handleToggle("dailyShowWeatherCode", e)} />
                <h1>Hourly readings</h1>
                <label htmlFor="hourlyShowTemp">Temperature</label>
                <input type="checkbox" name="hourlyShowTemp" checked={this.state.data!.hourlyShowTemp} onChange={e => this.handleToggle("hourlyShowTemp", e)} />
                <br />
                <label htmlFor="hourlyIndicateTime">Indicate current time</label>
                <input type="checkbox" name="hourlyIndicateTime" checked={this.state.data!.hourlyIndicateCurrentTime} onChange={e => this.handleToggle("hourlyIndicateCurrentTime", e)} />
                <br />
                <input type="submit" value="Save" />
            </form>
        </div>
    }
}