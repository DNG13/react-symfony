import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types"

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
    }

    handlerRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handlerNewItemSubmit(itemName, reps){
        console.log('TO-Do handler');
        console.log(itemName, reps)
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