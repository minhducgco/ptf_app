/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : Stationery.js
 *  Description : Văn phòng phẩm
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getStationeries = async ({
    accessToken = '',
    state = '',
    code = '',
    value = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            state: state,
            access_token: accessToken,
            page: page,
            items_per_page: items_per_page,
        };
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
        HTTP.post(
            '/stationery/register/list',
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

getStationeries.propTypes = {
    value: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
};

export const onGetStationery = async ({ accessToken = '', id = null }) =>
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
            '/stationery/register/detail',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err.message);
            },
        );
    });

onGetStationery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    registerStationeryId: PropTypes.number.isRequired,
};

export const onGetStationeryProduct = async ({ accessToken = '' }) =>
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
            '/stationery/list',
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

onGetStationeryProduct.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetStationeryCategories = async (accessToken) =>
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
            '/category/stationery_categories',
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

onGetStationeryCategories.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetCategoryUnits = async (accessToken) =>
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
            '/category/units',
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

onGetCategoryUnits.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onActionStationery = async ({
    accessToken = '',
    id = null,
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
            '/stationery/register/action',
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

onActionStationery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    registerStationeryId: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    reasonDeny: PropTypes.string,
};

export const onCreate = async ({
    accessToken = '',
    department_location_id = null,
    order_line1s = [],
    note = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            note,
            department_location_id: department_location_id,
            order_line1s: order_line1s,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/stationery/create',
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

onCreate.propTypes = {
    accessToken: PropTypes.string.isRequired,
    registerStationeryId: PropTypes.number,
    dateRegister: PropTypes.string,
    note: PropTypes.string,
    registerStationeryLineDelete: PropTypes.array,
    registerStationeryLineUpdate: PropTypes.array,
    orderList: PropTypes.array.isRequired,
};

export const onGetSynthesis = async ({
    accessToken = '',
    syntheticStationeryId = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            synthetic_stationery_id: syntheticStationeryId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/stationery/get_synthetic',
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

onGetSynthesis.propTypes = {
    accessToken: PropTypes.string.isRequired,
    syntheticStationeryId: PropTypes.number.isRequired,
};

export const onUpdate = async ({
    accessToken = '',
    department_location_id = null,
    order_line1s = [],
    order_line2s = [],
    note = '',
    id = null,
    state,
    action,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body =
            state === 'draft'
                ? {
                      access_token: accessToken,
                      note,
                      department_location_id: department_location_id,
                      order_line1s: order_line1s,
                      id: id,
                  }
                : {
                      access_token: accessToken,
                      order_line2s: order_line2s,
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
            '/stationery/register/write',
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

onUpdate.propTypes = {
    accessToken: PropTypes.string.isRequired,
    registerStationeryId: PropTypes.number,
    dateRegister: PropTypes.string,
    note: PropTypes.string,
    registerStationeryLineDelete: PropTypes.array,
    registerStationeryLineUpdate: PropTypes.array,
    orderList: PropTypes.array.isRequired,
};

export const onGetLocation = async ({ accessToken = '' }) =>
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
            '/stationery/location/list',
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

onGetLocation.propTypes = {
    accessToken: PropTypes.string.isRequired,
    syntheticStationeryId: PropTypes.number.isRequired,
};

export const onGetSynthetic = async ({ accessToken = '', id = null }) =>
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
            '/stationery/synthetic/detail',
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

onGetSynthetic.propTypes = {
    accessToken: PropTypes.string.isRequired,
    syntheticStationeryId: PropTypes.number.isRequired,
};

export const onActionSynthetic = async ({
    accessToken = '',
    id = null,
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
            '/stationery/synthetic/action',
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

onActionSynthetic.propTypes = {
    accessToken: PropTypes.string.isRequired,
    syntheticStationeryId: PropTypes.number.isRequired,
};
