import { userRepo } from "./context.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const form = document.getElementById("formLogin");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email");
      const password = document.getElementById("password");

      const { success, user } = userRepo.login(email.value, password.value);

      if (success) {
        localStorage.removeItem("current_user");
        localStorage.setItem("current_user", JSON.stringify(user));

        if (user.userType == "user") {
          window.location.href = "/pages/user/index.html";
        } else if (user.userType == "company") {
          window.location.href = "pages/company/index.html";
        }
      } else {
        Toastify({
          text: "Erro ao fazer o login, verifique os dados!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }
    });
  },
  false
);
