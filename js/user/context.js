import { User } from "./user.js";

export const userRepo = {
  _load() {
    return JSON.parse(localStorage.getItem("users_repo") || "[]");
  },

  _save(repo) {
    localStorage.setItem("users_repo", JSON.stringify(repo));
  },

  insert(data) {
    const parse = User.changeset(data);
    if (!User.is_valid()) {
      return { ok: false, errors: User.errors };
    }

    const repo = this._load();
    const user = {
      ...data,
      id: repo.length ? repo[repo.length - 1].id + 1 : 1,
    };
    repo.push(user);
    this._save(repo);
    return { ok: true, user };
  },

  update(id, data) {
    const repo = this._load();
    const index = repo.findIndex((u) => u.id === id);
    if (index === -1) return { ok: false, error: "Usuário não encontrado" };

    const updated = { ...repo[index], ...data };
    const parse = User.changeset(updated);
    if (!parse.is_valid()) {
      return { ok: false, errors: User.errors };
    }

    repo[index] = { ...parse.data, id };
    this._save(repo);
    return { ok: true, user: repo[index] };
  },

  delete(id) {
    let repo = this._load();
    const initialLength = repo.length;
    repo = repo.filter((u) => u.id !== id);
    if (repo.length === initialLength)
      return { ok: false, error: "Usuário não encontrado" };

    this._save(repo);
    return { ok: true };
  },

  all() {
    return this._load();
  },

  find(id) {
    return this._load().find((u) => u.id === id);
  },

  existEmail(email) {
    const user = this._load().find((u) => u.email === email);

    if (user) {
      return true;
    }

    return false;
  },

  login(email, password) {
    const user = this.all().find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return { success: true, user: user };
    }
    return { success: false, user: null };
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("current_user") || "{}");
  }
};
