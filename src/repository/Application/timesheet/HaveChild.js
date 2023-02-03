/******************************************
 *  Author : HoiHD
 *  Created On : Fri Jul 17 2020
 *  File : HaveChild.js
 *  Description: Thêm, sửa, xóa, lấy thông tin, phê duyệt đơn xin chế độ con nhỏ
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onCreateHaveChild = async ({
    employeeId = 0,
    accessToken = '',
    type = '',
    fromDate = '',
    toDate = '',
    nameChild = '',
    birthdayChild = '',
    note = '',
    actionSend,
    attachment = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            employee_id: employeeId,
            access_token: accessToken,
            type: type,
            from_date: fromDate,
            to_date: toDate,
            birthday_child: birthdayChild,
            name_child: nameChild,
            attachment: attachment,
            note: note,
            action_send: actionSend,
        };
        // if (actionSend) {
        //     body.action_send = actionSend;
        // }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/timesheet/have_child/create',
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

onCreateHaveChild.propTypes = {
    employeeId: PropTypes.number.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    birthdayChild: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['in_late', 'out_early']).isRequired,
    nameChild: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    attachments: PropTypes.string.isRequired,
};

export const onActionHaveChild = async ({
    accessToken = '',
    haveChildId = '',
    action = '',
    reasonRefuse = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            have_child_id: haveChildId,
            action: action,
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
            '/timesheet/have_child/action',
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

onActionHaveChild.propTypes = {
    accessToken: PropTypes.string.isRequired,
    haveChildId: PropTypes.number.isRequired,
    action: PropTypes.oneOf(['send', 'cancel', 'delete']).isRequired,
    reasonRefuse: PropTypes.string,
};

export const onGetHaveChild = async ({ haveChildId = 0, accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            have_child_id: haveChildId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/timesheet/have_child/get_have_child',
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

onGetHaveChild.propTypes = {
    accessToken: PropTypes.string.isRequired,
    haveChildId: PropTypes.number.isRequired,
};

export const onGetHaveChildren = async ({
    accessToken = '',
    fromDate = '',
    toDate = '',
    state = 'all',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            from_date: fromDate,
            to_date: toDate,
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
            '/timesheet/have_child/get_have_childs',
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

onGetHaveChildren.propTypes = {
    accessToken: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
};

export const onUpdateHaveChild = async ({
    accessToken = '',
    haveChildId = 0,
    employeeId = 0,
    type = '',
    fromDate = '',
    toDate = '',
    note = '',
    nameChild = '',
    birthdayChild = '',
    attachments = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            have_child_id: haveChildId,
            access_token: accessToken,
            employee_id: employeeId,
            type,
            from_date: fromDate,
            to_date: toDate,
            note: note,
            birthday_child: birthdayChild,
            name_child: nameChild,
            attachment: attachments,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/timesheet/have_child/update',
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

onUpdateHaveChild.propTypes = {
    haveChildId: PropTypes.number.isRequired,
    employeeId: PropTypes.number,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    type: PropTypes.oneOf(['in_late', 'out_early']),
    note: PropTypes.string,
};
