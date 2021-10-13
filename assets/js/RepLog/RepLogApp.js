import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import { v4 as uuidv } from 'uuid';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
                {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
                {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
            ]
        }
        this.handlerRowClick = this.handlerRowClick.bind(this);
        this.handlerNewItemSubmit = this.handlerNewItemSubmit.bind(this);
    }

    handlerRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handlerNewItemSubmit(itemLabel, reps){
        const repLogs = this.state.repLogs;
        const newRep =  {
            id: uuidv(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted:  Math.floor(Math.random() * 50)
        }

        repLogs.push(newRep);
        this.setState({repLogs:repLogs});
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handlerRowClick}
                onNewItemSubmit={this.handlerNewItemSubmit}
            />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}