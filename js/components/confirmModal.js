const ConfirmModal = {
  modal: null,
  messageEl: null,
  cancelBtn: null,
  okBtn: null,

  create(showCancelButton) {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50";
    overlay.id = "confirmModal";

    const box = document.createElement("div");
    box.className = "bg-white rounded-lg shadow-lg p-6 w-full max-w-md";

    const title = document.createElement("h2");
    title.className = "text-xl font-semibold mb-4 text-gray-800";
    title.textContent = "Confirmação";

    const message = document.createElement("p");
    message.className = "text-gray-600 mb-6";

    const buttonRow = document.createElement("div");
    buttonRow.className = "flex justify-end space-x-4";

    const cancelBtn = document.createElement("button");
    cancelBtn.className =
      "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700";
    cancelBtn.textContent = "Cancelar";

    const okBtn = document.createElement("button");
    okBtn.className =
      "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
    okBtn.textContent = "Confirmar";

    if (showCancelButton) {
      buttonRow.appendChild(cancelBtn);
    }
    buttonRow.appendChild(okBtn);
    box.appendChild(title);
    box.appendChild(message);
    box.appendChild(buttonRow);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    this.modal = overlay;
    this.messageEl = message;
    this.cancelBtn = cancelBtn;
    this.okBtn = okBtn;
  },

  show(message = "Tem certeza?", showCancelButton = true) {
    if (!this.modal) {
      this.create(showCancelButton);
    }

    this.messageEl.textContent = message;
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");

    return new Promise((resolve) => {
      const close = (result) => {
        this.modal.classList.add("hidden");
        this.modal.classList.remove("flex");
        this.okBtn.onclick = null;
        this.cancelBtn.onclick = null;
        resolve(result);
      };

      this.cancelBtn.onclick = () => close(false);
      this.okBtn.onclick = () => close(true);
    });
  },
};
