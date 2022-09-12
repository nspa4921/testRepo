import { emitCustomEvent } from "c/amEventUtils";
import { AmThemedElement } from "c/amThemedElement";
import { api } from "lwc";
export default class AmbCustomerMeetings extends AmThemedElement {
  /** Header text
   */
  _heading;

  @api
  get heading() {
    return this._heading;
  }

  set heading(val) {
    this._heading = val;
  }
  /** The description below the heading
   */

  _description;

  @api
  get description() {
    return this._description;
  }

  set description(val) {
    this._description = val;
  }
  /** The list of meetings
   */

  _meetings = [];

  @api
  get meetings() {
    return this._meetings;
  }

  set meetings(val) {
    this._meetings = val;
  }
  /**
   * LABELS FOR MEETING CARDS
   */

  /** The label shown before the advisor
   */

  _advisorlabel;

  @api
  get advisorlabel() {
    return this._advisorlabel;
  }

  set advisorlabel(val) {
    this._advisorlabel = val;
  }
  /** The label shown before the meeting type
   */

  _meetingtypelabel;

  @api
  get meetingtypelabel() {
    return this._meetingtypelabel;
  }

  set meetingtypelabel(val) {
    this._meetingtypelabel = val;
  }
  /** The label shown before the meeting theme
   */

  _meetingthemelabel;

  @api
  get meetingthemelabel() {
    return this._meetingthemelabel;
  }

  set meetingthemelabel(val) {
    this._meetingthemelabel = val;
  }
  /** The label for the button to choose a new meeting time
   */

  _choosenewtimelabel;

  @api
  get choosenewtimelabel() {
    return this._choosenewtimelabel;
  }

  set choosenewtimelabel(val) {
    this._choosenewtimelabel = val;
  }
  /** The label for the cancel meeting button
   */

  _cancellabel;

  @api
  get cancellabel() {
    return this._cancellabel;
  }

  set cancellabel(val) {
    this._cancellabel = val;
  }
  /** The label for the button to start a meeting
   */

  _startmeetinglabel;

  @api
  get startmeetinglabel() {
    return this._startmeetinglabel;
  }

  set startmeetinglabel(val) {
    this._startmeetinglabel = val;
  }
  /** The label shown next to the start meeting button
   */

  _startmeetingdescription;

  @api
  get startmeetingdescription() {
    return this._startmeetingdescription;
  }

  set startmeetingdescription(val) {
    this._startmeetingdescription = val;
  }
  /**
   * MEETINGCARD LABELS END HERE
   */

  /** The label for the book meeting button
   */

  _bookmeetinglabel;

  @api
  get bookmeetinglabel() {
    return this._bookmeetinglabel;
  }

  set bookmeetinglabel(val) {
    this._bookmeetinglabel = val;
  }
  /** Determines if cancel meetings is disabled
   */

  _disablecancelmeeting;

  @api
  get disablecancelmeeting() {
    return this._disablecancelmeeting;
  }

  set disablecancelmeeting(val) {
    this._disablecancelmeeting = val;
  }
  /** Determines if move meetings is disabled
   */

  _disablemovemeeting;

  @api
  get disablemovemeeting() {
    return this._disablemovemeeting;
  }

  set disablemovemeeting(val) {
    this._disablemovemeeting = val;
  }

  handleBookNewMeeting() {
    emitCustomEvent(this, "book", null);
  }
}