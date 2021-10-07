import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types"
import RepLogList from "./RepLogList";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null
        }
        this.handlerRowClick = this.handlerRowClick.bind(this);
    }

    handlerRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        const {highlightedRowId} = this.state;
        const {withHeart} = this.props;

        return (
            <RepLogs
                withHeart={withHeart}
                highlightedRowId={highlightedRowId}
                onRowClick={this.handlerRowClick}
            />);
    }
}

RepLogApp.propTypes = {
    withHeart : PropTypes.bool
}