import {css, html, LitElement} from 'lit';
import '@vaadin/button';
import '@vaadin/text-field';
import {property} from 'lit/decorators.js';
import {MDCSlider} from '@material/slider';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';

class PaperSlider extends LitElement {
  // @ts-ignore
  @property({type: Number}) min = 0;
  // @ts-ignore
  @property({type: Number}) max = 100;
  // @ts-ignore
  @property({type: Number}) value = 0;
  // @ts-ignore
  @property({type: Number}) step;
  // @ts-ignore
  @property({type: String}) primarycolor;
  // @ts-ignore
  @property({type: Boolean}) showValue = false;
  // @ts-ignore
  @property({type: Boolean}) isDisabled = false;

  static styles = css`
@keyframes mdc-ripple-fg-radius-in {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);
  }
  to {
    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
  }
}
@keyframes mdc-ripple-fg-opacity-in {
  from {
    animation-timing-function: linear;
    opacity: 0;
  }
  to {
    opacity: var(--mdc-ripple-fg-opacity, 0);
  }
}
@keyframes mdc-ripple-fg-opacity-out {
  from {
    animation-timing-function: linear;
    opacity: var(--mdc-ripple-fg-opacity, 0);
  }
  to {
    opacity: 0;
  }
}
.mdc-slider__thumb {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
}
.mdc-slider__thumb::before, .mdc-slider__thumb::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}
.mdc-slider__thumb::before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
  /* @alternate */
  z-index: var(--mdc-ripple-z-index, 1);
}
.mdc-slider__thumb::after {
  z-index: 0;
  /* @alternate */
  z-index: var(--mdc-ripple-z-index, 0);
}
.mdc-slider__thumb.mdc-ripple-upgraded::before {
  transform: scale(var(--mdc-ripple-fg-scale, 1));
}
.mdc-slider__thumb.mdc-ripple-upgraded::after {
  top: 0;
  /* @noflip */ /*rtl:ignore*/
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}
.mdc-slider__thumb.mdc-ripple-upgraded--unbounded::after {
  top: var(--mdc-ripple-top, 0);
  /* @noflip */ /*rtl:ignore*/
  left: var(--mdc-ripple-left, 0);
}
.mdc-slider__thumb.mdc-ripple-upgraded--foreground-activation::after {
  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;
}
.mdc-slider__thumb.mdc-ripple-upgraded--foreground-deactivation::after {
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
}
.mdc-slider__thumb::before, .mdc-slider__thumb::after {
  top: calc(50% - 50%);
  /* @noflip */ /*rtl:ignore*/
  left: calc(50% - 50%);
  width: 100%;
  height: 100%;
}
.mdc-slider__thumb.mdc-ripple-upgraded::before, .mdc-slider__thumb.mdc-ripple-upgraded::after {
  top: var(--mdc-ripple-top, calc(50% - 50%));
  /* @noflip */ /*rtl:ignore*/
  left: var(--mdc-ripple-left, calc(50% - 50%));
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}
.mdc-slider__thumb.mdc-ripple-upgraded::after {
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}
.mdc-slider__thumb::before, .mdc-slider__thumb::after {
  background-color: #6200ee;
  /* @alternate */
  background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));
}
.mdc-slider__thumb:hover::before, .mdc-slider__thumb.mdc-ripple-surface--hover::before {
  opacity: 0.04;
  /* @alternate */
  opacity: var(--mdc-ripple-hover-opacity, 0.04);
}
.mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before, .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before {
  transition-duration: 75ms;
  opacity: 0.12;
  /* @alternate */
  opacity: var(--mdc-ripple-focus-opacity, 0.12);
}
.mdc-slider__thumb:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.12;
  /* @alternate */
  opacity: var(--mdc-ripple-press-opacity, 0.12);
}
.mdc-slider__thumb.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);
}

.mdc-slider {
  cursor: pointer;
  height: 48px;
  margin: 0 24px;
  position: relative;
  touch-action: pan-y;
}
.mdc-slider .mdc-slider__track {
  height: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.mdc-slider .mdc-slider__track--active,
.mdc-slider .mdc-slider__track--inactive {
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
}
.mdc-slider .mdc-slider__track--active {
  border-radius: 3px;
  height: 6px;
  overflow: hidden;
  top: -1px;
}
.mdc-slider .mdc-slider__track--active_fill {
  border-top: 6px solid;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  /* @noflip */ /*rtl:ignore*/
  -webkit-transform-origin: left;
  /* @noflip */ /*rtl:ignore*/
  transform-origin: left;
}
[dir=rtl] .mdc-slider .mdc-slider__track--active_fill, .mdc-slider .mdc-slider__track--active_fill[dir=rtl] {
  /*rtl:begin:ignore*/
  /* @noflip */ /*rtl:ignore*/
  -webkit-transform-origin: right;
  /* @noflip */ /*rtl:ignore*/
  transform-origin: right;
  /*rtl:end:ignore*/
}

.mdc-slider .mdc-slider__track--inactive {
  border-radius: 2px;
  height: 4px;
  left: 0;
  top: 0;
}
.mdc-slider .mdc-slider__track--inactive::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
@media screen and (forced-colors: active) {
  .mdc-slider .mdc-slider__track--inactive::before {
    border-color: CanvasText;
  }
}
.mdc-slider .mdc-slider__track--active_fill {
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mdc-theme-primary, #6200ee);
}
.mdc-slider.mdc-slider--disabled .mdc-slider__track--active_fill {
  border-color: #000;
  /* @alternate */
  border-color: var(--mdc-theme-on-surface, #000);
}
.mdc-slider .mdc-slider__track--inactive {
  background-color: #6200ee;
  /* @alternate */
  background-color: var(--mdc-theme-primary, #6200ee);
  opacity: 0.24;
}
.mdc-slider.mdc-slider--disabled .mdc-slider__track--inactive {
  background-color: #000;
  /* @alternate */
  background-color: var(--mdc-theme-on-surface, #000);
  opacity: 0.24;
}
.mdc-slider .mdc-slider__value-indicator-container {
  bottom: 44px;
  /* @noflip */ /*rtl:ignore*/
  left: 50%;
  /* @alternate */
  /* @noflip */ /*rtl:ignore*/
  left: var(--slider-value-indicator-container-left, 50%);
  pointer-events: none;
  position: absolute;
  /* @noflip */ /*rtl:ignore*/
  right: var(--slider-value-indicator-container-right);
  transform: translateX(-50%);
  /* @alternate */
  transform: var(--slider-value-indicator-container-transform, translateX(-50%));
}
.mdc-slider .mdc-slider__value-indicator {
  transition: transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 32px;
  padding: 0 12px;
  transform: scale(0);
  transform-origin: bottom;
}
.mdc-slider .mdc-slider__value-indicator::before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid;
  bottom: -5px;
  content: "";
  height: 0;
  /* @noflip */ /*rtl:ignore*/
  left: 50%;
  /* @alternate */
  /* @noflip */ /*rtl:ignore*/
  left: var(--slider-value-indicator-caret-left, 50%);
  position: absolute;
  /* @noflip */ /*rtl:ignore*/
  right: var(--slider-value-indicator-caret-right);
  transform: translateX(-50%);
  /* @alternate */
  transform: var(--slider-value-indicator-caret-transform, translateX(-50%));
  width: 0;
}
.mdc-slider .mdc-slider__value-indicator::after {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
@media screen and (forced-colors: active) {
  .mdc-slider .mdc-slider__value-indicator::after {
    border-color: CanvasText;
  }
}
.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container {
  pointer-events: auto;
}
.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator {
  transition: transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1);
}
@media (prefers-reduced-motion) {
  .mdc-slider .mdc-slider__value-indicator,
  .mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator {
    transition: none;
  }
}
.mdc-slider .mdc-slider__value-indicator-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, sans-serif;
  /* @alternate */
  font-family: var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
  font-size: 0.875rem;
  /* @alternate */
  font-size: var(--mdc-typography-subtitle2-font-size, 0.875rem);
  line-height: 1.375rem;
  /* @alternate */
  line-height: var(--mdc-typography-subtitle2-line-height, 1.375rem);
  font-weight: 500;
  /* @alternate */
  font-weight: var(--mdc-typography-subtitle2-font-weight, 500);
  letter-spacing: 0.0071428571em;
  /* @alternate */
  letter-spacing: var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);
  text-decoration: inherit;
  /* @alternate */
  text-decoration: var(--mdc-typography-subtitle2-text-decoration, inherit);
  text-transform: inherit;
  /* @alternate */
  text-transform: var(--mdc-typography-subtitle2-text-transform, inherit);
}
.mdc-slider .mdc-slider__value-indicator {
  background-color: #000;
  opacity: 0.6;
}
.mdc-slider .mdc-slider__value-indicator::before {
  border-top-color: #000;
}
.mdc-slider .mdc-slider__value-indicator {
  color: #fff;
  /* @alternate */
  color: var(--mdc-theme-on-primary, #fff);
}
.mdc-slider .mdc-slider__thumb {
  display: flex;
  height: 48px;
  /* @noflip */ /*rtl:ignore*/
  left: -24px;
  outline: none;
  position: absolute;
  user-select: none;
  width: 48px;
}
.mdc-slider .mdc-slider__thumb--top {
  z-index: 1;
}
.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob, .mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob, .mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob {
  border-style: solid;
  border-width: 1px;
  box-sizing: content-box;
}
.mdc-slider .mdc-slider__thumb-knob {
  /* @alternate */
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border: 10px solid;
  border-radius: 50%;
  box-sizing: border-box;
  height: 20px;
  /* @noflip */ /*rtl:ignore*/
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
}
.mdc-slider .mdc-slider__thumb-knob {
  background-color: #6200ee;
  /* @alternate */
  background-color: var(--mdc-theme-primary, #6200ee);
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mdc-theme-primary, #6200ee);
}
.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob, .mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob, .mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob {
  border-color: #fff;
}
.mdc-slider.mdc-slider--disabled .mdc-slider__thumb-knob {
  background-color: #000;
  /* @alternate */
  background-color: var(--mdc-theme-on-surface, #000);
  border-color: #000;
  /* @alternate */
  border-color: var(--mdc-theme-on-surface, #000);
}
.mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top .mdc-slider__thumb-knob, .mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob, .mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob {
  border-color: #fff;
}
.mdc-slider .mdc-slider__thumb::before, .mdc-slider .mdc-slider__thumb::after {
  background-color: #6200ee;
  /* @alternate */
  background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));
}
.mdc-slider .mdc-slider__thumb:hover::before, .mdc-slider .mdc-slider__thumb.mdc-ripple-surface--hover::before {
  opacity: 0.04;
  /* @alternate */
  opacity: var(--mdc-ripple-hover-opacity, 0.04);
}
.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before, .mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before {
  transition-duration: 75ms;
  opacity: 0.12;
  /* @alternate */
  opacity: var(--mdc-ripple-focus-opacity, 0.12);
}
.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.12;
  /* @alternate */
  opacity: var(--mdc-ripple-press-opacity, 0.12);
}
.mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);
}
.mdc-slider .mdc-slider__tick-marks {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 1px;
  position: absolute;
  width: 100%;
}
.mdc-slider .mdc-slider__tick-mark--active,
.mdc-slider .mdc-slider__tick-mark--inactive {
  border-radius: 50%;
  height: 2px;
  width: 2px;
}
.mdc-slider .mdc-slider__tick-mark--active {
  background-color: #fff;
  /* @alternate */
  background-color: var(--mdc-theme-on-primary, #fff);
  opacity: 0.6;
}
.mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--active {
  background-color: #fff;
  /* @alternate */
  background-color: var(--mdc-theme-on-primary, #fff);
  opacity: 0.6;
}
.mdc-slider .mdc-slider__tick-mark--inactive {
  background-color: #6200ee;
  /* @alternate */
  background-color: var(--mdc-theme-primary, #6200ee);
  opacity: 0.6;
}
.mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--inactive {
  background-color: #000;
  /* @alternate */
  background-color: var(--mdc-theme-on-surface, #000);
  opacity: 0.6;
}
.mdc-slider--discrete .mdc-slider__thumb,
.mdc-slider--discrete .mdc-slider__track--active_fill {
  transition: transform 80ms ease;
}
@media (prefers-reduced-motion) {
  .mdc-slider--discrete .mdc-slider__thumb,
  .mdc-slider--discrete .mdc-slider__track--active_fill {
    transition: none;
  }
}

.mdc-slider--disabled {
  opacity: 0.38;
  cursor: auto;
}
.mdc-slider--disabled .mdc-slider__thumb {
  pointer-events: none;
}

.mdc-slider__input {
  cursor: pointer;
  left: 0;
  margin: 0;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}
`

