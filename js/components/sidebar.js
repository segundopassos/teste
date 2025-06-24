function sideBar(items, sidebarId) {
  const currentPath = window.location.pathname;

  const logoutLink = "/logout";

  const container = document.createElement("div");

  const topBar = document.createElement("div");
  topBar.classList.add(
    "fixed",
    "z-50",
    "flex",
    "items-center",
    "justify-end",
    "w-full",
    "px-6",
    "py-4",
    "lg:hidden"
  );

  const span = document.createElement("span");
  span.classList.add("text-2xl", "cursor-pointer", "text-primary-dark");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");
  svg.setAttribute("viewBox", "0 0 30 30");
  svg.setAttribute("phx-click", `toggle_sidebar("#${sidebarId}")`);

  ["6", "13", "20"].forEach((y) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "4");
    rect.setAttribute("y", y);
    rect.setAttribute("width", "22");
    rect.setAttribute("height", "3");
    rect.setAttribute("fill", "black");
    svg.appendChild(rect);
  });

  span.appendChild(svg);
  topBar.appendChild(span);
  container.appendChild(topBar);

  const sidebar = document.createElement("div");
  sidebar.id = sidebarId;
  sidebar.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "z-40",
    "h-full",
    "px-2",
    "py-8",
    "mt-14",
    "lg:mt-0",
    "sidebar",
    "w-full",
    "md:w-64",
    "bg-green-700",
    "-translate-x-full",
    "lg:translate-x-0",
    "transition",
    "duration-200",
    "ease-linear"
  );

  const ul = document.createElement("ul");
  ul.classList.add("mt-8");

  items.forEach((item) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = item.to;

    link.classList.add(
      "inline-block",
      "w-full",
      "px-4",
      "py-3",
      "mt-1",
      "font-semibold",
      "rounded-full",
      "hover:bg-green-800",
      "hover:text-white",
      "transition-all",
      "duration-300",
      "ease-in-out"
    );

    console.log(item.to);
    if (currentPath === item.to || currentPath.startsWith(item.to + "/")) {
      link.classList.add("bg-green-800", "text-white");
    } else {
      link.classList.add("text-white");
    }

    link.textContent = item.title;
    li.appendChild(link);
    ul.appendChild(li);
  });

  sidebar.appendChild(ul);

  const logout = document.createElement("a");
  logout.href = "#";
  logout.id = "logout"
  logout.setAttribute("method", "delete");
  logout.classList.add(
    "absolute",
    "left-0",
    "right-0",
    "inline-block",
    "w-full",
    "px-4",
    "py-3",
    "mx-auto",
    "font-semibold",
    "text-center",
    "rounded-full",
    "cursor-pointer",
    "bottom-4",
    "text-white"
  );
  logout.textContent = "Sair do sistema";

  sidebar.appendChild(logout);

  container.appendChild(sidebar);
  document.getElementById("content").appendChild(container);

  document.getElementById("header_span").addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    sidebar.classList.toggle("translate-x-0");
  });
}
