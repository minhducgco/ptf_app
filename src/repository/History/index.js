/******************************************
 *  Author      : HaiHoang
 *  Created On  : Sun Jul 27 2020
 *  File        : index.js
 *  Description : getAPI History
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '../../configs/HTTP';

export const getHistory = async ({ model = '', access_Token, number }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            model: model,
            access_token: access_Token,
            number: number
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_histories',
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

getHistory.propTypes = {
    key: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
};
