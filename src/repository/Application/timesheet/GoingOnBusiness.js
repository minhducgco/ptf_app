/******************************************
 *  Author : HoiHD
 *  Created On : Fri Jul 17 2020
 *  File : GoingOnBusiness.js
 *  Description: Thêm, sửa, xóa, lấy thông tin, phê duyệt đơn xin đi công tác theo nhóm.
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const GOBCreate = async ({
  employee_ids,
  accessToken,
  note,
  companionIds,
  from_date,
  to_date,
  address,
  actionSend,
  line_ids,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      employee_ids: employee_ids,
      access_token: accessToken,
      from_date: from_date,
      to_date: to_date,
      address: address,
      line_ids: line_ids,
      note: note,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/list_going_on_business/create',
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

GOBCreate.propTypes = {
  employeeIds: PropTypes.array.isRequired,
  accessToken: PropTypes.string.isRequired,
  scheduleValue: PropTypes.array.isRequired,
};

export const GOBAction = async ({
  id = null,
  accessToken = '',
  action = '',
  reason = '',
  line_id = null,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body =
      action === 'action_reject' ||
      action === 'action_cancel_popup' ||
      action === 'action_manager_cancel'
        ? line_id === null
          ? {
              id: id,
              access_token: accessToken,
              action: action,
              reason: reason,
            }
          : {
              line_id: line_id,
              access_token: accessToken,
              action: action,
              reason: reason,
            }
        : line_id === null
        ? {id: id, access_token: accessToken, action: action}
        : {
            line_id: line_id,
            access_token: accessToken,
            action: action,
          };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/list_going_on_business/action',
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

GOBAction.propTypes = {
  goingOnBusinessId: PropTypes.number.isRequired,
  action: PropTypes.oneOf(['send', 'cancel', 'delete']),
  accessToken: PropTypes.string.isRequired,
};

export const GOBDelete = async ({goingOnBusinessId}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      going_on_business_id: goingOnBusinessId,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/timesheet/going_on_business/delete',
      options,
      res => {
        if (res.result !== undefined && res.result.code === 200) {
          handleSuccess(res.result.data);
        } else {
          handleError(res.result.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

GOBDelete.propTypes = {
  goingOnBusinessId: PropTypes.number.isRequired,
};

export const getGOB = async ({id = 0, accessToken = ''}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      id: id,
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
      '/list_going_on_business/detail',
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

getGOB.propTypes = {
  goingOnBusinessId: PropTypes.number.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export const getGOBs = async ({
  from_date = '',
  to_date = '',
  accessToken = '',
  state = '',
  code = '',
  value = '',
  page = null,
  items_per_page = null,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      from_date: from_date,
      to_date: to_date,
      state: state,
      access_token: accessToken,
      code: code,
      page: page,
      items_per_page: items_per_page,
    };
    if (value) {
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
      'list_going_on_business',
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

getGOBs.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export const GOBUpdate = async ({
  accessToken,
  id,
  from_date,
  to_date,
  note,
  address,
  line_ids,
  employee_ids,
}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      id: id,
      from_date: from_date,
      to_date: to_date,
      note: note,
      address: address,
      line_ids: line_ids,
      employee_ids: employee_ids,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/list_going_on_business/update',
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

GOBUpdate.propTypes = {
  goingOnBusinessId: PropTypes.number.isRequired,
  accessToken: PropTypes.string.isRequired,
  departmentId: PropTypes.number.isRequired,
  employeeIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  note: PropTypes.string,
};

export const GOBGetDepartAndEmp = async ({accessToken = '', partner = null}) =>
  new Promise((handleSuccess, handleError) => {
    let body = {
      access_token: accessToken,
      partner: partner,
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    HTTP.post(
      '/products',
      options,
      res => {
        if (res !== undefined && res.code === 200) {
          handleSuccess(res.data.data);
        } else {
          handleError(res.message);
        }
      },
      err => {
        handleError(err);
      },
    );
  });

GOBUpdate.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
