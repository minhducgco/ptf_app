import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getSalesTeams = async ({ accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = { access_token: accessToken };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/crm_team',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

getSalesTeams.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getEmployees = async ({ accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = { access_token: accessToken };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/employee',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

getEmployees.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getBrands = async ({ accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        let body = { access_token: accessToken };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/res_brand',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

getBrands.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const createSalesTeams = async ({
    accessToken = '',
    name = '',
    x_code = '',
    user_id = null,
    x_brand_id = null,
    company_id = null,
    member_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            name: name,
            x_code: x_code,
        };
        if (user_id) {
            body.user_id = user_id;
        }
        if (x_brand_id) {
            body.x_brand_id = x_brand_id;
        }
        if (company_id) {
            body.company_id = company_id;
        }
        if (member_ids.length > 0) {
            body.member_ids = member_ids;
        }
        console.log(body);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/crm_team/create',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

createSalesTeams.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getSalesTeam = async ({ accessToken = '', id = null }) =>
    new Promise((handleSuccess, handleError) => {
        let body = { access_token: accessToken, id: id };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/crm_team/detail',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

getSalesTeam.propTypes = {
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export const updateSalesTeams = async ({
    accessToken = '',
    id = null,
    name = '',
    x_code = '',
    user_id = null,
    x_brand_id = null,
    company_id = null,
    member_ids = [],
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            name: name,
            x_code: x_code,
            id: id,
        };
        if (user_id) {
            body.user_id = user_id;
        }
        if (x_brand_id) {
            body.x_brand_id = x_brand_id;
        }
        if (company_id) {
            body.company_id = company_id;
        }
        if (member_ids.length > 0) {
            body.member_ids = member_ids;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/crm_team/update',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
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

updateSalesTeams.propTypes = {
    accessToken: PropTypes.string.isRequired,
};
