/******************************************
 *  Author      : HoiHD
 *  Created On  : Sun Jul 17 2020
 *  File        : index.js
 *  Description : Các hàm để lấy dữ liệu từ server qua API thuộc màn hình Home.
 *******************************************/
import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getTopBlogPosts = async ({ accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu tin tức trên top.
         */
        let body = {
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/top_blog_post',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getTopBlogPosts.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getBlogPosts = async ({
    accessToken,
    blogPostId,
    items_per_page,
    page,
}) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy danh sách tin tức
         */
        let body = {
            access_token: accessToken ? accessToken : '',
            blog_id: blogPostId,
            items_per_page: items_per_page,
            page: page,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_blog_posts',
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

getBlogPosts.propTypes = {
    accessToken: PropTypes.string.isRequired,
    blogPostId: PropTypes.number.isRequired,
};

export const getBlogPost = async ({ blog_post_id, access_token }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy 1 tin tức từ danh sách tin tức
         */
        let body = {
            blog_post_id: blog_post_id,
            access_token: access_token,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_blog_post',
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

getBlogPost.propTypes = {
    blogPostId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
};

export const getAllTypeBlog = async ({ accessToken = '' }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy 1 tin tức từ danh sách tin tức
         */
        let body = {
            access_token: accessToken,
            app: true,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_blog',
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

getAllTypeBlog.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getFavorites = ({ accessToken = '', model = '' }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy danh sách bài viết yêu thích
         */
        let body = {
            access_token: accessToken,
            model: model,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_favorites',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getFavorites.propTypes = {
    model: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
};
//-------------------------COMMENT API -----------------------------------------------------------
export const getComments = async ({
    idBlog,
    accessToken,
    modelBlog,
    parentId,
    page,
    itemsPerPage,
    order,
}) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy danh sách bình luận của bài viết
         * Lấy danh sách reply của bình luận(nếu truyền parent_id)
         */
        let body = {
            access_token: accessToken,
            model: modelBlog,
            id: idBlog,
            order,
        };
        if (itemsPerPage !== undefined) {
            body.items_per_page = itemsPerPage;
        }
        if (parentId) {
            body.parent_id = parentId;
        }
        if (page) {
            body.page = page;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_comments',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getComments.propTypes = {
    modelBlog: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    order: PropTypes.string.isRequired,
};
export const getComment = async ({ accessToken, commentId }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy danh sách bình luận của bài viết
         * Lấy danh sách reply của bình luận(nếu truyền parent_id)
         */
        let body = {
            access_token: accessToken,
            comment_id: commentId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_comment',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getComment.propTypes = {
    accessToken: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
};

export const handleComment = async ({
    id,
    accessToken,
    model,
    comment,
    parentId,
    commentId,
}) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Bình luận bài viết hoặc trả lời bình luận
         * Bình luận bài viết: model='blog.post', trả lời comment: model = 'website.conversation'
         */
        let body = {
            access_token: accessToken,
            model: model,
            id: id,
            comment: comment,
            comment_id: id,
            parent_id: parentId ? parentId : undefined,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/comment',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.message);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

handleComment.propTypes = {
    model: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
};

export const editComment = async ({ accessToken, commentId, newComment }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            comment_id: commentId,
            new_comment: newComment,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/edit_comment',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.message);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });
editComment.propTypes = {
    commentId: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    newComment: PropTypes.string.isRequired,
};
export const deleteComment = async ({ accessToken, commentId }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            comment_id: commentId,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            'website/blog/delete_comment',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.message);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });
deleteComment.propTypes = {
    commentId: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
};
//-----------------------------------------------------------------------------------------------------
export const handleReact = async ({ id, accessToken, model }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Like bài viết hoặc comment
         * Like bài viết: model='blog.post', like comment: model = 'website.conversation'
         */
        let body = {
            access_token: accessToken,
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
            '/website/blog/react',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.message);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

handleReact.propTypes = {
    model: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export const addShare = async ({ accessToken, model, id }) =>
    new Promise((handleSuccess, handleError) => {
        let options = {
            body: {
                access_token: accessToken,
                model,
                id,
            },
        };
        HTTP.post(
            '/website/blog/add_share',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.message);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

addShare.propTypes = {
    model: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export const getListMedia = async ({ accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/media/get_list_media',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getListMedia.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getMedia = async ({ accessToken, mediaId }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            media_id: mediaId,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/media/get_media',
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

getMedia.propTypes = {
    accessToken: PropTypes.string.isRequired,
    mediaId: PropTypes.number.isRequired,
};

export const getAlbums = async ({ accessToken, type }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            type,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/album/get_albums',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data.app_data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getAlbums.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const getAlbum = async ({ accessToken, type, albumId }) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            access_token: accessToken,
            type,
            album_id: albumId,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/album/get_album',
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

getAlbum.propTypes = {
    accessToken: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    mediaId: PropTypes.number.isRequired,
};
export const getJob = async ({ accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu vị trí công việc
         */
        let body = {
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/form/get_job',
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

getJob.propTypes = {
    accessToken: PropTypes.string.isRequired,
};
export const getDepartment = async ({ accessToken }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu phòng ban
         */
        let body = {
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/form/get_department',
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

getDepartment.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

export const onSubmitApplication = async ({
    accessToken,
    jobId,
    departmentId,
    partnerName,
    emailFrom,
    partnerPhone,
    description,
    attachment,
}) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu tạo đơn ứng tuyển
         */
        let body = {
            access_token: accessToken,
            job_id: jobId,
            department_id: departmentId,
            partner_name: partnerName,
            email_from: emailFrom,
            partner_phone: partnerPhone,
            description,
            attachment,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/form/submit_application',
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

onSubmitApplication.propTypes = {
    accessToken: PropTypes.string.isRequired,
    jobId: PropTypes.number.isRequired,
    departmentId: PropTypes.number.isRequired,
    partnerName: PropTypes.string.isRequired,
    emailFrom: PropTypes.string.isRequired,
    partnerPhone: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    attachment: PropTypes.object.isRequired,
};

//---------------------getShareCount----------------------
export const getshareCount = async ({ access_token, model, id }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu vị trí công việc
         */
        let body = {
            access_token: access_token,
            model: model,
            id: id,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/website/blog/get_share_count',
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

getshareCount.propTypes = {
    access_token: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export const onGetDashboard = async ({ access_token }) =>
    new Promise((handleSuccess, handleError) => {
        /**
         * Lấy dữ liệu vị trí công việc
         */
        let body = {
            access_token: access_token,
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/dashboard',
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

