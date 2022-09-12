import { track, wire, api, LightningElement } from "lwc";
import getAccountFromSiteContext from "@salesforce/apex/AMBWrapperController.getAccountFromSiteContext";
export default class ambBookingExperienceFlow extends LightningElement {
  /** Determines the design tokens to be loaded
   * @type {string}
   */
  _brand;

  @api
  get brand() {
    return this._brand;
  }

  set brand(val) {
    this._brand = val;
  }

  /** Disables the progress bar
   * @type {boolean}
   */
  _disableprogressbar = false;

  @api
  get disableprogressbar() {
    return this._disableprogressbar;
  }

  set disableprogressbar(val) {
    this._disableprogressbar = val;
  }

  /** Disables the customer meetings screen
   * @type {boolean}
   */
  _disablecustomermeetings = false;

  @api
  get disablecustomermeetings() {
    return this._disablecustomermeetings;
  }

  set disablecustomermeetings(val) {
    this._disablecustomermeetings = val;
  }

  /** Disables the cancel meeting option
   * @type {boolean}
   */
  _disablecancelmeeting = false;

  @api
  get disablecancelmeeting() {
    return this._disablecancelmeeting;
  }

  set disablecancelmeeting(val) {
    this._disablecancelmeeting = val;
  }

  /** Disables the move meeting option
   * @type {boolean}
   */
  _disablereschedulemeeting = false;

  @api
  get disablereschedulemeeting() {
    return this._disablereschedulemeeting;
  }

  set disablereschedulemeeting(val) {
    this._disablereschedulemeeting = val;
  }

  /** Removes the close button from the booking confirmation
   * @type {boolean}
   */
  _removeclosebutton = false;

  @api
  get removeclosebutton() {
    return this._removeclosebutton;
  }

  set removeclosebutton(val) {
    this._removeclosebutton = val;
  }

  /** Start the flow on the planner with a give subtheme id
   * @type {string}
   */

  _subthemeid;

  @api
  get subthemeid() {
    return this._subthemeid;
  }

  set subthemeid(val) {
    this._subthemeid = val;
  }

  /**
   * @deprecated use subthemeid
   */
  @api
  get startwithsubthemeid() {
    return this._subthemeid;
  }

  set startwithsubthemeid(val) {
    this._subthemeid = val;
  }

  /** Force overrides of data driven attributes and default attributes in the customer facing solution
   * @type {{
   * meetingTypeWhitelist: ('Physical' | 'Online' | 'Telephone' | 'OffSite')[],
   * advisorOptionWhitelist: ('PrimaryAdvisor' | 'OtherAdvisors')[]}}
   */
  configoverride = {
    advisorOptionWhitelist: null,
    meetingTypeWhitelist: null
  };

  /** booking meeting id to reschedule or cancel
   * @type {string}
   */
  _meetingid;

  @api
  get meetingid() {
    return this._meetingid;
  }

  set meetingid(val) {
    this._meetingid = val;
  }

  /** Start the flow on the planner with a give subtheme id
   * @type {"withtheme" | "cancel" | "update"}
   */
  _customflow;

  @api
  get customflow() {
    return this._customflow;
  }

  set customflow(val) {
    this._customflow = val;
  }

  @track accountId;

  @track contactId;

  @wire(getAccountFromSiteContext)
  wiredGetAccount({ error, data }) {
    if (data) {
      this.accountId = data.accountId;
      this.contactId = data.contactId;
    } else if (error) {
      console.log(JSON.stringify(error));
    }
  }
}