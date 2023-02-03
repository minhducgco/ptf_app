/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 05 2020
 *  File        : index.js
 *  Description : Các hàm lấy dữ liệu Nhân viên từ server qua API.
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getInformationEmployee = async ({ userId, accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            user_id: userId,
            access_token: accessToken,
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
            '/employee/information',
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
                console.log('err info', err);
            },
        );
    });

getInformationEmployee.propTypes = {
    userId: PropTypes.number.isRequired,
    employeeId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
};

export const getRecentActivity = async ({ accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            type: 'all',
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/activity/recent_activity',
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

getRecentActivity.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getUtmCampaign = async ({ accessToken }) =>
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
            '/utm_campaign',
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
export const getListEmployee = async ({ accessToken }) =>
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
            '/list_employee',
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
