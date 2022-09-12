import { prettyPrintDate, prettyPrintTime } from "c/amDateUtils";
import { emitCustomEvent } from "c/amEventUtils";
import { AmThemedElement } from "c/amThemedElement";
import { api } from "lwc";
export default class AmbBookingMeetingCard extends AmThemedElement {
  /** Booking Flow Meeting Id
   */
  _meetingid;

  @api
  get meetingid() {
    return this._meetingid;
  }

  set meetingid(val) {
    this._meetingid = val;
  }
  /** The start date of the meeting
   */

  _startdate;

  @api
  get startdate() {
    return this._startdate;
  }

  set startdate(val) {
    this._startdate = val;
  }

  get prettyPrintedDate() {
    if (!this.startdate) {
      return "";
    }

    return `${prettyPrintDate(this.startdate)} ${prettyPrintTime(
      this.startdate
    )}`;
  }
  /** The end date for the meeting
   */

  _enddate;

  @api
  get enddate() {
    return this._enddate;
  }

  set enddate(val) {
    this._enddate = val;
  }
  /** The location of the meeting
   */

  _location;

  @api
  get location() {
    return this._location;
  }

  set location(val) {
    this._location = val;
  }
  /** The label before the advisor
   */

  _advisorlabel = "Rådgiver";

  @api
  get advisorlabel() {
    return this._advisorlabel;
  }

  set advisorlabel(val) {
    this._advisorlabel = val;
  }
  /** The advisor assigned to the meeting
   */

  _advisor;

  @api
  get advisor() {
    return this._advisor;
  }

  set advisor(val) {
    this._advisor = val;
  }

  get prettyPrintAdvisor() {
    return `${this.advisorlabel}: ${this.advisor}`;
  }
  /** The label before the meeting type
   */

  _meetingtypelabel = "Type";

  @api
  get meetingtypelabel() {
    return this._meetingtypelabel;
  }

  set meetingtypelabel(val) {
    this._meetingtypelabel = val;
  }
  /** The type of the meeting
   */

  _meetingtype;

  @api
  get meetingtype() {
    return this._meetingtype;
  }

  set meetingtype(val) {
    this._meetingtype = val;
  }

  get prettyPrintMeetingType() {
    return `${this.meetingtypelabel}: ${this._meetingtype}`;
  }
  /** The label before the meeting theme
   */

  _meetingthemelabel = "Tema";

  @api
  get meetingthemelabel() {
    return this._meetingthemelabel;
  }

  set meetingthemelabel(val) {
    this._meetingthemelabel = val;
  }
  /** The theme of the meeting
   */

  _meetingtheme;

  @api
  get meetingtheme() {
    return this._meetingtheme;
  }

  set meetingtheme(val) {
    this._meetingtheme = val;
  }

  get prettyPrintMeetingTheme() {
    return `${this.meetingthemelabel}: ${this.meetingtheme}`;
  }
  /** The label for the choose new time button
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
  /** The label for the start meeting button
   */

  _startmeetinglabel;

  @api
  get startmeetinglabel() {
    return this._startmeetinglabel;
  }

  set startmeetinglabel(val) {
    this._startmeetinglabel = val;
  }
  /** The description next to the start meeting button
   */

  _startmeetingdescription;

  @api
  get startmeetingdescription() {
    return this._startmeetingdescription;
  }

  set startmeetingdescription(val) {
    this._startmeetingdescription = val;
  }
  /** Flag that determines if a new time can be set for the meeting
   */

  _ismovable;

  @api
  get ismovable() {
    return this._ismovable;
  }

  set ismovable(val) {
    this._ismovable = val;
  }
  /** Flag that determines if the meeting can be cancelled
   */

  _iscancelable;

  @api
  get iscancelable() {
    return this._iscancelable;
  }

  set iscancelable(val) {
    this._iscancelable = val;
  }
  /** disables the cancel meeting button
   */

  _disablecancelmeeting = false;

  @api
  get disablecancelmeeting() {
    return this._disablecancelmeeting;
  }

  set disablecancelmeeting(val) {
    this._disablecancelmeeting = val;
  }
  /** disables the move meeting button
   */

  _disablemovemeeting = false;

  @api
  get disablemovemeeting() {
    return this._disablemovemeeting;
  }

  set disablemovemeeting(val) {
    this._disablemovemeeting = val;
  }

  get canCancel() {
    return this.iscancelable && !this.disablecancelmeeting;
  }

  get canMove() {
    return this.ismovable && !this.disablemovemeeting;
  }

  get showButtonList() {
    return (
      this.ismovable &&
      this.iscancelable &&
      !this.disablecancelmeeting &&
      !this.disablemovemeeting
    );
  }
  /** The link to the online meeting
   */

  _meetinglink;

  @api
  get meetinglink() {
    return this._meetinglink;
  }

  set meetinglink(val) {
    this._meetinglink = val;
  }
  /** Controls if the start meeting button should be shown
   * Should be true for online meetings
   */

  _showstartmeetingbutton;

  @api
  get showstartmeetingbutton() {
    return this._showstartmeetingbutton;
  }

  set showstartmeetingbutton(val) {
    this._showstartmeetingbutton = val;
  }

  get isMeetingNotReady() {
    if (!this.startdate) {
      return false;
    }

    const currentDate = new Date();
    const dateDiff = this.startdate.getTime() - currentDate.getTime(); // if the difference is larger than 300000 millisecs (5 minutes)

    return dateDiff > 300000;
  }

  handleChooseNewTime = () => {
    emitCustomEvent(this, "reschedulemeeting", {
      bookingFlowMeetingId: this.meetingid,
      meetingTypeLabel: this.meetingtype
    });
  };
  handleCancelMeeting = () => {
    emitCustomEvent(this, "cancelmeeting", {
      bookingFlowMeetingId: this.meetingid
    });
  };
  handleStartMeeting = () => {
    window.open(this.meetinglink, "_blank");
  };

  get buttons() {
    return [
      {
        id: "choosetime",
        label: this.choosenewtimelabel,
        variant: "secondary",
        handler: this.handleChooseNewTime
      },
      {
        id: "cancel",
        label: this.cancellabel,
        variant: "secondary",
        handler: this.handleCancelMeeting
      }
    ];
  }
}