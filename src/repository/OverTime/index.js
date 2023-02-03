import HTTP from '@configs/HTTP';

export const createOverTime = async ({
    accessToken,
    from_date,
    to_date,
    note,
    employee_ids,
    department_id,
    overtime_ids,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: from_date,
            to_date: to_date,
            note: note,
            employee_ids: employee_ids,
            department_id: department_id,
            overtime_ids: overtime_ids,
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/overtime/create',
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

export const editOverTime = async ({
    id,
    accessToken,
    from_date,
    to_date,
    note,
    employee_ids,
    department_id,
    overtime_ids,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id,
            access_token: accessToken,
            from_date: from_date,
            to_date: to_date,
            note: note,
            employee_ids: employee_ids,
            department_id: department_id,
            overtime_ids: overtime_ids,
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/overtime/update',
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
export const onActionOvertime = async ({
    accessToken = '',
    id = null,
    action = '',
    reason = '',
    lineId = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            action,
        };
        if (reason) {
            body.reason = reason;
        }
        if (id) {
            body.id = id;
        }
        if (lineId) {
            body.line_id = lineId;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log('body', JSON.stringify(body));
        HTTP.post(
            '/overtime/action',
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
export const onGetOvertime = async ({ id = 0, accessToken = '' }) =>
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
            '/overtime/detail',
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

export const onGetListOvertimes = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
    state = '',
    code = '',
    value = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: fromDate,
            to_date: toDate,
        };
        if (state) {
            body.state = state;
        }
        if (code) {
            body.code = code;
        }
        if (value) {
            body.value = value;
        }
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/overtime',
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
