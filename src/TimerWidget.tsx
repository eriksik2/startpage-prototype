import { styled } from "@linaria/react";
import React from "react";


const StyledTimerWidget = styled.div`

`

type TimerWidgetProps = {

}

type TimerWidgetState = {
    intervalTimer: NodeJS.Timer | null,
    intervalStartTime: number | null,
    targetTime: number | null,
    accumulatedTime: number,
    deltaTime: number,
}

export class TimerWidget extends React.Component<TimerWidgetProps, TimerWidgetState> {
    constructor(props: TimerWidgetProps) {
        super(props);
        this.state = {
            intervalTimer: null,
            intervalStartTime: null,
            targetTime: null,
            accumulatedTime: 0,
            deltaTime: 0,
        };

        this.handleChangeTarget = this.handleChangeTarget.bind(this);
    }

    isPlaying(): boolean {
        return this.state.intervalTimer !== null;
    }

    hasTargetTime(): boolean {
        return this.state.targetTime !== null;
    }

    getElapsedTime(): number {
        return this.state.accumulatedTime + this.state.deltaTime;
    }

    getRemainingTime(): number | null {
        if(this.state.targetTime == null) {
            return null;
        }
        return this.state.targetTime - this.getElapsedTime();
    }

    startTimer() {
        if(this.state.targetTime != null && this.getElapsedTime() >= this.state.targetTime) {
            return
        }
        if(this.state.intervalTimer === null) {
            const timer = setInterval(() => {
                const deltaTime = Date.now() - this.state.intervalStartTime!;
                const elapsedTime = this.state.accumulatedTime + deltaTime;

                if (this.state.targetTime != null && elapsedTime >= this.state.targetTime) {
                    this.pauseTimer();
                    this.setState({
                        deltaTime: this.state.targetTime,
                        accumulatedTime: 0,
                    });
                    return;
                }

                this.setState({
                    deltaTime: deltaTime,
                });
            }, 1);
            this.setState({
                intervalTimer: timer,
            });
        }
        this.setState({
            intervalStartTime: Date.now(),
        });
    }

    pauseTimer() {
        if (this.state.intervalTimer != null) {
            clearInterval(this.state.intervalTimer);
            const now = Date.now();
            this.setState({
                intervalTimer: null,
                accumulatedTime: this.state.accumulatedTime + this.state.deltaTime,
                deltaTime: 0,
                intervalStartTime: null,
            });
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.setState({
            intervalStartTime: null,
            accumulatedTime: 0,
            deltaTime: 0,
        });
    }


    handleChangeTarget(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.value === "" || event.target.value === "0") {
            this.setState({
                targetTime: null,
            });
            return;
        }
        const targetTime = parseInt(event.target.value);
        this.setState({
            targetTime: targetTime,
        });
    }

    render() {
        const totalMs = this.getElapsedTime();
        const milliseconds = Math.floor(totalMs % 1000);
        const seconds = Math.floor(totalMs / 1000) % 60;
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(minutes / 60) % 60;

        const hasSeconds = totalMs >= 1000;
        const hasMinutes = totalMs >= 1000 * 60;
        const hasHours = totalMs >= 1000 * 60 * 60;
        return <StyledTimerWidget>
            <span>
                <TimeDisplay ms={totalMs}/>
            </span>
            {this.hasTargetTime()
                ? <span className="timer-target-display">
                    <span>/</span>
                    <TimeDisplay ms={this.state.targetTime!}/>
                </span>
                : null
            }
            <br />
            <input type="text" onChange={this.handleChangeTarget}></input>
            {this.isPlaying()
                ? <button onClick={() => this.pauseTimer()}>Stop</button>
                : <button onClick={() => this.startTimer()}>Start</button>
            }
            <button onClick={() => this.resetTimer()}>Reset</button>
        </StyledTimerWidget>
    }
}


const StyledTimeDisplay = styled.span`
    font-size: 3em;

    .timer-ms-group {
        font-size: 0.4em;
    }
`;
const TimeDisplay = (props: {ms: number}) => {
    const milliseconds = Math.floor(props.ms % 1000);
    const seconds = Math.floor(props.ms / 1000) % 60;
    const minutes = Math.floor(props.ms / 1000 / 60) % 60;
    const hours = Math.floor(props.ms / 1000 / 60 / 60);

    const hasSeconds = props.ms >= 1000;
    const hasMinutes = props.ms >= 1000 * 60;
    const hasHours = props.ms >= 1000 * 60 * 60;
    return <StyledTimeDisplay>
        {hasHours
            ? <>
                <span className="timer-hours">{hours}</span>
                <span className="timer-separator">:</span>
            </>
            : null
        }
        {hasMinutes
            ? <>
                <span className="timer-minutes">{minutes}</span>
                <span className="timer-separator">:</span>
            </>
            : null
        }
        {hasSeconds
            ? <>
                <span className="timer-seconds">{seconds}</span>
            </>
            : null
        }
        <span className="timer-ms-group">
            {hasSeconds
                ? <span className="timer-separator">:</span>
                : null
            }
            <span className="timer-ms">{milliseconds}</span>
        </span>
    </StyledTimeDisplay>
}