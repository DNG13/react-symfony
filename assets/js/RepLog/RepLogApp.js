import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {v4 as uuidv} from 'uuid';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
                {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
                {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
            ],
            numberOfHearts: 1,
        }
        this.handlerRowClick = this.handlerRowClick.bind(this);
        this.handlerAddRepLog = this.handlerAddRepLog.bind(this);
        this.handlerHeartChange = this.handlerHeartChange.bind(this);
    }

    handlerRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handlerAddRepLog(itemLabel, reps) {

        const newRep = {
            id: uuidv(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        }
        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];
            return {repLogs: newRepLogs};
        });
    }

    handlerHeartChange(heartCount){
        this.setState({
            numberOfHearts: heartCount
        })
    }
    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handlerRowClick}
                onAddRepLog={this.handlerAddRepLog}
                onHeartChange={this.handlerHeartChange}
            />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}