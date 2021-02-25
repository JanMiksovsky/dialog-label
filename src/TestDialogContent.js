import {
  defaultState,
  ids,
  render,
  rendered,
  setState,
  state,
  template,
} from "../node_modules/elix/src/base/internal";
import { templateFrom } from "../node_modules/elix/src/core/htmlLiterals";
import ReactiveElement from "../node_modules/elix/src/core/ReactiveElement.js";

class TestDialogContent extends ReactiveElement {
  get [defaultState]() {
    return Object.assign(super[defaultState], {
      header: "",
    });
  }

  get header() {
    return this[state].header;
  }
  set header(header) {
    this[setState]({ header });
  }

  [render](changed) {
    super[render](changed);

    // if (this[firstRender]) {
    //   this[ids].headerSlot.addEventListener("slotchange", () => {
    //     const header = getHeaderText(this[ids].headerSlot);
    //     this.dispatchEvent(
    //       new CustomEvent("headerchange", {
    //         bubbles: true,
    //         detail: {
    //           header,
    //         },
    //       })
    //     );
    //   });
    // }

    if (changed.header) {
      this[ids].header.textContent = this[state].header;
    }
  }

  [rendered](changed) {
    super[rendered](changed);

    if (changed.header) {
      const { header } = this[state];
      this.dispatchEvent(
        new CustomEvent("headerchange", {
          bubbles: true,
          detail: {
            header,
          },
        })
      );
    }
  }

  get [template]() {
    return templateFrom.html`
      <style>
        :host {
          padding: 1em;
        }
      </style>
      <h1 id="header"></h1>
      <!-- <slot id="headerSlot" name="header"></slot> -->
      <slot></slot>
    `;
  }
}

function getHeaderText(slot) {
  const nodes = slot.assignedNodes({ deep: true });
  const text = nodes.map((node) => node.textContent).join(" ");
  return text.trim();
}

customElements.define("test-dialog-content", TestDialogContent);
