import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {getRepLogs, deleteRepLog, createRepLog} from '../api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: ''
        }
        this.successMessageTimeoutHandler = 0;
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            });
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandler);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        }
        this.setState({
            isSavingNewRepLog: true
        })

        const newState = {
            isSavingNewRepLog: false,
        };

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];
                    return {
                        ...newState,
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: ''
                    };
                });
                this.setSuccessMessage('Rep log saved.');
            })
            .catch(error => {
                error.response.json()
                    .then(errorData => {
                        const errors = errorData.errors;
                        const firstError = errors[Object.keys(errors)[0]];
                        this.setState({
                            ...newState,
                            newRepLogValidationErrorMessage: firstError,
                        });
                    })

            })
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });
        clearTimeout(this.successMessageTimeoutHandler);
        this.successMessageTimeoutHandler = setTimeout(() => {
            this.setState({
                successMessage: ''
            });
            this.successMessageTimeoutHandler = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleDeleteRepLog(id) {
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }
                    return {...repLog, isDeleting: true};
                })
            }
        });

        deleteRepLog(id)
            .then(() => {
                // remove the repo log without mutating state
                // filter returns a new array
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    }
                });
                this.setSuccessMessage('Message was Un-lifted.');
            });
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}