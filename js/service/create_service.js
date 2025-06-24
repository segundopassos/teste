import { serviceRepo } from "./context.js";
import { userRepo } from "../user/context.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create_service");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = {};
    const current_user = userRepo.getCurrentUser();

    formData.forEach((value, key) => {
      if (values.hasOwnProperty(key)) {
        if (!Array.isArray(values[key])) {
          values[key] = [values[key]];
        }
        values[key].push(value);
      } else {
        values[key] = value;
      }
    });
    values["user_id"] = current_user.id;
    values["author"] = current_user.name;

    const { ok, service } = serviceRepo.insert(values);

    if (ok) {
      window.location.href = "/pages/user";
    } else {
      Toastify({
        text: "Erro ao criar o serviço verifique os dados!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }
  });
});
