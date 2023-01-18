import React from "react";
import { css } from "@linaria/core"
import { styled } from "@linaria/react"
import dateFormat from "dateformat";

const StyledDateTimeWidget = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap');
    font-size: 3.5em;
    font-weight: 300;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    margin: 0;

    .Date {
        font-size: 0.3em;
        font-weight: 400;
        margin: 0;
    }
`
type StateType = {
    date: Date;
}

type PropsType = {
    showTime: boolean;
    showDayOfWeek: boolean;
    showDate: boolean;
    showYear: boolean;
}

export class DateTimeWidget extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ date: new Date() });
        }, 1000);
    }

    render() {
        return (
            <StyledDateTimeWidget>
                {this.props.showTime 
                    ? dateFormat(this.state.date, "HH:MM") 
                    : ""
                }
                <br />
                <p className="Date">
                    {this.props.showDayOfWeek 
                        ? dateFormat(this.state.date, "dddd") 
                        : ""
                    }
                    {this.props.showDayOfWeek && (this.props.showDate || this.props.showYear) && !(this.props.showDayOfWeek && this.props.showYear)
                        ? <span>, </span>
                        : ""}
                    {this.props.showDate 
                        ? dateFormat(this.state.date, "mmmm dS") 
                        : ""
                    }
                    {(this.props.showDayOfWeek || this.props.showDate) && this.props.showYear
                        ? <span>, </span>
                        : ""}
                    {this.props.showYear
                        ? dateFormat(this.state.date, "yyyy")
                        : ""
                    }
                </p>
            </StyledDateTimeWidget>
        )
    }
}
