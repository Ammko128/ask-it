import { apiService } from './apiService';

const BASE_PATH = '/conversation';

const messageService = {
  fetchMessagesCount: async () => {
    const response = await apiService.get(`${BASE_PATH}/message-count`);
    return response;
  },
  fetchConversations: async () => {
    const response = await apiService.get(BASE_PATH);
    return response;
  },
  fetchMoreMessages: async (id, offset) => {
    const response = await apiService.get(`${BASE_PATH}/${id}`, {
      params: { offset },
    });
    return response;
  },
  sendMessage: async (receiverId, message) => {
    const response = await apiService.post(BASE_PATH, { receiverId, message });
    return response;
  },
  readMessages: async (conversationId) => {
    const response = await apiService.post(
      `${BASE_PATH}/${conversationId}/read`
    );
    return response;
  },
};

export default messageService;
