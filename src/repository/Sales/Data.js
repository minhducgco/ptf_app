import HTTP from '@configs/HTTP';

export const onGetListData = async ({
    type = '',
    access_token = '',
    page = 1,
    items_per_page = 15,
    code = '',
    value = '',
    stateId = null,
    name = '',
    phone = '',
    email = '',
    website = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            type: type,
            access_token: access_token,
            page: page,
            items_per_page: items_per_page,
            name: name,
            phone: phone,
            email: email,
            website: website,
        };
        if (code && value) {
            body.code = code;
            body.value = value;
        }
        if (stateId && stateId !== 0) {
            body.state_id = stateId;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/lead',
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
export const onGetDetailData = async ({ id = 0, access_token = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: id,
            access_token: access_token,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };
        HTTP.post(
            'lead/detail',
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
export const onUpdateDataData = async ({
    access_token = '',
    id = null,
    name = '',
    x_brand_id = null,
    email_from = '',
    street = '',
    website = '',
    phone = '',
    x_hierarchy_id = null,
    x_user_id = null,
    user_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            id: id,
            name: name,
            x_brand_id: x_brand_id,
            email_from: email_from,
            street: street,
            website: website,
            phone: phone,
            x_user_id: x_user_id,
            user_id: user_id,
        };
        if (name) {
            body.name = name;
        }
        if (x_brand_id) {
            body.x_brand_id = x_brand_id;
        }
        if (email_from) {
            body.email_from = email_from;
        }
        if (street) {
            body.street = street;
        }
        if (website) {
            body.website = website;
        }
        if (phone) {
            body.phone = phone;
        }
        if (x_user_id) {
            body.x_user_id = x_user_id;
        }
        if (x_hierarchy_id) {
            body.x_hierarchy_id = x_hierarchy_id;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            'lead/update',
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
export const onUpdateState = async ({
    access_token = '',
    id = 0,
    stage_id = 0,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            id: id,
            stage_id: stage_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/lead/update_sate',
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
export const onUpdateAction = async ({
    access_token = '',
    id = null,
    action = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
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
            '/lead/action',
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
export const getListState = async ({ accessToken = '', type = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            type,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/state_filter',
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

export const onCreateWork = async ({
    access_token = '',
    res_id = null,
    activity_type_id = null,
    user_id = null,
    x_date_deadline = '',
    summary = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            res_id: res_id,
        };
        if (activity_type_id) {
            body.activity_type_id = activity_type_id;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        if (x_date_deadline) {
            body.x_date_deadline = x_date_deadline;
        }
        if (summary) {
            body.summary = summary;
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
            '/mail_activity/create',
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
export const onActionWork = async ({
    access_token = '',
    id = null,
    action = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            action: action,
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
            '/mail_activity/action',
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
export const onActivityType = async ({ access_token = '', type = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            type: type,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/activity_type',
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

export const onGetListWork = async ({ access_token = '', res_id = null }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            res_id: res_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/mail_activity',
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
export const onUpdateWork = async ({
    access_token = '',
    id = null,
    summary = '',
    x_date_deadline = '',
    activity_type_id = null,
    user_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            id: id,
            user_id: user_id,
            x_date_deadline: x_date_deadline,
            activity_type_id: activity_type_id,
            summary: summary,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/mail_activity/update',
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
