import { styled } from "@linaria/react";
import React from "react";
import { DateTimeWidget } from "./DateTimeWidget";
import { WidgetEditorProps } from "./WidgetData";


type PropsType = WidgetEditorProps<typeof DateTimeWidget>;

type StateType = {
    data: React.ComponentProps<typeof DateTimeWidget>,
}

export class DateTimeWidgetEditor extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            data: props.data ?? {
                showTime: true,
                showDayOfWeek: true,
                showDate: true,
                showYear: true,
            },
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.data);
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="showTime">Show Time</label>
                <input type="checkbox" name="showTime" checked={this.state.data.showTime} onChange={e => this.handleToggle("showTime", e)} />
                <br />
                <label htmlFor="showDayOfWeek">Show Day of Week</label>
                <input type="checkbox" name="showDayOfWeek" checked={this.state.data.showDayOfWeek} onChange={e => this.handleToggle("showDayOfWeek", e)} />
                <br />
                <label htmlFor="showDate">Show Date</label>
                <input type="checkbox" name="showDate" checked={this.state.data.showDate} onChange={e => this.handleToggle("showDate", e)} />
                <br />
                <label htmlFor="showYear">Show Year</label>
                <input type="checkbox" name="showYear" checked={this.state.data.showYear} onChange={e => this.handleToggle("showYear", e)} />
                <br />
                <input type="submit" value="Save" />
            </form>
        </div>
    }
}