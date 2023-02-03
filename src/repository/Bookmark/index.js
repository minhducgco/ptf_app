/******************************************
 *  Author      : HaiHoang
 *  Created On  : 12/11/2020
 *  File        : index.js
 *  Description : getAPI BookMark
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '../../configs/HTTP';

export const getMarkFavorite = async ({ access_token, model, id }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            model: model,
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
            '/website/blog/mark_favorite',
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

getMarkFavorite.propTypes = {
    access_toke: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
