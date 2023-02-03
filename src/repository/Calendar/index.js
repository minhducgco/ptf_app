import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onCreateCalendar = async ({
    accessToken = '',
    name = '',
    allday,
    start_date = '',
    stop_date = '',
    x_user_ids = [],
    description = '',
    start_datetime = '',
    duration = 0,
    location = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            name,
            location,
            allday,
        };
        if (allday) {
            body.start_date = start_date;
            body.stop_date = stop_date;
        } else {
            body.start_datetime = start_datetime;
            body.duration = duration;
        }
        if (description) {
            body.description = description;
        }
        if (x_user_ids.length > 0) {
            body.x_user_ids = x_user_ids;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log(
            '🚀 ~ file: index.js ~ line 40 ~ newPromise ~ JSON.stringify(body)',
            JSON.stringify(body),
        );
        HTTP.post(
            '/calendar/create',
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

export const onGetTotalCalenders = async ({ accessToken = '', month = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            month: month,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/calendar/main',
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

onGetTotalCalenders.propTypes = {
    accessToken: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
};

export const onGetCalenders = async ({
    accessToken = '',
    state = '',
    code = '',
    value = '',
    page = null,
    items_per_page = null,
    type = '',
    start = '',
    stop = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            state: state,
            access_token: accessToken,
            items_per_page: items_per_page,
            start: start,
            stop: stop,
            type: type,
        };
        if (value) {
            body.value = value;
            body.code = code;
        }
        if (page) {
            body.page = page;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/calendar/list',
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

onGetCalenders.propTypes = {
    accessToken: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
};

export const onGetCalender = async ({ accessToken = '', id = null }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/calendar/detail',
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

onGetCalender.propTypes = {
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export const onActionCalender = async ({
    accessToken = '',
    id = null,
    action = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: id,
            action: action,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/calendar/action',
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

onActionCalender.propTypes = {
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
};

export const onUpdateCalendar = async ({
    accessToken = '',
    name = '',
    allday,
    start_date = '',
    stop_date = '',
    x_user_ids = [],
    description = '',
    start_datetime = '',
    duration = 0,
    location = '',
    id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            name,
            location,
            allday,
            id: id,
        };
        if (allday) {
            body.start_date = start_date;
            body.stop_date = stop_date;
        } else {
            body.start_datetime = start_datetime;
            body.duration = duration;
        }
        if (description) {
            body.description = description;
        }
        if (x_user_ids.length > 0) {
            body.x_user_ids = x_user_ids;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log(
            '🚀 ~ file: index.js ~ line 40 ~ newPromise ~ JSON.stringify(body)',
            JSON.stringify(body),
        );
        HTTP.post(
            '/calendar/write',
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

onUpdateCalendar.propTypes = {
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    stop_date: PropTypes.string.isRequired,
};
