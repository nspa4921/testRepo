import { LightningElement, api, wire, track } from "lwc";
import getAccountFromRecordContext from "@salesforce/apex/AMBWrapperController.getAccountFromRecordContext";
export default class AmbBookingRecordPageFlow extends LightningElement {
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

  /** Disables the option to add additional contacts on the booking-page
   * @type {boolean}
   */
  _disableadditionalcontacts = false;

  @api
  get disableadditionalcontacts() {
    return this._disableadditionalcontacts;
  }

  set disableadditionalcontacts(val) {
    this._disableadditionalcontacts = val;
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

  @api recordId; //magically set, if within a record context
  @api objectApiName; //same as above but with record name
  @api flexipageRegionWidth; // used to make component width aware, and dependent on were it is inserted, values: SMALL/MEDIUM/LARGE
  @track accountId;
  @track contactId;

  @wire(getAccountFromRecordContext, {
    recordId: "$recordId",
    objectApiName: "$objectApiName"
  })
  wiredGetAccount({ error, data }) {
    if (data) {
      this.accountId = data.accountId;
      this.contactId = data.contactId;
    } else if (error) {
      console.log(JSON.stringify(error));
    }
  }
}