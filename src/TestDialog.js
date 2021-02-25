import { firstRender, render } from "../node_modules/elix/src/base/internal";
import Dialog from "../node_modules/elix/src/plain/PlainDialog.js";

class TestDialog extends Dialog {
  [render](changed) {
    super[render](changed);

    if (this[firstRender]) {
      this.addEventListener("headerchange", (event) => {
        const { header } = event.detail;
        this.setAttribute("aria-label", header);
      });
    }
  }
}

customElements.define("test-dialog", TestDialog);
