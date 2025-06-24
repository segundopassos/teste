import { userRepo } from "./../js/user/context.js";
import { serviceRepo } from "./../js/service/context.js";
import { agreementRepo } from "./../js/agreement/context.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const data = JSON.parse(localStorage.getItem("seeds") || "{}");

    // Valida se não foi cadastrado nada
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      userRepo.insert({
        name: "Usuário de teste",
        email: "usuario@usuario.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okRute, user: rute } = userRepo.insert({
        name: "Rute Hort",
        email: "rute.hort@exemplo.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okYasmin, user: yasmin } = userRepo.insert({
        name: "Yasmin Carvalho",
        email: "yasmin.carvalho@exemplo.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okMaria, user: maria } = userRepo.insert({
        name: "Maria Ticiane",
        email: "maria.ticiane@exemplo.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okRian, user: rian } = userRepo.insert({
        name: "Rian Wallissom",
        email: "rian.wallissom@exemplo.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okVictor, user: victor } = userRepo.insert({
        name: "Victor Gabriel",
        email: "victor.gabriel@exemplo.com",
        password: "123123",
        userType: "user",
      });

      const { ok: okServiceRute, service: serviceRute } = serviceRepo.insert({
        title: "Gravação Profissional para Vídeos Publicitários",
        service_type: "marketing",
        price: 200,
        about:
          "Sou criadora de conteúdo especializada em produção de vídeos publicitários que realmente chamam a atenção. Minha missão é transformar roteiros simples em vídeos que vendem, emocionam ou engajam – seja para redes sociais, campanhas de vendas ou anúncios institucionais.",
        availability: ["segunda", "terca", "quarta", "sexta", "sabado"],
        tools:
          "Edição dinâmica, captação de áudio de qualidade, roteiros otimizados com copywriting, gravação em Full HD ou 4K, estilo personalizado, versões para Reels, Shorts, TikTok e Stories",
        user_id: rute.id,
        url: "../../images/gravação_de_videos.png",
        author: rute.name,
      });

      const { ok: okServiceYasmin, service: serviceYasmin } =
        serviceRepo.insert({
          title: "Gestão de Redes Sociais – Estratégia, Conteúdo e Engajamento",
          service_type: "social_media",
          price: 250,
          about:
            "Trabalho com planejamento de conteúdo, criação de posts estratégicos e desenvolvimento de campanhas que realmente geram engajamento e crescimento de seguidores. Minha missão é transformar perfis comuns em páginas que vendem, inspiram e se conectam com o público.",
          availability: ["segunda", "terca", "quarta", "sexta", "sabado"],
          tools:
            "Calendário de postagens, edição com Canva/CapCut/InShot, copywriting para legendas, análise de engajamento, estratégias de crescimento orgânico, reels criativos",
          user_id: yasmin.id,
          url: "../../images/social_midia.png",
          author: yasmin.name,
        });

      const { ok: okServiceMaria, service: serviceMaria } = serviceRepo.insert({
        title:
          "Aulas de Reforço de Matemática – Entenda de Verdade e Tire Suas Dúvidas com Maria Ticiane",
        service_type: "education",
        price: 100,
        about:
          "Dou aulas de reforço com linguagem simples, exemplos práticos e explicações passo a passo. Meu foco é ajudar cada aluno a entender o conteúdo de forma leve, sem pressão e no ritmo dele.",
        availability: ["segunda", "terca", "quarta", "sexta", "sabado"],
        tools:
          "Explicações didáticas, exemplos reais, material de apoio exclusivo, simulados, acompanhamento de progresso, revisões pré-prova",
        user_id: maria.id,
        url: "../../images/aula_de_matematica.png",
        author: maria.name,
      });

      const { ok: okServiceRian, service: serviceRian } = serviceRepo.insert({
        title:
          "Edição Profissional de Vídeos – Transforme Gravações em Conteúdo de Impacto com Rian Wallisson",
        service_type: "edition_video",
        price: 150,
        about:
          "Faço edições dinâmicas, com cortes inteligentes, transições criativas e toque profissional que prende a atenção. Transformo gravações em conteúdo engajador para redes sociais e campanhas.",
        availability: ["segunda", "terca", "quarta", "sexta", "sabado"],
        tools:
          "Cortes dinâmicos, legendas animadas, transições modernas, tratamento de áudio, adaptação para Instagram/TikTok/YouTube, feedback em tempo real",
        user_id: rian.id,
        url: "../../images/edição_videos.png",
        author: rian.name,
      });

      const { ok: okServiceVitor, service: serviceVitor } = serviceRepo.insert({
        title:
          "Criação de Sites Profissionais – Design Responsivo e Personalizado com Victor Gabriel",
        service_type: "website",
        price: 500,
        about:
          "Desenvolvo sites rápidos, responsivos e modernos, focando na melhor experiência do usuário. Sites institucionais, portfólios, landing pages e mais, com performance e visual de alto nível.",
        availability: ["segunda", "terca", "quarta", "sexta", "sabado"],
        tools:
          "HTML5, CSS3, Tailwind CSS, design responsivo, layout personalizado, SEO básico, integração com redes sociais e formulários",
        user_id: victor.id,
        url: "../../images/criação_de_sites.png",
        author: victor.name,
      });

      const { ok: okEmpresa, user: company } = userRepo.insert({
        name: "Empresa de teste",
        email: "empresa@empresa.com",
        password: "123123",
        userType: "company",
      });

      agreementRepo.insert({
        company_name: company.name,
        company_id: company.id,
        title: serviceRute.title,
        price: parseFloat(serviceRute.price),
        user_id: rute.id,
        service_type: serviceRute.service_type,
        status: "pending",
      });

      agreementRepo.insert({
        company_name: company.name,
        company_id: company.id,
        title: serviceYasmin.title,
        price: parseFloat(serviceYasmin.price),
        user_id: yasmin.id,
        service_type: serviceYasmin.service_type,
        status: "pending",
      });

      agreementRepo.insert({
        company_name: company.name,
        company_id: company.id,
        title: serviceMaria.title,
        price: parseFloat(serviceMaria.price),
        user_id: maria.id,
        service_type: serviceMaria.service_type,
        status: "pending",
      });

      agreementRepo.insert({
        company_name: company.name,
        company_id: company.id,
        title: serviceRian.title,
        price: parseFloat(serviceRian.price),
        user_id: rian.id,
        service_type: serviceRian.service_type,
        status: "pending",
      });

      agreementRepo.insert({
        company_name: company.name,
        company_id: company.id,
        title: serviceVitor.title,
        price: parseFloat(serviceVitor.price),
        user_id: victor.id,
        service_type: serviceVitor.service_type,
        status: "pending",
      });

      agreementRepo.removeAlert();

      localStorage.setItem("seeds", JSON.stringify({ seeds: true }));
    }
  },
  false
);
