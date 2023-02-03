import HTTP from '@configs/HTTP';
export const onGetListApproves = async ({
    accessToken = '',
    key = '',
    items_per_page = 15,
    page = null,
    code = '',
    value = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            key: key,
        };
        if (page) {
            body.page = page;
        }
        if (items_per_page) {
            body.items_per_page = items_per_page;
        }
        if (code) {
            body.code = code;
        }
        if (value) {
            body.value = value;
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
            '/approvals',
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

export const onGetDetailApprove = async ({ accessToken = '', id = null }) =>
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
            '/approvals/detail',
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

export const onActionApproval = async ({
    accessToken = '',
    id = null,
    action = '',
    note = '',
    refuse_reason = '',
    user_id = null,
    cancel_reason = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: id,
            action: action,
        };
        if (note) {
            body.note = note;
        }
        if (refuse_reason) {
            body.refuse_reason = refuse_reason;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        if (cancel_reason) {
            body.cancel_reason = cancel_reason;
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log('body action', JSON.stringify(body));
        HTTP.post(
            '/approvals/action',
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

export const onListApprover = async ({ accessToken = '' }) =>
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
            '/approvals/approver',
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
export const onListCategory = async ({ accessToken = '' }) =>
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
            '/approvals/categories',
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

export const onListTags = async ({ accessToken = '' }) =>
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
            '/approvals/tags',
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

export const onCreateApprover = async ({
    accessToken = '',
    name = '',
    category_id = null,
    tag_ids = [],
    reason = '',
    approver_ids = [],
    follower_ids = [],
    attachment_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            name: name,
            category_id: category_id,
        };
        if (tag_ids) {
            body.tag_ids = tag_ids;
        }
        if (reason) {
            body.reason = reason;
        }
        if (approver_ids) {
            body.approver_ids = approver_ids;
        }
        if (follower_ids) {
            body.follower_ids = follower_ids;
        }
        if (attachment_ids) {
            body.attachment_ids = attachment_ids;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/approvals/create',
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
                console.log('err', err);
            },
        );
    });
export const onUpdateApprover = async ({
    accessToken = '',
    id = null,
    name = '',
    category_id = null,
    tag_ids = [],
    reason = '',
    approver_ids = [],
    follower_ids = [],
    attachment_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: id,
            name: name,
            category_id: category_id,
            tag_ids: tag_ids,
            approver_ids: approver_ids,
            follower_ids: follower_ids,
            attachment_ids: attachment_ids,
        };
        if (reason) {
            body.reason = reason;
        }
        // console.log(JSON.stringify(body, null, 2));
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, null, 2));
        HTTP.post(
            '/approvals/update',
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
                console.log('err', err);
            },
        );
    });
