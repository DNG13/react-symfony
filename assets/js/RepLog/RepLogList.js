import React from "react";
import PropTypes from "prop-types"

export default function RepLogList(props) {
    const {highlightedRowId, onRowClick, onDeleteRepLog, repLogs, isLoaded, isSavingNewRepLog} = props;

    const handleDeleteClick = (event, repLogId) => {
        event.preventDefault();
        onDeleteRepLog(repLogId);
    }
    if (!isLoaded) {
        return (
            <tbody>
            <tr>
                <td colSpan="4" className="text-center">
                    Loading ...
                </td>
            </tr>
            </tbody>
        );
    }

    // noinspection CheckTagEmptyBody
    return (
        <tbody>
        {repLogs.map((repLog) => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'info' : ''}
                onClick={() => onRowClick(repLog.id)}
                style={{
                    opacity: repLog.isDeleting ? .3 : 1
                }}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.totalWeightLifted}</td>
                <td>
                    <a href="#" onClick={(event) => handleDeleteClick(event, repLog.id)}>
                        <span className="fa fa-trash"></span>
                    </a>
                </td>
            </tr>
        ))}
        {isSavingNewRepLog && (
            <tr>
                <td
                    colSpan="4"
                    className="text-center"
                    style={{
                        opacity: .5
                    }}
                >
                    lifting to the database ...
                </td>
            </tr>
        )}
        </tbody>);
}
RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
}