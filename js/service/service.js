export const Service = {
  errors: [],
  changeset(service = {}) {
    // if (!service.name) {
    //   this.errors.push("Nome é obrigatório");
    // }
  },

  is_valid() {
    return this.errors.length === 0;
  },
};
