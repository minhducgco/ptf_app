import HTTP from '@configs/HTTP';

export const onGetListPartner = async ({
    accessToken = '',
    items_per_page = 15,
    page = 1,
    code = '',
    value = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            page: page,
            items_per_page: items_per_page,
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
            '/res_partner',
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

export const onGetListEmployee = async ({ accessToken = '', name = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
        };
        if (name) {
            body.name = name;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, 2, 0));
        HTTP.post(
            '/employee',
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

export const onGetListBrand = async ({ accessToken = '' }) =>
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
            '/res_brand',
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

export const onGetListStockWarehouse = async ({ accessToken = '' }) =>
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
            '/stock_warehouse',
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

export const onGetListProduct = async ({
    accessToken = '',
    partner_id = 0,
    name = '',
    itemsPerPage = 15,
    page = 1,
    x_brand_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            partner_id,
            name,
            items_per_page: itemsPerPage,
            page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/products',
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

export const onGetListTypePayment = async ({ accessToken = '' }) =>
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
            '/type_payment',
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

export const handleCreateOrder = async ({
    accessToken,
    partner_id,
    date_order,
    warehouse_id,
    x_type_payment_id,
    x_brand_id,
    user_id,
    order_line,
    x_address_delivery_id,
    x_month_transaction,
    note,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            partner_id,
            date_order,
            warehouse_id,
            x_type_payment_id,
            x_brand_id,
            user_id,
            order_line,
            x_address_delivery_id,
            x_month_transaction,
        };
        if (note) {
            body.note = note;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log('TCL: JSON.stringify(body)', JSON.stringify(body, null, 2));
        HTTP.post(
            '/sale_order/create',
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
export const handleEditOrder = async ({
    id,
    accessToken,
    partner_id,
    date_order,
    x_type_payment_id,
    x_brand_id,
    warehouse_id,
    user_id,
    order_line,
    x_address_delivery_id,
    x_month_transaction,
    note,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: id,
            access_token: accessToken,
            x_month_transaction,
        };
        if (partner_id) {
            body.partner_id = partner_id;
        }
        if (date_order) {
            body.date_order = date_order;
        }
        if (x_type_payment_id) {
            body.x_type_payment_id = x_type_payment_id;
        }
        if (warehouse_id) {
            body.warehouse_id = warehouse_id;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        if (x_address_delivery_id) {
            body.x_address_delivery_id = x_address_delivery_id;
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
        if (note) {
            body.note = note;
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
            '/sale_order/update',
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

export const onGetListHierarchy = async ({ accessToken = '' }) =>
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
        // console.log(JSON.stringify(body, 2, 0));
        HTTP.post(
            '/res_hierarchy',
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
export const onGetListAddress = async ({ accessToken = '', partnerId }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            partner_id: partnerId,
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body, 2, 0));
        HTTP.post(
            '/res_partner/address',
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
