/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : Notification/index.js
 *  Description : Thông báo
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onGetNotificationNotifies = async ({ accessToken = '', page }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
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
            '/notification',
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

onGetNotificationNotifies.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onUpdateNotificationMarkMessage = async ({
    accessToken,
    messageId,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            id: messageId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/notification/mark_message',
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

onUpdateNotificationMarkMessage.propTypes = {
    accessToken: PropTypes.string.isRequired,
    messageId: PropTypes.number.isRequired,
};
export const onReadAllMessage = async ({ accessToken }) =>
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
            '/notification/mark_all_message',
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

onReadAllMessage.propTypes = {
    accessToken: PropTypes.string.isRequired,
};
