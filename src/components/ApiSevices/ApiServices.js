import axios from "axios";
import { isAction } from "redux";
const BASE_URL = "/api/v1/admin";

const apiService = {
  getUserData: async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  },

  // ******************************** Api Authentication Section ********************************

  login: async (email, password, FCM) => {
    try {
      const response = await axios.post(`${BASE_URL}/signIn`, { email, password, fcmToken: FCM });
      return response?.data;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  },
  forgot: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot/password`, { email });
      return response?.data;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  },
  optVerification: async (email, otp) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify/otp`, { email, otp });
      return response?.data;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  },
  reset: async (email, password, confirmPassword) => {
    try {
      const response = await axios.post(`${BASE_URL}/reset/password`, {
        email,
        password,
        confirmPassword,
      });
      return response?.data;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  },
  getLogout: async () => {
    try {
      const response = await axios.post(`/api/v1/admin/logout`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // ********************************************************************************************

  // Add other API calls here

  // ***************************** MANAGE FEEDS *******************************

  getAllhashTag: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/all/hashtags`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  createPost: async (postData) => {
    try {
      const response = await axios.post(`/api/v1/admin/add/app/post`, postData);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  createNews: async (postData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add/app/news/feed`, postData);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ***************************** Manage All Post Section **********************************

  managePost: async (pagedata) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get/all/app/posts?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}`
      );
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  comment: async (reply) => {
    try {
      const response = await axios.post(`${BASE_URL}/add/comment/to/feed/${reply.id}`, {
        comment: reply.value,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  ReplyOnComment: async (reply, feedId, commentId) => {
    console.log("reply", reply);
    console.log("feedId", feedId);
    console.log("commentId", commentId);
    try {
      const response = await axios.post(`${BASE_URL}/add/reply/on/comment/${feedId}/${commentId}`, {
        reply: reply,
      });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  DeleteSingleComment: async (feedId, commentId) => {
    try {
      const response = await axios.put(`/api/v1/admin/delete/comment/${feedId}/${commentId}`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  DeleteSingleReply: async (FeedId, commentId, replyId) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/delete/reply/on/a/comment/${FeedId}/${commentId}/${replyId}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  manageNews: async (pagedata) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get/all/news/feeds?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}`
      );
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },

  singleUserPost: async (id) => {
    // console.log("id", id)
    try {
      const response = await axios.get(`/api/v1/admin/get/single/app/post/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  singleUserNews: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/single/news/feed/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  deleteAppPost: async (post) => {
    try {
      const response = await axios.put(`${BASE_URL}/delete/feed?feedId=${post}`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  postLike: async (feedId, commentId) => {
    console.log("feedId", feedId);
    console.log("commentId", commentId);

    try {
      const response = await axios.post(
        `/api/v1/admin/update/likes/on/a/comment/${feedId}/${commentId}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  deleteHashtags: async (selectedHashtags) => {
    try {
      const response = await axios.put(`${BASE_URL}/delete/hashtags`, {
        hashtags: selectedHashtags,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },

  // **************************************************************************

  // ************************ MENTORSHIP SECTION *******************************
  AllVerifyMentor: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/all/verification/requests`);
      // const data = await response.json();
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  VerifyMentor: async (status, verificationId) => {
    try {
      const response = await axios.post(`${BASE_URL}/update/mentor/verification/status`, {
        status,
        verificationId,
      });
      // const data = await response.json();
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  MentorShipAllStudyMaterial: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/all/study/materials`);
      // const data = await response.json();
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  GetyourUploadeMaterial: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/all/added/study/materials`);
      // const data = await response.json();
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // ************************ MENTORSHIP SECTION *******************************

  // ***************************** Add Social Media Post Section **************************
  getAllSocialMediaAccount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/all/social/media/accounts`);
      // const data = await response.json();
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  createSocialMediaPost: async (formData, id) => {
    console.log("form data At API", formData);
    try {
      const response = await axios.post(`${BASE_URL}/add/social/media/post/${id}`, formData);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllSocialMediaPosts: async (pagedata) => {
    try {
      const response = await axios.get(
        `/api/v1/admin/get/all/social/media/posts?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllSocialMediaAccounts: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/all/social/media/accounts`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ************************ Appointment SECTION *******************************
  getAllAppointments: async (pagedata) => {
    // console.log("pageData", pagedata.limitPerPage)
    // ?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}
    try {
      const response = await axios.get(
        `/api/v1/admin/get/all/appointment/requests?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getSingleAppointment: async (id) => {
    try {
      const response = await axios.get(`/api/v1/admin/get/single/appointment?appointmenId=${id}`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  ChangeAppointmentStatus: async (status, data) => {
    // console.log("status", status)
    if (status.value === "approved") {
      const removeEmptyFields = (obj) => {
        return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== ""));
      };
      const appointmentId = status.id;
      const appointmentStatus = status.value;
      const cleanedData = removeEmptyFields(data);
      console.log("cleanedData", cleanedData);
      try {
        const response = await axios.put(`/api/v1/admin/update/appointment/request/status`, {
          appointmentId,
          appointmentStatus,
          ...cleanedData,
        });
        return response;
      } catch (error) {
        console.error("Error logging out", error);
        throw error;
      }
    } else {
      const removeEmptyFields = (obj) => {
        const filteredObj = { ...obj };

        // Delete the meetUrl key before filtering
        delete filteredObj.meetUrl;
        return Object.fromEntries(
          Object.entries(filteredObj).filter(([key, value]) => value !== "")
        );
      };
      const appointmentId = status.id;
      const appointmentStatus = status.value;
      const cleanedData = removeEmptyFields(data);
      console.log("cleanedData", cleanedData);
      try {
        const response = await axios.put(`/api/v1/admin/update/appointment/request/status`, {
          appointmentId,
          appointmentStatus,
          ...cleanedData,
        });
        return response;
      } catch (error) {
        console.error("Error logging out", error);
        throw error;
      }
    }
  },
  deletePost: async (id) => {
    // console.log("id", id)
    try {
      const response = await axios.put(`api/v1/admin/delete/feed?feedId=${id}`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  singleUserSocialMedia: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/single/social/post/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ************************ Admin SECTION *******************************
  getAdminProfile: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/profile/data`);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  UpdatePassword: async (data) => {
    try {
      const response = await axios.post(`/api/v1/admin/change/password`, {
        oldPassword: data.oldPassword,
        newPassword: data.NewPassword,
        confirmPassword: data.ConfirmPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  updateAdminAccount: async (data, file) => {
    console.log("data", data);
    // console.log("file", file)
    const formData = new FormData();
    if (data.userName !== "") {
      formData.append("userName", data?.userName);
    }

    if (data.phoneNo !== "") {
      formData.append("phoneNo", data.phoneNo);
    }

    if (file !== null) {
      formData.append("file", file);
    }
    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    try {
      const response = await axios.put(`/api/v1/admin/update/account/data`, formData);
      return response.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  addSocialMediaAccount: async (data) => {
    console.log("data", data);
    try {
      const res = await axios.post(`/api/v1/admin/add/social/media/account/profile`, {
        platform: data.platform,
        userName: data.userName,
        profileUrl: data.profileUrl,
      });
      return res.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  deleteSocialMediaAccount: async (id) => {
    // console.log("id", id)
    try {
      const response = await axios.put(
        `api/v1/admin/delete/social/media/account?socialAccountId=${id}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ************************ User SECTION *******************************
  getAllUsers: async (pagedata, userType) => {
    // console.log("pageData", pagedata.limitPerPage)
    // console.log("userType", userType)
    // ?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}
    try {
      if (userType === "") {
        const response = await axios.get(
          `/api/v1/admin/get/all/users?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}&search=`
        );
        return response;
      } else {
        const response = await axios.get(
          `/api/v1/admin/get/all/users?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}&search=${userType}`
        );
        return response;
      }
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  changeUserPermission: async (data, singleStatus) => {
    // console.log("data at api", data)
    try {
      if (data.user === "mentor" && singleStatus !== "undefined") {
        const response = await axios.put(
          `/api/v1/admin/update/mentor/permission/status?mentorId=${data.id}&status=${singleStatus}`
        );
        return response;
      } else if (data.user === "mentor" && singleStatus === "undefined") {
        const response = await axios.put(
          `/api/v1/admin/update/mentor/permission/status?mentorId=${data.id}&status=${
            data.verification === "approved" ? "rejected" : "approved"
          }`
        );
        return response;
      } else if (data.user === "party worker" && singleStatus !== "undefined") {
        const response = await axios.put(
          `/api/v1/admin/approve/party/worker?partyWorkerId=${data.id}&verificationStatus=${singleStatus}`
        );
        return response;
      } else if (data.user === "party worker" && singleStatus === "undefined") {
        const response = await axios.put(
          `/api/v1/admin/approve/party/worker?partyWorkerId=${data.id}&verificationStatus=${
            data.verification === "approved" ? "rejected" : "approved"
          }`
        );
        return response;
      }
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  DeactivateUser: async (userId) => {
    // console.log("user Id", userId)
    try {
      const response = await axios.put(
        `/api/v1/admin/update/user/activation/status?userId=${userId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getSingleUser: async (userId) => {
    try {
      const response = await axios.get(`/api/v1/admin/get/single/user?userId=${userId}`);
      return response?.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ************************ Banner SECTION *******************************
  createBanner: async (formdata) => {
    try {
      const res = await axios.post("/api/v1/admin/add/banner", formdata);
      return res.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllBanners: async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/all/banner/images");
      return res.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },

  deleteImagesBanner: async (id) => {
    // console.log("id to check", id, " ===typeof==>",id   )
    try {
      const res = await axios.put("/api/v1/admin/delete/banner/images", {
        imagesToDelete: [...id],
      });
      return res.data;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **************************************************************************

  // ************************ Query Management *******************************
  getAllQuery: async (filter, status) => {
    try {
      if (filter === "" && status !== "") {
        const response = await axios.get(`/api/v1/admin/get/all/queries?status=${status}`);
        return response;
      } else if (filter !== "" && status !== "") {
        const response = await axios.get(
          `/api/v1/admin/get/all/queries?search=${filter}&status=${status}`
        );
        return response;
      } else if (filter === "" && status === "") {
        const response = await axios.get(`/api/v1/admin/get/all/queries`);
        return response;
      }
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  postReply: async (reply) => {
    try {
      const response = await axios.post(`/api/v1/admin/add/reply/to/query`, {
        queryId: reply.id,
        reply: reply.value,
      });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  changeStatus: async (resolve) => {
    // console.log("resolve", resolve)
    try {
      const response = await axios.put(`/api/v1/admin/update/query/status`, {
        queryId: resolve.id,
        status: resolve.status,
      });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllFeedbacks: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/all/feedbacks`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllreports: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/all/reports`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // **********************************CMS SECTION API******************************************

  getPrivacyAndPolicy: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/policies`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  PostPrivacyAndPolicy: async (editorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create/update/policy`, { policy: editorData });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getTermsAndConditions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/create/update/terms/conditions`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  PostTermsAndConditions: async (editorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create/update/terms/conditions`, {
        termsAndConditions: editorData,
      });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllNotification: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/total/notifications`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },

  getAllPartyWorkerPosts: async (pagedata) => {
    // http://localhost:5003/api/v1/admin/get/all/party/workers/app/posts?limitPerPage=2&pageNo=1&isActive=false/api/v1/admin/get/all/party/workers/active/app/posts?limitPerPage=2&pageNo=1

    try {
      const response = await axios.get(
        `/api/v1/admin/get/all/party/workers/active/app/posts?limitPerPage=${pagedata?.limitPerPage}&pageNo=${pagedata?.currentPage}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  changePostStatus: async (targetData) => {
    console.log("resolve", targetData)
    try {
      //
      const response = await axios.put(
        `api/v1/admin/update/isActive/post/status?postId=${
          targetData.id
        }&isActiveStatus=${!targetData.status}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  changeYoutubePostStatus: async (targetData) => {
    // console.log("resolve", resolve)
    try {
      //
      const response = await axios.put(
        `api/v1/admin/update/isActive/post/status?postId=${
          targetData.id
        }&isActiveStatus=${!targetData.status}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  changeNewsStatus: async (targetData) => {
    console.log("targetData", targetData);
    try {
      //
      const response = await axios.put(
        `/api/v1/admin/update/news/feed?newsFeedId=${targetData.id}`,
        {
          isActive: !targetData.status,
        }
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getPrivacyAndPolicy: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/policies`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  PostPrivacyAndPolicy: async (editorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create/update/policy`, { policy: editorData });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },

  getTermsAndConditions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get/terms/conditions`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  PostTermsAndConditions: async (editorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create/update/terms/conditions`, {
        termsAndConditions: editorData,
      });
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  getAllNotificationWithPagination: async () => {
    try {
      const response = await axios.get(`/api/v1/admin/get/all/notifications`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // ----------------------------------------------------------------------------------
  // User Verification as a party worker
  getPartyWorkerData: async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/all/party/workers");
      return res;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  AllPartyWorkerPost: async (pagedata, filter) => {
    try {
      if (filter === null) {
        const response = await axios.get(`/api/v1/admin/get/all/party/workers/app/posts`);
        return response;
      } else {
        const response = await axios.get(
          `/api/v1/admin/get/all/party/workers/app/posts?limitPerPage=${pagedata.limitPerPage}&pageNo=${pagedata.currentPage}`
        );
        return response;
      }
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  approvePartyWorker: async (approve) => {
    console.log("approve", approve);
    try {
      const response = await axios.put(
        `/api/v1/admin/update/auto/post/approval/status?partyWorkerId=${
          approve.id
        }&autoApprovalStatus=${!approve.status}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  verifyPartyWorker: async (status, id) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/approve/party/worker?partyWorkerId=${id}&verificationStatus=${status}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  DeactivatePartyWorkerPost: async (active) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/update/isActive/post/status?postId=${
          active.id
        }&isActiveStatus=${!active.status}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  StudyMaterialDeletePost: async (activeId) => {
    try {
      // http://localhost:5003/api/v1/admin/delete/study/material/66700c733dc44e20d424aaa6
      const response = await axios.put(`/api/v1/admin/delete/study/material/${activeId}`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  UploadStudyMaterial: async (formData) => {
    try {
      // http://localhost:5003/api/v1/admin/delete/study/material/66700c733dc44e20d424aaa6
      const response = await axios.post(`/api/v1/admin/add/study/material`, formData);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  updateNotification: async (id) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/update/notification/status?notificationId=${id}`
      );
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // ----------------------------------Likes on feed
  LikeOnFeed: async (feedId) => {
    try {
      const response = await axios.post(`/api/v1/admin/add/likes/to/feed/${feedId}`);
      return response;
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
};

export default apiService;
