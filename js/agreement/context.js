import { Agreement } from "./agreement.js";
import { serviceRepo } from './../service/context.js'

export const agreementRepo = {
  _load() {
    return JSON.parse(localStorage.getItem("agreement_repo") || "[]");
  },

  _save(repo) {
    localStorage.setItem("agreement_repo", JSON.stringify(repo));
  },

  insert(data) {
    const parse = Agreement.changeset(data);
    if (!Agreement.is_valid()) {
      return { ok: false, errors: Agreement.errors };
    }

    const repo = this._load();
    const agreement = {
      ...data,
      id: repo.length ? repo[repo.length - 1].id + 1 : 1,
    };
    repo.push(agreement);
    this._save(repo);
    this._insertAlert();
    return { ok: true, agreement };
  },

  update(id, data) {
    const repo = this._load();
    const index = repo.findIndex((u) => u.id === id);
    if (index === -1) return { ok: false, error: "Acordo não encontrado" };

    const updated = { ...repo[index], ...data };
    Agreement.changeset(updated);
    if (!Agreement.is_valid()) {
      return { ok: false, errors: Agreement.errors };
    }

    repo[index] = updated;
    this._save(repo);
    return { ok: true, agreement: repo[index] };
  },

  delete(id) {
    let repo = this._load();
    const initialLength = repo.length;
    repo = repo.filter((u) => u.id !== id);
    if (repo.length === initialLength)
      return { ok: false, error: "Acordo não encontrado" };

    this._save(repo);
    return { ok: true };
  },

  all() {
    return this._load();
  },

  find(id) {
    return this._load().find((u) => u.id === id);
  },

  _insertAlert() {
    localStorage.setItem(
      "show_modal_agreement",
      JSON.stringify({ show: true })
    );
  },
  showAlert() {
    return JSON.parse(
      localStorage.getItem("show_modal_agreement") ||
        JSON.stringify({ show: false })
    );
  },

  removeAlert() {
    localStorage.removeItem("show_modal_agreement");
  },

  translateStatus(status) {
    const data = {
      pending: "Pendente",
      refused: "Recusado",
      approved: "Aprovado",
    };

    return data[status] || serviceRepo.translateServiceType(status)
  },
};
