import React from 'react';
import { mapDispatchToProps, mapStateToProps } from './Redux.js';
import { connect } from 'react-redux';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: props.breakLength,
            sessionLength: props.sessionLength,
            durationLeft: props.durationLeft
        };
        this.adjustBreakTime = this.adjustBreakTime.bind(this); 
        this.adjustSessionTime = this.adjustSessionTime.bind(this); 

        console.log(JSON.stringify(props)); 
    }

    updateStateFrom(props) {
        this.setState({
            breakLength: props.breakLength,
            sessionLength: props.sessionLength,
            durationLeft: props.durationLeft
        });

        console.log(JSON.stringify(props)); 
    }

    componentWillReceiveProps(props) {
        this.updateStateFrom(props); 
    }

    adjustBreakTime(increase) {
        increase ? this.props.increaseBreak() : this.props.decreaseBreak(); 
    }

    adjustSessionTime(increase) {
        increase ? this.props.increaseSession() : this.props.decreaseSession(); 
    }



    render() {
        return (
            <header className="App-header">
                <h1>Pomodoro Clock</h1>
                <div id="settings">

                    <div id="break-settings" className="settings-half">
                        <h3>Break Length</h3>
                        <button onClick={() => this.adjustBreakTime(true)} className="button">⬆</button>
                        <p id="break-time">{this.state.breakLength}</p>
                        <button onClick={() => this.adjustBreakTime(false)}className="button">⬇</button>
                    </div>

                    <div id="session-settings" className="settings-half">
                        <h3>Session Length</h3>
                        <button onClick={() => this.adjustSessionTime(true)} className="button">⬆</button>
                        <p id="session-time">{this.state.sessionLength}</p>
                        <button onClick={() => this.adjustSessionTime(false)} className="button">⬇</button>
                    </div>

                </div>

                <div id="session-display">
                    <h2>Session</h2>
                    <h2>25:00</h2>
                </div>

                <div id="controls">
                    <button className="button"><i className="fas fa-play"></i></button>
                    <button className="button"><i className="fas fa-power-off"></i></button>
                </div>

            </header>
        )
    }
}



const Container = connect(mapStateToProps, mapDispatchToProps)(Pomodoro);

export { Container }; 