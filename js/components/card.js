export const cardComponent = {
  container: null,
  data: [],

  init(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.render();
  },

  render() {
    this.container.innerHTML = "";

    this.data.forEach((item) => {
      const card = document.createElement("div");
      card.className =
        "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-white p-4 rounded shadow cursor-pointer";

      const placeholder = document.createElement("div");
      if (item.url) {
        const image = document.createElement("img");

        image.src = item.url;

        placeholder.appendChild(image);
      } else {
        placeholder.className = "h-32 bg-gray-300 rounded mb-4";
      }
      card.appendChild(placeholder);

      const rating = document.createElement("div");
      rating.className = "text-orange-500 text-sm mb-1";
      rating.textContent = `★ 5`;
      card.appendChild(rating);

      const title = document.createElement("h3");
      title.className = "font-semibold text-gray-800";
      title.textContent = item.title;
      card.appendChild(title);

      const author = document.createElement("p");
      author.className = "text-sm text-gray-600 mb-2";
      author.textContent = `por ${item.author || "Sem autor"}`;
      card.appendChild(author);

      const description = document.createElement("p");
      description.className = "text-sm text-gray-500 mb-4 truncate";
      description.textContent = item.about;
      card.appendChild(description);

      const price = document.createElement("div");
      price.className = "text-gray-800 font-semibold";
      price.textContent = `R$ ${item.price || 0}`;
      card.appendChild(price);

      card.addEventListener("click", () => {
        window.location.href = `show_service.html?id=${item.id}`;
      });

      this.container.appendChild(card);
    });
  },
};
