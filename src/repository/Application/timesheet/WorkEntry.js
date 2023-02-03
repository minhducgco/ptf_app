import HTTP from '@configs/HTTP';
import PropTypes from 'prop-types';

export const onCreateWorkEntry = async ({
    accessToken = '',
    workEntryId = 0,
    hourFrom = 0,
    hourTo = 0,
    note = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: workEntryId,
            access_token: accessToken,
            hour_from: hourFrom,
            hour_to: hourTo,
            note,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/hr_work_entry/update',
            options,
            (res) => {
                if (res.data && res.code === 200) {
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

onCreateWorkEntry.propTypes = {
    accessToken: PropTypes.string.isRequired,
    workEntryId: PropTypes.number.isRequired,
    hourFrom: PropTypes.number,
    hourTo: PropTypes.number,
    note: PropTypes.string.isRequired,
};

export const onActionWorkEntry = async ({
    id = 0,
    action = '',
    reason = '',
    accessToken = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id,
            action,
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
        console.log(
            '🚀 ~ file: WorkEntry.js ~ line 114 ~ newPromise ~ JSON.stringify(body)',
            JSON.stringify(body),
        );
        HTTP.post(
            '/hr_work_entry/action',
            options,
            (res) => {
                if (res.data && res.code === 200) {
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

onActionWorkEntry.propTypes = {
    accessToken: PropTypes.string.isRequired,
    workEntryId: PropTypes.number.isRequired,
    action: PropTypes.oneOf(['confirm', 'refuse']).isRequired,
    reasonRefuse: PropTypes.string,
};

export const onGetWorkEntries = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: fromDate,
            to_date: toDate,
        };
        // console.log('onGetWorkEntries params', body);
        let options = {
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/hr_work_entry',
            options,
            (res) => {
                if (res.code === 200) {
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

onGetWorkEntries.propTypes = {
    accessToken: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
};

export const onGetWorkEntry = async ({ workEntryId = 0, accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: workEntryId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log('🚀 ~ file: WorkEntry.js ', JSON.stringify(body));
        HTTP.post(
            '/hr_work_entry/detail',
            options,
            (res) => {
                if (res.code === 200) {
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

onGetWorkEntry.propTypes = {
    accessToken: PropTypes.string.isRequired,
    workEntryId: PropTypes.number.isRequired,
};
