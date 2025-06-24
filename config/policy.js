import { userRepo } from "./../js/user/context.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const currentUser = userRepo.getCurrentUser();

    if (
      Object.keys(currentUser).length === 0 &&
      currentUser.constructor === Object
    ) {
      window.location.href = "/index.html";
    } else {
      const currentPath = window.location.pathname;

      if (!currentPath.includes(currentUser.userType)) {
        window.location.href = "/index.html";
      }
    }
  },
  false
);
