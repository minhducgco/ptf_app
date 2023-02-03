import HTTP from '@configs/HTTP';
export const onGetListPolicy = async ({
    access_token = '',
    res_hierarchy_id = null,
    brand_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            res_hierarchy_id: res_hierarchy_id,
            brand_id: brand_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/policy',
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
export const onTracking = async ({ access_token = '', id = null }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
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
            '/policy/tracking',
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
