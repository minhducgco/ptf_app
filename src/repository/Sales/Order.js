import HTTP from '@configs/HTTP';

export const onGetListOrderLine = async ({
    page = 1,
    accessToken = '',
    items_per_page = 10,
    stageId = '',
    code = '',
    value = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            page: page,
            items_per_page: items_per_page,
            stage_id: stageId,
        };
        if (code && value) {
            body.code = code;
            body.value = value;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/purchase_order',
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
export const onGetDetailOrderLine = async ({ accessToken = '', id = null }) =>
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
            '/purchase_order/detail',
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
export const onCreateOrderLine = async ({
    accessToken = '',
    partner_id = null,
    x_brand_id = null,
    order_line = [],
    x_type_payment_id = null,
    x_user_sale_id = null,
    notes = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            order_line: order_line,
        };

        if (partner_id) {
            body.partner_id = partner_id;
        }
        if (x_brand_id) {
            body.x_brand_id = x_brand_id;
        }
        if (x_type_payment_id) {
            body.x_type_payment_id = x_type_payment_id;
        }
        if (x_user_sale_id) {
            body.x_user_sale_id = x_user_sale_id;
        }
        if (notes) {
            body.notes = notes;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/purchase_order/create',
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
export const getListStage = async ({ accessToken = '' }) =>
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
            '/stage_order',
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

export const onAction = async ({ access_token = '', id = null, action = '' }) =>
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
            '/purchase_order/action',
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

export const getInformation = async ({ access_token = '' }) =>
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
        HTTP.post(
            '/purchase_order/init',
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
export const handleEditPurchaseOrder = async ({
    id,
    accessToken,
    x_type_payment_id,
    x_brand_id,
    x_user_sale_id,
    order_line,
    notes,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: id,
            access_token: accessToken,
        };
        if (x_type_payment_id) {
            body.x_type_payment_id = x_type_payment_id;
        }
        if (x_user_sale_id) {
            body.x_user_sale_id = x_user_sale_id;
        }
        if (order_line) {
            const arrFormat = order_line.map((it) => {
                if (it.isEdit) {
                    return { ...it, id: null };
                } else {
                    return it;
                }
            });
            body.order_line = arrFormat;
        }
        if (x_brand_id) {
            body.x_brand_id = x_brand_id;
        }
        if (notes) {
            body.notes = notes;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/purchase_order/update',
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
