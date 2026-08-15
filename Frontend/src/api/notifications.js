import API from "./axios";

export const getNotifications = async () => {
  const response = await API.get("/notifications");

  return response.data.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await API.get(
    "/notifications/unread-count"
  );

  return response.data.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await API.patch(
    `/notifications/${id}/read`
  );

  return response.data.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await API.patch(
    "/notifications/read-all"
  );

  return response.data;
};