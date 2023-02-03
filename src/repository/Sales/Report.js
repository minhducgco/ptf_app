import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getTop10BestProduct = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/best_product',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getTop10BestProduct.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getTop10BestPartner = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
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
            '/best_partner',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getTop10BestPartner.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getTop10WorstProduct = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/worst_product',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getTop10WorstProduct.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getTop10WorstPartner = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/worst_partner',
            options,
            (res) => {
                if (res !== undefined && res.code === 200) {
                    handleSuccess(res.data.data);
                } else {
                    handleError(res.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getTop10WorstPartner.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getSalesReport = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/sale_report',
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

getSalesReport.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencyCost = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
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
            '/agency_cost',
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

getAgencyCost.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencyCostDetail = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
    product_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            product_id: product_id,
            page: page,
            items_per_page: items_per_page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/agency_cost_detail',
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

getAgencyCostDetail.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencyRevenue = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/agency_revenue',
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

getAgencyRevenue.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencyRevenueDetail = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
    product_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            product_id: product_id,
            page: page,
            items_per_page: items_per_page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/agency_revenue_detail',
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

getAgencyRevenueDetail.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getProfitReport = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
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
            '/agency_profit',
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

getProfitReport.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencyActual = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/agency_actual',
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

getAgencyActual.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getAgencySalary = async ({
    accessToken = '',
    company_id = null,
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            company_id: company_id,
            from_date: from_date,
            to_date: to_date,
            page: page,
            items_per_page: items_per_page,
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
            '/agency_salary',
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

getAgencySalary.propTypes = {
    accessToken: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};

export const getExpiryReport = async ({
    accessToken = '',
    from_date = '',
    to_date = '',
    page = null,
    items_per_page = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            page: page,
            items_per_page: items_per_page,
        };
        if (from_date && to_date) {
            body.to_date = to_date;
            body.from_date = from_date;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log(body);
        HTTP.post(
            '/expiry_date',
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

getExpiryReport.propTypes = {
    accessToken: PropTypes.string.isRequired,
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string.isRequired,
};
