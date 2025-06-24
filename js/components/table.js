export function createTable({
  id,
  columns,
  rows,
  actions = [],
  rowClick = null,
  rowId = null,
  renderCell,
  renderAction,
}) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "w-full",
    "rounded-lg",
    "border",
    "border-neutral-100",
    "overflow-y-auto",
    "overflow-x-auto",
    "p-4"
  );

  const table = document.createElement("table");
  table.classList.add("w-full", "border-collapse", "rounded-lg");

  const thead = document.createElement("thead");
  thead.classList.add("border-b", "border-neutral-100");
  const headerRow = document.createElement("tr");

  columns.forEach((col) => {
    const th = document.createElement("th");
    th.classList.add("px-3", "py-4", "text-left", "text-blue-dark");
    th.textContent = col.label;
    headerRow.appendChild(th);
  });

  if (actions.length > 0) {
    const th = document.createElement("th");
    th.classList.add("relative", "p-0", "pb-4");
    const span = document.createElement("span");
    span.classList.add("sr-only");
    span.textContent = "Ações";
    th.appendChild(span);
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // TBody
  const tbody = document.createElement("tbody");
  tbody.id = id;
  tbody.classList.add(
    "relative",
    "divide-y",
    "divide-neutral-100",
    "border-t",
    "border-neutral-100"
  );

  if (rows.length === 0) {
    const emptyRow = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("colspan", columns.length);
    td.classList.add("text-center", "px-3", "py-4", "text-neutral-600");
    td.textContent = "Nenhum dado encontrado para a pesquisa";
    emptyRow.appendChild(td);
    tbody.appendChild(emptyRow);
  } else {
    rows.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.classList.add("group");

      if (index % 2 === 0) {
        tr.style.backgroundColor = "#f8fafc";
      }

      tr.classList.add("hover:bg-neutral-100/20");
      if (rowId) tr.id = rowId(row);

      columns.forEach((col) => {
        const td = document.createElement("td");
        td.classList.add(
          "relative",
          "px-3",
          "py-4",
          "text-left",
          "text-neutral-600"
        );
        if (rowClick) {
          td.classList.add("hover:cursor-pointer");
          td.addEventListener("click", () => rowClick(row));
        }

        const content = renderCell(col, row);

        if (typeof content === "string" || typeof content === "number") {
          td.textContent = content;
        } else if (content !== undefined) {
          td.appendChild(content);
        }

        tr.appendChild(td);
      });

      if (actions.length > 0) {
        const td = document.createElement("td");
        td.classList.add("relative", "w-14", "p-0");
        const actionWrapper = document.createElement("div");
        actionWrapper.classList.add(
          "relative",
          "whitespace-nowrap",
          "py-4",
          "text-right"
        );

        actions.forEach((action) => {
          const span = document.createElement("span");
          span.classList.add(
            "relative",
            "ml-4",
            "font-semibold",
            "leading-6",
            "text-neutral-900",
            "hover:text-neutral-600"
          );

          const content = renderAction(action, row);
          if (typeof content === "string") {
            span.textContent = content;
          } else if (content !== undefined) {
            span.appendChild(content);
          }

          actionWrapper.appendChild(span);
        });

        td.appendChild(actionWrapper);
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });
  }

  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}
