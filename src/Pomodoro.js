import React from 'react';
import { mapDispatchToProps, mapStateToProps } from './Redux.js';
import { connect } from 'react-redux';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionTimer: undefined
        }
        console.log(JSON.stringify(props));

        // "The Great Binding"
        this.adjustBreakTime = this.adjustBreakTime.bind(this);
        this.adjustSessionTime = this.adjustSessionTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.updateSession = this.updateSession.bind(this);
    }

    componentWillReceiveProps(props) {
        this.updateStateFrom(props);
    }

    updateStateFrom(props) {
        // console.log(JSON.stringify(props)); 
    }

    adjustBreakTime(increase) {
        if (this.props.sessionStarted) { return; }
        increase ? this.props.increaseBreak() : this.props.decreaseBreak();
    }

    adjustSessionTime(increase) {
        if (this.props.sessionStarted) { return; }
        increase ? this.props.increaseSession() : this.props.decreaseSession();
    }

    startTimer() {
        this.stopTimer();
        if (this.props.sessionStarted == false) {
            this.props.start();
            this.setState({
                sessionTimer: window.setInterval(this.updateSession, 1000)
            })
        }
    }

    stopTimer() {
        this.props.pause();
        window.clearTimeout(this.state.sessionTimer)
    }

    resetTimer() {
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
        this.stopTimer();
        this.props.reset();
    }

    getSessionLabel() {
        return this.props.breakInProgress ? "Break" : "Session";
    }

    getSessionTime() {
        let value = this.props.breakInProgress ? this.props.breakDurationLeft : this.props.durationLeft;
        let float = parseFloat(value).toFixed(2);
        let string = String(float).replace(".", ":");
        if (string.length < 5) {
            string = "0" + string;
        }
        return string;
    }

    updateSession() {
        let isBreak = this.props.breakInProgress;
        let timeLeft = isBreak ? this.props.breakDurationLeft : this.props.durationLeft;

        if (timeLeft <= 0) {
            this.props.toggleBreak();
            this.audioBeep.play(); 
            return;
        }


        let newValue = Number((timeLeft - 0.01).toFixed(2));
        // clip seconds to 60 max
        if (parseInt(newValue) !== parseInt(newValue + 0.4)) {
            newValue -= 0.4;
        }

        isBreak ? this.props.updateBreak(newValue) : this.props.updateSession(newValue);
    }

    render() {
        return (
            <header className="App-header">
                <h1>Pomodoro Clock</h1>
                <div id="settings">

                    <div id="break-settings" className="settings-half">
                        <h3 id="break-label">Break Length</h3>
                        <button id="break-increment" onClick={() => this.adjustBreakTime(true)} className="button">⬆</button>
                        <p id="break-length">{this.props.breakLength}</p>
                        <button id="break-decrement" onClick={() => this.adjustBreakTime(false)} className="button">⬇</button>
                    </div>

                    <div id="session-settings" className="settings-half">
                        <h3 id="session-label">Session Length</h3>
                        <button id="session-increment" onClick={() => this.adjustSessionTime(true)} className="button">⬆</button>
                        <p id="session-length">{this.props.sessionLength}</p>
                        <button id="session-decrement" onClick={() => this.adjustSessionTime(false)} className="button">⬇</button>
                    </div>

                </div>

                <div id="session-display">
                    <h2 id="timer-label">{this.getSessionLabel()}</h2>
                    <h2 id="time-left">{this.getSessionTime()}</h2>
                </div>

                <div id="controls">
                    <button className="button" id="start_stop" onClick={this.startTimer}><i className="fas fa-play"></i></button>
                    <button className="button" id="reset" onClick={this.resetTimer}><i className="fas fa-power-off"></i></button>
                </div>

                <audio id="beep" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />

            </header>
        )
    }
}



const Container = connect(mapStateToProps, mapDispatchToProps)(Pomodoro);

export { Container }; 