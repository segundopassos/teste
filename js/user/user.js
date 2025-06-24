import { userRepo } from "./context.js";

export const User = {
  errors: [],
  changeset(user = {}) {
    if (!user.name) {
      this.errors.push("Nome é obrigatório");
    }

    if (!user.email) {
      this.errors.push("Email é obrigatório");
    }

    if (user.email && userRepo.existEmail(user.email)) {
      this.errors.push("Email já está sendo usado");
    }

    if (!user.userType) {
      this.errors.push("O tipo de usuário é obrigatório");
    }

    if (!user.password) {
      this.errors.push("A senha é obrigatória");
    }
  },

  is_valid() {
    return this.errors.length === 0;
  },
};
