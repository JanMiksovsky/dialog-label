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
      heading: "",
    });
  }

  get heading() {
    return this[state].heading;
  }
  set heading(heading) {
    this[setState]({ heading });
  }

  [render](changed) {
    super[render](changed);

    // if (this[firstRender]) {
    //   this[ids].headingSlot.addEventListener("slotchange", () => {
    //     const heading = getheadingText(this[ids].headingSlot);
    //     this.dispatchEvent(
    //       new CustomEvent("headingchange", {
    //         bubbles: true,
    //         detail: {
    //           heading,
    //         },
    //       })
    //     );
    //   });
    // }

    if (changed.heading) {
      this[ids].heading.textContent = this[state].heading;
    }
  }

  [rendered](changed) {
    super[rendered](changed);

    if (changed.heading) {
      const { heading } = this[state];
      this.dispatchEvent(
        new CustomEvent("headingchange", {
          bubbles: true,
          detail: {
            heading,
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
      <h1 id="heading"></h1>
      <!-- <slot id="headingSlot" name="heading"></slot> -->
      <slot></slot>
    `;
  }
}

function getheadingText(slot) {
  const nodes = slot.assignedNodes({ deep: true });
  const text = nodes.map((node) => node.textContent).join(" ");
  return text.trim();
}

customElements.define("test-dialog-content", TestDialogContent);
