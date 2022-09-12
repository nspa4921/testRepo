import { emitCustomEvent } from "c/amEventUtils";
import { AmThemedElement } from "c/amThemedElement";
import { api } from "lwc";
export default class AmbBookingTheme extends AmThemedElement {
  /** Heading displayed in the meeting theme component
   */
  _heading = "";

  @api
  get heading() {
    return this._heading;
  }

  set heading(val) {
    this._heading = val;
  }
  /** Descriptive text placed below the heading and before selecting the relevant theme
   */

  _description = "";

  @api
  get description() {
    return this._description;
  }

  set description(val) {
    this._description = val;
  }
  /** Links to show
   */

  _themes = [];

  @api
  get themes() {
    return this._themes;
  }

  set themes(val) {
    this._themes = val;
  }
  /** Show the back button
   */

  _cangoback;

  @api
  get cangoback() {
    return this._cangoback;
  }

  set cangoback(val) {
    this._cangoback = val;
  }

  /** disables the heading and back option
  * @type {boolean}
  */
  _disableheader;

  @api
  get disableheader() {
      return this._disableheader;
  }
  
  set disableheader(val) {
      this._disableheader = val;
  }

  handleBackClick = (evt) => {
    evt.stopImmediatePropagation();
    emitCustomEvent(this, "back", null);
  };
  onThemeSelected = (evt) => {};
}