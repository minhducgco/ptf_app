/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 05 2020
 *  File        : index.js
 *  Description : Get contacts
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';
export const getContacts = async ({
    page = null,
    accessToken = '',
    items_per_page = null,
    code = 'name',
    value = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            items_per_page: items_per_page,
            page: page,
            access_token: accessToken,
            code: code,
            value: value,
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
            '/employee/contact',
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

getContacts.propTypes = {
    items_per_page: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
