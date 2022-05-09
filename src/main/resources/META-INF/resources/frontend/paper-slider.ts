import {css, html, LitElement} from 'lit';
import '@vaadin/button';
import '@vaadin/text-field';
import {property} from 'lit/decorators.js';

class PaperSlider extends LitElement {
  // @ts-ignore
  @property({type: Number}) min = 0;
  // @ts-ignore
  @property({type: Number}) max = 0;
  // @ts-ignore
  @property({type: String}) label = "";

  static styles = css`
  #label {
    align-self: flex-start;
    color: var(--lumo-secondary-text-color);
    font-weight: 500;
    font-size: var(--lumo-font-size-s);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
    line-height: 1;
    padding-right: 1em;
    padding-bottom: 0.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .slider-wrapper {
    display: flex;
    color: var(--lumo-secondary-text-color);
    font-size: var(--lumo-font-size-s);
    line-height: 1.4;
  }
  
  .paper-slider-container {
    display: grid;
  }
  .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
  `

  render() {
    return html`
            <div class="paper-slider-container noselect">
              <label style="display: none" class="noselect" id="label" for="paperSlider" aria-labelledby="label">${this.label}</label>
              <div class="slider-wrapper noselect"><input class="noselect" type="range" min="${this.min}" max="${this.max}" value="0" id="paperSlider"><div class="noselect" id="slider-value" style="display: none"></div></div>
            </div>`;
  }
}

customElements.define('paper-slider', PaperSlider);