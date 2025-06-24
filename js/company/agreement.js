import { userRepo } from "../user/context.js";
import { serviceRepo } from "../service/context.js";
import { agreementRepo } from "../agreement/context.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const button = document.getElementById("agreement");

    button.addEventListener("click", () => {
      if (confirm("Você deseja contratar esse profissional?") == true) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const service = serviceRepo.find(parseInt(id));
        const current_user = userRepo.getCurrentUser();

        const attrs = {
          company_name: current_user.name,
          company_id: current_user.id,
          title: service.title,
          price: parseFloat(service.price),
          user_id: service.user_id,
          service_type: service.service_type,
          status: "pending",
        };

        agreementRepo.insert(attrs);
        window.location.href = "/pages/company/services.html";
      }
    });
  },
  false
);
