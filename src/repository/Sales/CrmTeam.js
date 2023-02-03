import HTTP from '@configs/HTTP';

export const onGetListTeamId = async ({ accessToken = '' }) =>
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
        // console.log(JSON.stringify(body, 2, 0));
        HTTP.post(
            '/crm_team',
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
