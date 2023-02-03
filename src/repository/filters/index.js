/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 26 2020
 *  File        : index.js
 *  Description :
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '../../configs/HTTP';

export const getFilters = async ({ key = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            key: key,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/filters',
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

getFilters.propTypes = {
    key: PropTypes.string.isRequired,
};
