import HTTP from '@configs/HTTP';

export const onGetSalesTarget = async ({
    access_token = '',
    type = '',
    month_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
        };
        if (type) {
            body.type = type;
        }
        if (month_id) {
            body.month_id = month_id;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/sale_target_team',
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

export const onGetSalesTargetBrand = async ({
    access_token = '',
    sale_target_id = null,
    type = '',
    month_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
        };
        if (sale_target_id) {
            body.sale_target_id = sale_target_id;
        }
        if (type) {
            body.type = type;
        }
        if (month_id) {
            body.month_id = month_id;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/sale_target/brand',
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

export const onGetSalesTargetTeam = async ({
    access_token = '',
    type = '',
    user_id = null,

    month_id = null,
    detail_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
        };
        if (type) {
            body.type = type;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        if (month_id) {
            body.month_id = month_id;
        }
        if (detail_id) {
            body.detail_id = detail_id;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/sale_target/team',
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

export const onGetMonth = async ({ access_token = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
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
            '/month',
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

export const onGetTargetUser = async ({
    access_token = '',
    type = '',
    month_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
        };
        if (type) {
            body.type = type;
        }
        if (month_id) {
            body.month_id = month_id;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/sale_target/user',
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
