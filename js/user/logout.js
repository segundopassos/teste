document.addEventListener(
  "DOMContentLoaded",
  function () {
    const button = document.getElementById("logout");

    button.addEventListener("click", () => {
      localStorage.removeItem("current_user");

      window.location.href = "/index.html";
    });
  },
  false
);
