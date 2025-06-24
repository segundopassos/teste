import { serviceRepo } from "./../service/context.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const service = serviceRepo.find(parseInt(id));

    if (!service) {
      window.location.href = "/pages/user/index.html";
    } else {
      const title = document.getElementById("title");
      title.innerHTML = service.title;

      const mainImage = document.getElementById("main_image");

      if (service.url) {
        const image = document.createElement("img");

        image.src = service.url;
        image.classList.add("h-full");
        image.classList.add("w-full");
        image.classList.add("rounded-md");

        mainImage.appendChild(image);
      } else {
        mainImage.classList.add("bg-gray-300");
      }

      const profile = document.getElementById("profile");

      if (service.url) {
        const image = document.createElement("img");

        image.src = service.url;
        image.classList.add("h-full");
        image.classList.add("w-full");
        image.classList.add("rounded-full");

        profile.appendChild(image);
      } else {
        profile.classList.add("bg-gray-400");
      }

      const name = document.getElementById("name");
      name.innerHTML = service.author;

      const service_type = document.getElementById("service_type");
      service_type.innerHTML = serviceRepo.translateServiceType(
        service.service_type
      );

      const about = document.getElementById("about");
      about.innerHTML = service.about;

      const availability = document.getElementById("availability");

      if (
        typeof service.availability === "string" ||
        service.availability instanceof String
      ) {
        const li = document.createElement("li");
        li.innerHTML = `🟢 ${service.availability}`;
        li.classList.add("capitalize");

        availability.appendChild(li);
      } else {
        service.availability.forEach((data) => {
          const li = document.createElement("li");
          li.innerHTML = `🟢 ${data}`;
          li.classList.add("capitalize");

          availability.appendChild(li);
        });

        const tools = document.getElementById("tools");
        tools.innerHTML = service.tools;
      }
    }
  },
  false
);
