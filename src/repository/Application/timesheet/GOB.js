/******************************************
 *  Author      : HoiHD
 *  Created On  : Tue Aug 18 2020
 *  File        : GOB.js
 *  Description : Điều động công tác
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getGoingOnBusiness = async ({
    goingOnBusinessId = 0,
    accessToken = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            going_on_business_id: goingOnBusinessId,
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
            '/timesheet/going_on_business/get_going_on_business',
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

getGoingOnBusiness.propTypes = {
    goingOnBusinessId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
};
