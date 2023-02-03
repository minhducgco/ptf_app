/******************************************
 *  Author      : HoiHD
 *  Created On  : Mon Aug 24 2020
 *  File        : BookingMeeting.js
 *  Description : Phòng họp
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const onGetCategoryRooms = async (accessToken) =>
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
        HTTP.post(
            '/category/rooms',
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

onGetCategoryRooms.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetCategoryRoomServices = async (accessToken) =>
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
        HTTP.post(
            '/category/room_services',
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

onGetCategoryRoomServices.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onGetMeetingRooms = async ({
    accessToken = '',
    dateStart = '',
    dateEnd = '',
    state = 'all',
    assign = 'all',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            date_start: dateStart,
            date_end: dateEnd,
            state,
            assign,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/meeting_rooms',
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

onGetMeetingRooms.propTypes = {
    accessToken: PropTypes.string.isRequired,
    dateStart: PropTypes.string.isRequired,
    dateEnd: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assign: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export const onGetDetailMeetingRoom = async ({
    access_token = '',
    meeting_id = null,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            meeting_id: meeting_id,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/meeting_room',
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

onGetDetailMeetingRoom.propTypes = {
    access_token: PropTypes.string.isRequired,
    meeting_id: PropTypes.number.isRequired,
};

// Dang loi ko thay duong dan
export const onDeleteMeetingRoom = async ({ accessToken, meetingId }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            meeting_id: meetingId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/delete',
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

onDeleteMeetingRoom.propTypes = {
    accessToken: PropTypes.string.isRequired,
    meetingId: PropTypes.number.isRequired,
};

export const onCreateMeetingRoom = async ({
    access_token,
    name_meeting,
    date_start,
    date_end,
    room_id,
    need_live_stream,
    attendees,
    attendees_other,
    number_people,
    content_meeting,
    note,
    services,
    warning,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: access_token,
            name_meeting: name_meeting,
            date_start: date_start,
            date_end: date_end,
            need_live_stream: need_live_stream,
            attendees,
            number_people: number_people,
        };
        if (room_id) {
            body.room_id = room_id;
        }
        if (warning) {
            body.warning = warning;
        }
        if (attendees_other) {
            body.attendees_other = attendees_other;
        }
        if (content_meeting) {
            body.content_meeting = content_meeting;
        }
        if (note) {
            body.note = note;
        }
        if (services.length) {
            body.services = services;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/create',
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

onCreateMeetingRoom.propTypes = {
    access_token: PropTypes.string.isRequired,
    name_meeting: PropTypes.string.isRequired,
    date_start: PropTypes.string.isRequired,
    date_end: PropTypes.string.isRequired,
    room_id: PropTypes.number,
    need_live_stream: PropTypes.bool.isRequired,
    attendees: PropTypes.array.isRequired,
    attendees_other: PropTypes.string,
    number_people: PropTypes.number.isRequired,
    content_meeting: PropTypes.string,
    note: PropTypes.string,
    services: PropTypes.array,
    warning: PropTypes.string,
};

export const onActionMeetingRoom = async ({
    accessToken = '',
    meetingId = null,
    action = '',
    reasonDeny = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            meeting_id: meetingId,
            action,
        };
        if (reasonDeny) {
            body.reason_deny = reasonDeny;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/action',
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

onActionMeetingRoom.propTypes = {
    accessToken: PropTypes.string.isRequired,
    meetingId: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    reasonDeny: PropTypes.string,
};

export const onUpdateBookingMeetingRoom = async ({
    accessToken = '',
    meetingId = null,
    meetingName = '',
    dateStart = '',
    dateEnd = '',
    meetingType = '',
    roomId = null,
    onlineConnection = false,
    attendees = [],
    attendeeOther = '',
    numberOfPeople = 0,
    meetingContent = '',
    note = '',
    warning = '',
    services = [],
    state = '',
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            meeting_id: meetingId,
            name_meeting: meetingName,
            type: meetingType,
            need_live_stream: onlineConnection,
            attendees_other: attendeeOther,
            number_people: numberOfPeople,
            content_meeting: meetingContent,
            note,
            state,
        };
        if (dateStart) {
            body.date_start = dateStart;
        }
        if (dateEnd) {
            body.date_end = dateEnd;
        }
        if (attendees.length) {
            body.attendees = attendees;
        }
        if (services.length) {
            body.services = services;
        }
        if (warning) {
            body.warning = warning;
        }
        if (roomId) {
            body.room_id = roomId;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/update',
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

onUpdateBookingMeetingRoom.propTypes = {
    accessToken: PropTypes.string.isRequired,
    meetingId: PropTypes.number.isRequired,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    type: PropTypes.string,
    roomId: PropTypes.number,
    onlineConnection: PropTypes.bool,
    attendees: PropTypes.array,
    numberOfPeople: PropTypes.number,
    attendeeOther: PropTypes.string,
    meetingContent: PropTypes.string,
    note: PropTypes.string,
    warning: PropTypes.string,
    services: PropTypes.array,
    state: PropTypes.string,
};

export const getAvailableRoom = async ({
    accessToken,
    dateStart,
    dateEnd,
    isLiveStream,
    numberPeople,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            date_start: dateStart,
            date_end: dateEnd,
        };
        if (isLiveStream) {
            body.is_live_stream = isLiveStream;
        }
        if (numberPeople) {
            body.number_people = numberPeople;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/administration/meeting_room/available',
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

getAvailableRoom.propTypes = {
    accessToken: PropTypes.string.isRequired,
    dateStart: PropTypes.string.isRequired,
    dateEnd: PropTypes.string.isRequired,
    isLiveStream: PropTypes.bool,
    numberPeople: PropTypes.number,
};
