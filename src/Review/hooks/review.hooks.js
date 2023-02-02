import ReviewService from '../services/review.service';

const useReviewHook = () => {
  const reviewService = new ReviewService();

  const getAllReviews = async () => {
    let result;

    try {
      result = await reviewService.getAllReviews();
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllReviewbyUser = async (token, userId) => {
    let result;

    try {
      result = await reviewService.getAllReviewbyUser(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getReviewById = async (token, reviewId) => {
    let result;

    try {
      result = await reviewService.getReviewbyId(token, reviewId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const doReview = async (token, userId, rentedSpaceId) => {
    let result;

    try {
      result = await reviewService.doReview(token, userId, rentedSpaceId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyReview = async ({ token, userId, reviewId, review }) => {
    let result;

    try {
      result = await reviewService.modifyReview({ token, userId, reviewId, review });
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteReview = async (token, userId, reviewId) => {
    let result;

    try {
      result = await reviewService.deleteReview(token, userId, reviewId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { getAllReviews, getAllReviewbyUser, getReviewById, doReview, modifyReview, deleteReview };
};

export default useReviewHook;
