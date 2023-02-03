/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : BookingCar.js
 *  Description : Hành chính
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onGetBusTypes = async ({ accessToken = '' }) =>
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
            '/category/bus_types',
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

onGetBusTypes.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetCarOrders = async ({
    accessToken = '',
    dateDeparture = '',
    dateBack = '',
    state = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            date_departure: dateDeparture,
            date_back: dateBack,
            state,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/car_orders',
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

onGetCarOrders.propTypes = {
    accessToken: PropTypes.string.isRequired,
    dateDeparture: PropTypes.string,
    dateBack: PropTypes.string,
    state: PropTypes.string.isRequired,
};

export const onGetCarOrder = async ({
    accessToken = '',
    shuttleBusId = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            shuttle_bus_id: shuttleBusId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/car_order',
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

onGetCarOrder.propTypes = {
    accessToken: PropTypes.string.isRequired,
    shuttleBusId: PropTypes.number.isRequired,
};

export const onActionCarOrder = async ({
    accessToken = '',
    shuttleBusId = null,
    action = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            shuttle_bus_id: shuttleBusId,
            action,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/shuttle_bus/action',
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

onActionCarOrder.propTypes = {
    accessToken: PropTypes.string.isRequired,
    shuttleBusId: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
};

export const onCreateCarOrder = async ({
    accessToken,
    employeeId,
    accompanyIds,
    companionIds,
    lineIds,
    purpose,
    descriptionRoute,
    note,
    actionSend,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            employee_id: employeeId,
            accompany_ids: accompanyIds,
            purpose: purpose,
            line_ids: lineIds,
        };
        if (actionSend) {
            body.action_send = true;
        }
        if (companionIds) {
            body.companion_ids = companionIds;
        }
        if (note) {
            body.note = note;
        }
        if (descriptionRoute) {
            body.description_route = descriptionRoute;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/shuttle_bus/create',
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

onCreateCarOrder.propTypes = {
    accessToken: PropTypes.string.isRequired,
    employeeId: PropTypes.number.isRequired,
    accompanyIds: PropTypes.arrayOf(PropTypes.object).isRequired,
    companionIds: PropTypes.string,
    purpose: PropTypes.string.isRequired,
    lineIds: PropTypes.array.isRequired,
    descriptionRoute: PropTypes.string,
    note: PropTypes.string,
};

export const onUpdateCarOrder = async ({
    accessToken,
    employeeId,
    accompanyIds,
    companionIds,
    shuttleBusId,
    purpose,
    LineIds,
    descriptionRoute,
    note,
    apiType,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            shuttle_bus_id: shuttleBusId,
            line_ids: LineIds,
        };
        if (employeeId) {
            body.employee_id = employeeId;
        }
        if (accompanyIds) {
            body.accompany_ids = accompanyIds;
        }
        if (companionIds) {
            body.companion_ids = companionIds;
        }
        if (purpose) {
            body.purpose = purpose;
        }
        if (descriptionRoute) {
            body.description_route = descriptionRoute;
        }
        if (note) {
            body.note = note;
        }
        if (apiType) {
            body.api_type = apiType;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/shuttle_bus/update',
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

onUpdateCarOrder.propTypes = {
    accessToken: PropTypes.string.isRequired,
    shuttleBusId: PropTypes.number.isRequired,
    employeeId: PropTypes.number.isRequired,
    accompanyIds: PropTypes.arrayOf(PropTypes.object).isRequired,
    companionIds: PropTypes.string,
    numberOfPeople: PropTypes.number.isRequired,
    purpose: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    dateDeparture: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    dateBack: PropTypes.string.isRequired,
    hasDriver: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    descriptionRoute: PropTypes.string,
    note: PropTypes.string,
    driverName: PropTypes.string,
    driverPhone: PropTypes.string,
    vehiclePlate: PropTypes.string,
    vehicleColor: PropTypes.string,
    vehicleModel: PropTypes.string,
};
