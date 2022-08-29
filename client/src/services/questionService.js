import { apiService } from './apiService';

const BASE_PATH = '/question';

const questionService = {
  getNewQuestions: async (offset) => {
    const response = await apiService.get(`${BASE_PATH}/`, {
      params: { offset },
    });
    return response;
  },
  getHotQuestions: async (offset) => {
    const response = await apiService.get(`${BASE_PATH}/hot`, {
      params: { offset },
    });
    return response;
  },
  getQuestionById: async (id) => {
    const response = await apiService.get(`${BASE_PATH}/${id}`);
    return response;
  },
  submitAnswer: async (questionId, content) => {
    const response = await apiService.post(
      `${BASE_PATH}/${questionId}/answer`,
      {
        content,
      }
    );
    return response;
  },
  updateAnswer: async (answerId, content) => {
    const response = await apiService.patch(`/answer/${answerId}`, { content });
    return response;
  },
  updateQuestion: async (questionId, content) => {
    const response = await apiService.patch(`${BASE_PATH}/${questionId}`, {
      content,
    });
    return response;
  },
  upvoteQuestion: async (questionId, deleteUpvote) => {
    const path = `${BASE_PATH}/${questionId}/upvote`;
    const response = deleteUpvote
      ? await apiService.delete(path)
      : await apiService.post(path);
    return response;
  },
  upvoteAnswer: async (answerId, deleteUpvote) => {
    const path = `/answer/${answerId}/upvote`;
    const response = deleteUpvote
      ? await apiService.delete(path)
      : await apiService.post(path);
    return response;
  },
  downvoteQuestion: async (questionId, deleteDownvote) => {
    const path = `${BASE_PATH}/${questionId}/downvote`;
    const response = deleteDownvote
      ? await apiService.delete(path)
      : await apiService.post(path);
    return response;
  },
  downvoteAnswer: async (answerId, deleteDownvote) => {
    const path = `/answer/${answerId}/downvote`;
    const response = deleteDownvote
      ? await apiService.delete(path)
      : await apiService.post(path);
    return response;
  },
  submitQuestion: async (content) => {
    const response = await apiService.post(BASE_PATH, { content });
    return response;
  },
  deleteAnswer: async (answerId) => {
    const response = await apiService.delete(`/answer/${answerId}`);
    return response;
  },
  deleteQuestion: async (questionId) => {
    const response = await apiService.delete(`${BASE_PATH}/${questionId}`);
    return response;
  },
};

export default questionService;
