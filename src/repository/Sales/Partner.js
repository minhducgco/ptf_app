import HTTP from '@configs/HTTP';
export const onGetListPartner = async ({
    page = 0,
    items_per_page = 10,
    access_token = '',
    code = '',
    value = '',
    name = '',
    phone = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            page: page,
            items_per_page: items_per_page,
            access_token: access_token,
            name: name,
            phone: phone,
        };
        if (code && value) {
            body.code = code;
            body.value = value;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Token': accessToken,
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
export const onGetDetailPartner = async ({ id = 0, access_token = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: id,
            access_token: access_token,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Token': accessToken,
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/res_partner/detail',
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
export const onCreatePartner = async ({
    access_token = '',
    name = '',
    phone = '',
    mobile = '',
    email = '',
    street = '',
    website = '',
    x_hierarchy_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            name: name,
            phone: phone,
            email: email,
            street: street,
            website: website,
            x_hierarchy_id: x_hierarchy_id,
        };
        if (phone) {
            body.phone = phone;
        }
        if (email) {
            body.email = email;
        }
        if (street) {
            body.street = street;
        }
        if (website) {
            body.website = website;
        }
        if (x_hierarchy_id) {
            body.x_hierarchy_id = x_hierarchy_id;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/res_partner/create',
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
export const onUpdatePartner = async ({
    access_token = '',
    id = null,
    name = '',
    street2 = '',
    vat = '',
    user_id = null,
    phone = '',
    mobile = '',
    email = '',
    website,
    x_join_date = '',
    address_delivery_ids = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            name: name,
        };
        if (id) {
            body.id = id;
        }
        if (street2) {
            body.street2 = street2;
        }
        if (vat) {
            body.vat = vat;
        }
        if (user_id) {
            body.user_id = user_id;
        }
        if (phone) {
            body.phone = phone;
        }
        if (mobile) {
            body.mobile = mobile;
        }
        if (email) {
            body.email = email;
        }
        if (website) {
            body.website = website;
        }
        if (x_join_date) {
            body.x_join_date = x_join_date;
        }

        if (address_delivery_ids) {
            body.address_delivery_ids = address_delivery_ids;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/res_partner/update',
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

export const onGetPartnerOrder = async ({ access_token = '' }) =>
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
            '/res_partner_order',
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
