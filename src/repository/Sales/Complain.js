import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getComplains = async ({accessToken = '', state = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {access_token: accessToken, state: state};
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_claim',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

getComplains.propTypes = {
  accessToken: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export const getComplain = async ({accessToken = '', id = null}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {access_token: accessToken, id: id};
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_claim/detail',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

getComplain.propTypes = {
  accessToken: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export const getCategories = async ({accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {access_token: accessToken};
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_claim/crm_category',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

getCategories.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export const getCustomers = async ({
  accessToken = '',
  items_per_page = 20,
  page = 1,
  value = '',
  code = '',
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      items_per_page: items_per_page,
      page: page,
    };
    if (code && value) {
      body.code = code;
      body.value = value;
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/res_partner',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

getCustomers.propTypes = {
  accessToken: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items_per_page: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export const createComplain = async ({
  accessToken = '',
  subject = '',
  claim_date = '',
  partner_id = null,
  support_user_id = null,
  support_team_id = null,
  content = '',
  user_id = null,
  dead_line = '',
  priority = null,
  category_id = null,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      subject: subject,
      claim_date: claim_date,
      partner_id: partner_id,
      category_id: category_id,
    };
    if (support_user_id) {
      body.support_user_id = support_user_id;
    }
    if (support_team_id) {
      body.support_team_id = support_team_id;
    }
    if (content) {
      body.content = content;
    }
    if (user_id) {
      body.user_id = user_id;
    }
    if (dead_line) {
      body.dead_line = dead_line;
    }
    if (priority) {
      body.priority = priority.toString();
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_claim/create',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

createComplain.propTypes = {
  accessToken: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  claim_date: PropTypes.string.isRequired,
  partner_id: PropTypes.number.isRequired,
  support_user_id: PropTypes.number.isRequired,
  support_team_id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  dead_line: PropTypes.string.isRequired,
  category_id: PropTypes.number.isRequired,
  priority: PropTypes.number.isRequired,
};

export const editComplain = async ({
  accessToken = '',
  id = null,
  subject = '',
  claim_date = '',
  partner_id = null,
  support_user_id = null,
  support_team_id = null,
  content = '',
  user_id = null,
  dead_line = '',
  priority = null,
  category_id = null,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      id: id,
      access_token: accessToken,
      subject: subject,
      claim_date: claim_date,
      partner_id: partner_id,
      category_id: category_id,
    };
    if (support_user_id) {
      body.support_user_id = support_user_id;
    }
    if (support_team_id) {
      body.support_team_id = support_team_id;
    }
    if (content) {
      body.content = content;
    }
    if (user_id) {
      body.user_id = user_id;
    }
    if (dead_line) {
      body.dead_line = dead_line;
    }
    if (priority) {
      body.priority = priority.toString();
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/crm_claim/update',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

editComplain.propTypes = {
  accessToken: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  claim_date: PropTypes.string.isRequired,
  partner_id: PropTypes.number.isRequired,
  support_user_id: PropTypes.number.isRequired,
  support_team_id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  dead_line: PropTypes.string.isRequired,
  category_id: PropTypes.number.isRequired,
  priority: PropTypes.number.isRequired,
};
