import { createTable } from "../components/table.js";
import { userRepo } from "../user/context.js";
import { agreementRepo } from "./context.js";

document.addEventListener(
  "DOMContentLoaded",
  async function () {
    const columns = [
      { label: "Empresa", key: "company_name" },
      { label: "Valor", key: "price" },
      { label: "Título", key: "title" },
      { label: "Tipo de serviço", key: "service_type" },
      { label: "Status", key: "status" },
    ];
    const showModal = agreementRepo.showAlert();
    const currentUser = userRepo.getCurrentUser();
    let rows = agreementRepo.all();

    if (currentUser.userType === "user") {
      rows.filter((agreement) => agreement.user_id === currentUser.id);
    }

    if (showModal.show) {
      const confirmed = await ConfirmModal.show(
        "Parabéns você adicionou um serviço, aguarde o aluno analisar a proposta.",
        false
      );

      if (confirmed) {
        agreementRepo.removeAlert();
      }
    }

    const tableEl = createTable({
      id: "user-table",
      columns,
      rows,
      rowId: (row) => `user-${row.id}`,
      rowClick: (row) => alert(row.title),
      actions:
        currentUser.userType === "company" ? [] : ["ok", "email", "error"],
      renderCell: (col, row) => {
        const value = row[col.key];
        return agreementRepo.translateStatus(value);
      },
      renderAction: (action, row) => {
        if (row.status === "pending") {
          const link = document.createElement("i");
          switch (action) {
            case "ok":
              link.classList.add("fa", "fa-check-circle");
              break;
            case "email":
              link.classList.add("fa", "fa-envelope");
              break;
            case "error":
              link.classList.add("fa", "fa-close");
              break;
            default:
              break;
          }
          link.addEventListener("click", async () => {
            const confirmed = await ConfirmModal.show(
              "Você realmente deseja prosseguir?"
            );

            if (confirmed) {
              switch (action) {
                case "ok":
                  agreementRepo.update(row.id, { status: "approved" });
                  window.location.reload(true);

                  break;
                case "email":
                  alert("Email enviado");
                  break;
                case "error":
                  agreementRepo.update(row.id, { status: "refused" });

                  window.location.reload(true);
                  break;
                default:
                  break;
              }
            }
          });
          return link;
        }
      },
    });

    document.getElementById("services").appendChild(tableEl);
  },
  false
);
