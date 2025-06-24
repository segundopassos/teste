export const Agreement = {
  errors: [],
  changeset(agreement = {}) {
    if (!agreement.company_name) {
      this.errors.push("Nome é obrigatório");
    }

    if (!agreement.company_id) {
      this.errors.push("Id da empresa é obrigatório");
    }

    if (!agreement.title) {
      this.errors.push("Título é obrigatório");
    }

    if (!agreement.user_id) {
      this.errors.push("Id do usuário é obrigatório");
    }

    if (!agreement.service_type) {
      this.errors.push("Tipo de serviço id é obrigatório");
    }

    if (!agreement.status) {
      this.errors.push("Status id é obrigatório");
    }
  },

  is_valid() {
    return this.errors.length === 0;
  },
};
