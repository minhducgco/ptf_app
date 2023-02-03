import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getPayrolls = async ({ accessToken, id }) =>
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
        console.log(body);
        HTTP.post(
            '/get_payrolls',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getPayrolls.propTypes = {
    access_token: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export const getPayroll = async ({ accessToken, id }) =>
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
            '/get_payroll',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data);
                } else {
                    handleError(res);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getPayroll.propTypes = {
    access_token: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
