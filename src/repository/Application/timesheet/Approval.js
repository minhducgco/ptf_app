/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 26 2020
 *  File        : Approval.js
 *  Description : Phê duyệt
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onActionApproval = async ({
    accessToken = '',
    model = '',
    id = 0,
    action = '',
    reasonRefuse = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            id: id,
            model: model,
            action: action,
            access_token: accessToken,
            reason_refuse: reasonRefuse,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/approval/action',
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

onActionApproval.propTypes = {
    accessToken: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
    reasonRefuse: PropTypes.string,
};

export const onGetApprovals = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
    type = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: fromDate,
            to_date: toDate,
            type,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log(JSON.stringify(body));
        HTTP.post(
            '/approval/get_approvals',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetApprovals.propTypes = {
    accessToken: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export const onGetApproved = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
    type = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: fromDate,
            to_date: toDate,
            type,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        // console.log('body', JSON.stringify(body));
        HTTP.post(
            '/approval/get_approved',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

onGetApproved.propTypes = {
    accessToken: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
