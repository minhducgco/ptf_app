/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : Stationery.js
 *  Description : chuyển phát nhanh
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onCreateExpressDelivery = async ({
    accessToken,
    employeeId,
    dateRegisterExpress,
    senderName,
    senderAddress,
    senderPhone,
    recipientLineIds,
    note,
    contentExpress,
    action_send,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            employee_id: employeeId,
            date_register_express: dateRegisterExpress,
            sender_name: senderName,
            sender_address: senderAddress,
            sender_phone: senderPhone,
            recipient_line_ids: recipientLineIds,
            note: note,
            content_express: contentExpress,
        };
        if (action_send) {
            body.action_send = true;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/express_delivery/create',
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

onCreateExpressDelivery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    employeeId: PropTypes.number.isRequired,
    dateRegisterExpress: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    senderAddress: PropTypes.string.isRequired,
    senderPhone: PropTypes.string.isRequired,
    recipientLineIds: PropTypes.array.isRequired,
    note: PropTypes.string,
    contentExpress: PropTypes.string,
    action_send: PropTypes.string,
};

export const onUpdateExpressDelivery = async ({
    accessToken,
    expressDeliveryId,
    employeeId,
    dateRegisterExpress,
    senderName,
    senderAddress,
    senderPhone,
    recipientLineIds,
    note,
    contentExpress,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            express_delivery_id: expressDeliveryId,
            employee_id: employeeId,
        };
        if (dateRegisterExpress) {
            body.date_register_express = dateRegisterExpress;
        }
        if (senderName) {
            body.sender_name = senderName;
        }
        if (recipientLineIds) {
            body.recipient_line_ids = recipientLineIds;
        }
        if (senderAddress) {
            body.sender_address = senderAddress;
        }
        if (senderPhone) {
            body.sender_phone = senderPhone;
        }
        if (note) {
            body.note = note;
        }
        if (contentExpress) {
            body.content_express = contentExpress;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/express_delivery/update',
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

onUpdateExpressDelivery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    expressDeliveryId: PropTypes.number.isRequired,
    employeeId: PropTypes.number,
    dateRegisterExpress: PropTypes.string,
    senderName: PropTypes.string,
    senderAddress: PropTypes.string,
    senderPhone: PropTypes.string,
    recipientLineIds: PropTypes.array,
    note: PropTypes.string,
    contentExpress: PropTypes.string,
};

export const onGetExpressDeliveryData = async ({
    accessToken,
    state,
    fromDate,
    toDate,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            state: state,
        };

        if (fromDate) {
            body = { ...body, from_date: fromDate };
        }
        if (toDate) {
            body = { ...body, to_date: toDate };
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/express_deliveries',
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

onGetExpressDeliveryData.propTypes = {
    accessToken: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
};

export const onGetExpressDelivery = async ({
    accessToken,
    expressDeliveryId,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            express_delivery_id: expressDeliveryId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/express_delivery',
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

onCreateExpressDelivery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    expressDeliveryId: PropTypes.number.isRequired,
};

export const onActionExpressDelivery = async ({
    accessToken,
    expressDeliveryId,
    action,
    reason_deny,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            express_delivery_id: expressDeliveryId,
            action: action,
            reason_deny: reason_deny,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/express_delivery/action',
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

onActionExpressDelivery.propTypes = {
    accessToken: PropTypes.string.isRequired,
    expressDeliveryId: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
};
