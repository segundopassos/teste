import { Service } from "./service.js";

export const serviceRepo = {
  _load() {
    return JSON.parse(localStorage.getItem("service_repo") || "[]");
  },

  _save(repo) {
    localStorage.setItem("service_repo", JSON.stringify(repo));
  },

  insert(data) {
    Service.changeset(data);
    if (!Service.is_valid()) {
      return { ok: false, errors: Service.errors };
    }

    const repo = this._load();
    const service = {
      ...data,
      id: repo.length ? repo[repo.length - 1].id + 1 : 1,
    };

    repo.push(service);
    this._save(repo);
    return { ok: true, service };
  },

  update(id, data) {
    const repo = this._load();
    const index = repo.findIndex((u) => u.id === id);
    if (index === -1) return { ok: false, error: "Serviço não encontrado" };

    const updated = { ...repo[index], ...data };
    const parse = Service.changeset(updated);
    if (!parse.is_valid()) {
      return { ok: false, errors: Service.errors };
    }

    repo[index] = { ...parse.data, id };
    this._save(repo);
    return { ok: true, service: repo[index] };
  },

  delete(id) {
    let repo = this._load();
    const initialLength = repo.length;
    repo = repo.filter((u) => u.id !== id);
    if (repo.length === initialLength)
      return { ok: false, error: "Serviço não encontrado" };

    this._save(repo);
    return { ok: true };
  },

  all() {
    return this._load();
  },

  find(id) {
    return this._load().find((u) => u.id === id);
  },

  translateServiceType(service_type) {
    const services = {
      marketing: "Marketing",
      design: "Design gráfico",
      website: "Desenvolvimento Web / Criação de Sites",
      developer: "Desenvolvedor",
      software_design: "Modelagem de software",
      social_media: "Social Media / Gestão de Redes Sociais",
      education: "Educação / Reforço Escolar / Aulas Particulares",
      edition_video: "Edição de Vídeos / Pós-produção de Conteúdo Audiovisual",
      
    };

    return services[service_type] || service_type;
  },
};