  // render() {
  //   return html`
  //           <div class="paper-slider-container noselect">
  //             <label style="display: none" class="noselect" id="label" for="paperSlider" aria-labelledby="label">${this.label}</label>
  //             <div class="slider-wrapper noselect"><input class="noselect" type="range" min="${this.min}" max="${this.max}" value="0" id="paperSlider"><div class="noselect" id="slider-value" style="display: none"></div></div>
  //           </div>`;
  // }
  //

  //global variable k of type any
  // @ts-ignore
  slider: MDCSlider;


  constructor() {
    super();
    this.afterDone();
  }


  async afterDone(){
    await this.updateComplete;
    this.slider = new MDCSlider(this.shadowRoot?.querySelector('.mdc-slider')!);
    this.slider.listen('MDCSlider:change', () => {
      // @ts-ignore
      this.$server.valueChangedEvent(this.slider.getValue());
    });
    this.onVisible(this.shadowRoot?.querySelector('.mdc-slider'), (element) => {console.log("element visible!");this.slider.layout()})
  }

  onVisible(element: any, callback: (element: any) => any) {
    new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
          callback(element);
          observer.disconnect();
        }
      });
    }).observe(element);
  }

  changeValue(newValue: number){
    if (this.slider)
      this.slider.setValue(newValue);
  }

  render() {
    return html`
      ${when(this.primarycolor, () => html`<style>:host { --mdc-theme-primary: ${this.primarycolor}}</style>`)}
      <div class="mdc-slider ${this.showValue ? 'mdc-slider--discrete' : ''} ${this.step ? 'mdc-slider--tick-marks' : ''} ${this.isDisabled ? 'mdc-slider--disabled' : ''}">
        <input class="mdc-slider__input" id="paperSlider" type="range" min="${this.min}" max="${this.max}" value="${this.value}" step="${ifDefined(this.step)}" aria-label="tadsfsadf">
        <div class="mdc-slider__track">
          <div class="mdc-slider__track--inactive"></div>
          <div class="mdc-slider__track--active">
            <div class="mdc-slider__track--active_fill"></div>
          </div>
          ${when(this.step, () => html`<div class="mdc-slider__tick-marks"></div>`)}
        </div>
        <div class="mdc-slider__thumb">
          <div class="mdc-slider__value-indicator-container" aria-hidden="true">
            ${when(this.showValue, () => html`
              <div class="mdc-slider__value-indicator">
              <span class="mdc-slider__value-indicator-text"></span>
            </div>`)}
          </div>
          <div class="mdc-slider__thumb-knob"></div>
        </div>
      </div>`;
  }


}

customElements.define('paper-slider', PaperSlider);