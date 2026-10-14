const reviewCountElement = document.getElementById("review-count");
const storedReviewCount = Number(localStorage.getItem("reviewCount") ?? 0);
const reviewCount = Number.isInteger(storedReviewCount) && storedReviewCount >= 0
    ? storedReviewCount + 1
    : 1;

localStorage.setItem("reviewCount", reviewCount);
reviewCountElement.textContent = reviewCount;
