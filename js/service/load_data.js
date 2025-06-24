import { cardComponent } from "../components/card.js";

import { serviceRepo } from "./context.js";

document.addEventListener("DOMContentLoaded", function () {
  cardComponent.init("cards-container", serviceRepo.all());
});
