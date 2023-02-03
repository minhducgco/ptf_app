import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onCreateLeave = async ({
    accessToken = '',
    child_ids = [],
    handover_receiver = '',
    leave_file_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            child_ids: child_ids,
            handover_receiver: handover_receiver,
            leave_file_ids: leave_file_ids,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/create',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onCreateLeave.propTypes = {
    accessToken: PropTypes.string.isRequired,
    employee_id: PropTypes.number.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    type: PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
    }).isRequired,
    requestUnitHaft: PropTypes.string.isRequired,
    requestDateFromPeriod: PropTypes.string,
    note: PropTypes.string.isRequired,
    lines: PropTypes.array.isRequired,
};

export const onSaveLeave = async ({
    accessToken = '',
    child_ids = [],
    handover_receiver = '',
    leave_file_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            child_ids: child_ids,
            handover_receiver: handover_receiver,
            leave_file_ids: leave_file_ids,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/create',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onSaveLeave.propTypes = {
    accessToken: PropTypes.string.isRequired,
    leaveId: PropTypes.number.isRequired,
    action: PropTypes.oneOf(['send', 'cancel', 'delete']).isRequired,
    reasonRefuse: PropTypes.string,
};

export const onGetLeave = async ({ leave_id = null, accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            leave_id: leave_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/get_detail',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetLeave.propTypes = {
    accessToken: PropTypes.string.isRequired,
    leaveId: PropTypes.number.isRequired,
};

export const onGetLeaves = async ({
    accessToken = '',
    state = '',
    key = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            state: state,
            page: page,
            items_per_page: items_per_page,
        };
        if (key) {
            body.key = key;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/get_list',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetLeaves.propTypes = {
    accessToken: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
};

export const onUpdateLeave = async ({
    leave_id = 0,
    accessToken = '',
    handover_receiver = '',
    leave_file_ids = [],
    child_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            leave_id: leave_id,
            access_token: accessToken,
            handover_receiver: handover_receiver,
            leave_file_ids: leave_file_ids,
            child_ids: child_ids,
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/update',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res?.data);
                } else {
                    handleError(res?.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onUpdateLeave.propTypes = {
    accessToken: PropTypes.string.isRequired,
    leave_id: PropTypes.number.isRequired,
    handover_receiver: PropTypes.string,
    leave_file_ids: PropTypes.arrayOf(PropTypes.any),
    child_ids: PropTypes.arrayOf(PropTypes.any),
};

export const onGetLines = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
    employeeId = 0,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            employee_id: employeeId,
            from_date: fromDate,
            to_date: toDate,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/timesheet/leave/lines',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetLines.propTypes = {
    accessToken: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    employeeId: PropTypes.number.isRequired,
};

export const onGetTypeLeaves = async ({ accessToken = '', group_id = null }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            group_id: group_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/get_leave_type',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetTypeLeaves.propTypes = {
    accessToken: PropTypes.string.isRequired,
    group_id: PropTypes.number.isRequired,
};

export const onGetGroupTypeLeaves = async ({ accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/get_leave_type_group',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetGroupTypeLeaves.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetRemainLeave = async ({
    accessToken = '',
    leave_type_id = null,
    from_datetime = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            leave_type_id: leave_type_id,
            from_datetime: from_datetime,
        };
        let options = {
            method: 'POST',
            body: body,
        };
        HTTP.post(
            '/leave/get_remain_leave',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetRemainLeave.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const leavesAction = async ({
    id = '',
    accessToken = '',
    action = '',
    reason = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: id,
            action: action,
        };
        if (reason) {
            body.reason = reason;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/leave/action',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });
