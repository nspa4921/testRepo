import { AmThemedElement } from "c/amThemedElement";
import { track, api, wire } from "lwc";
import getBookingThemes from "@salesforce/apex/AMBThemeController.getThemes";
import listUpcommingMeetings from "@salesforce/apex/AMBMeetingController.listUpcommingMeetings";
import bookMeeting from "@salesforce/apex/AMBBookingController.bookMeeting";
import cancelMeeting from "@salesforce/apex/AMBBookingController.cancelMeeting";
import { refreshApex } from "@salesforce/apex";
import getAccountLocation from "@salesforce/apex/AMBAccountController.getAccountLocation";
import getContactInformation from "@salesforce/apex/AMBBookingController.getContactInformation";
import AMB_CustomerMeetings_StartMeetingLabel from "@salesforce/label/c.AMB_CustomerMeetings_StartMeetingLabel";
import AMB_CustomerMeetings_StartMeetingDescription from "@salesforce/label/c.AMB_CustomerMeetings_StartMeetingDescription";
import AMB_CustomerMeetings_MeetingTypeLabel from "@salesforce/label/c.AMB_CustomerMeetings_MeetingTypeLabel";
import AMB_CustomerMeetings_MeetingThemeLabel from "@salesforce/label/c.AMB_CustomerMeetings_MeetingThemeLabel";
import AMB_CustomerMeetings_Heading from "@salesforce/label/c.AMB_CustomerMeetings_Heading";
import AMB_CustomerMeetings_Description from "@salesforce/label/c.AMB_CustomerMeetings_Description";
import AMB_CustomerMeetings_ChooseNewTimeLabel from "@salesforce/label/c.AMB_CustomerMeetings_ChooseNewTimeLabel";
import AMB_CustomerMeetings_CancelLabel from "@salesforce/label/c.AMB_CustomerMeetings_CancelLabel";
import AMB_CustomerMeetings_BookMeetingLabel from "@salesforce/label/c.AMB_CustomerMeetings_BookMeetingLabel";
import AMB_CustomerMeetings_BookMeetingDesc from "@salesforce/label/c.AMB_CustomerMeetings_BookMeetingDesc";
import AMB_CustomerMeetings_AdvisorLabel from "@salesforce/label/c.AMB_CustomerMeetings_AdvisorLabel";
import AMB_BookingTheme_Heading from "@salesforce/label/c.AMB_BookingTheme_Heading";
import AMB_BookingTheme_Description from "@salesforce/label/c.AMB_BookingTheme_Description";
import AMB_BookingSubTheme_Heading from "@salesforce/label/c.AMB_BookingSubTheme_Heading";
import AMB_BookingSubTheme_Description from "@salesforce/label/c.AMB_BookingSubTheme_Description";
import AMB_BookingPlanner_StartDateLabel from "@salesforce/label/c.AMB_BookingPlanner_StartDateLabel";
import AMB_BookingPlanner_Heading from "@salesforce/label/c.AMB_BookingPlanner_Heading";
import AMB_BookingPlanner_AdjustAvailableTimesLabel from "@salesforce/label/c.AMB_BookingPlanner_AdjustAvailableTimesLabel";
import AMB_BookingPage_TimeLabel from "@salesforce/label/c.AMB_BookingPage_TimeLabel";
import AMB_BookingPage_MeetingThemeLabel from "@salesforce/label/c.AMB_BookingPage_MeetingThemeLabel";
import AMB_BookingPage_Heading from "@salesforce/label/c.AMB_BookingPage_Heading";
import AMB_BookingPage_DateLabel from "@salesforce/label/c.AMB_BookingPage_DateLabel";
import AMB_BookingPage_CommentLabel from "@salesforce/label/c.AMB_BookingPage_CommentLabel";
import AMB_BookingPage_ChooseDifferentMeetingLabel from "@salesforce/label/c.AMB_BookingPage_ChooseDifferentMeetingLabel";
import AMB_BookingPage_AdvisorLabel from "@salesforce/label/c.AMB_BookingPage_AdvisorLabel";
import AMB_BookingPage_AddressLabel from "@salesforce/label/c.AMB_BookingPage_AddressLabel";
import AMB_BookingPage_EmailLabel from "@salesforce/label/c.AMB_BookingPage_EmailLabel";
import AMB_BookingPage_BookMeetingLabel from "@salesforce/label/c.AMB_BookingPage_BookMeetingLabel";
import AMB_BookingPage_MeetingTypeLabel from "@salesforce/label/c.AMB_BookingPage_MeetingTypeLabel";
import AMB_BookingConfirmation_TimeLabel from "@salesforce/label/c.AMB_BookingConfirmation_TimeLabel";
import AMB_BookingConfirmation_MeetingTypeLabel from "@salesforce/label/c.AMB_BookingConfirmation_MeetingTypeLabel";
import AMB_BookingConfirmation_MeetingThemeLabel from "@salesforce/label/c.AMB_BookingConfirmation_MeetingThemeLabel";
import AMB_BookingConfirmation_Heading from "@salesforce/label/c.AMB_BookingConfirmation_Heading";
import AMB_BookingConfirmation_DateLabel from "@salesforce/label/c.AMB_BookingConfirmation_DateLabel";
import AMB_BookingConfirmation_CommentLabel from "@salesforce/label/c.AMB_BookingConfirmation_CommentLabel";
import AMB_BookingConfirmation_CloseBookingLabel from "@salesforce/label/c.AMB_BookingConfirmation_CloseBookingLabel";
import AMB_BookingConfirmation_AdvisorLabel from "@salesforce/label/c.AMB_BookingConfirmation_AdvisorLabel";
import AMB_BookingConfirmation_LocationLabel from "@salesforce/label/c.AMB_BookingConfirmation_LocationLabel";
import AMB_BookingCalendar_StartDateLabel from "@salesforce/label/c.AMB_BookingCalendar_StartDateLabel";
import AMB_Cancel_Heading from "@salesforce/label/c.AMB_Cancel_Heading";
import AMB_Cancel_Back_label from "@salesforce/label/c.AMB_Cancel_Back_label";
import AMB_Cancel_Cancel_label from "@salesforce/label/c.AMB_Cancel_Cancel_label";
import AMB_Cancel_Comment_label from "@salesforce/label/c.AMB_Cancel_Comment_label";
import AMB_BookingFlow_ThemeStepLabel from "@salesforce/label/c.AMB_BookingFlow_ThemeStepLabel";
import AMB_BookingFlow_PlannerStepLabel from "@salesforce/label/c.AMB_BookingFlow_PlannerStepLabel";
import AMB_BookingFlow_ConfirmStepLabel from "@salesforce/label/c.AMB_BookingFlow_ConfirmStepLabel";
import { emitCustomEvent } from "c/amEventUtils";
import { AMBMeetingTypesUtils } from "c/ambMeetingTypesUtils";

/**
 * A number, or a string containing a number.
 * @typedef {{id: string, header: string, subText: string, subThemes: Theme[]}} Theme
 */

/**
 * Advisor information returned in the booked meeting response
 *  @typedef {{id: string, name:string, email:string, initials: string, location: string}} Advisor
 */

/**
 * Meeting room DTO
 *  @typedef {{id: string, name: string}} MeetingRoom
 */

/**
 * Meeting response information returned in for booked meeting and rescheduled meeting
 *  @typedef {{id: string, description:string, videoLink:string, salesforceId: string, type: string, typeLabel: string, bookedBy: string, additionalAdvisors: string[],
 *  themeId: string, advisorId: string, customerId: string, timeSlotId: string, dateCreated: Date, dateModified: Date}} Meeting
 */

/** the timeslot on a booked meeting response
 * @typedef {{id: string, dateCreated: string, dateModified: string, startDate: string, endDate: string, status: string, location: string, roomId: string, advisorId: string}} MeetingTimeSlot
 */

/** Booking response from the book meeting call
 * @typedef {{meeting: Meeting, eventId: string, advisor: Advisor, advisors: Advisor[], timeSlot: MeetingTimeSlot, status: string, meetingRoom: MeetingRoom}} BookingResponse
 */

/** Booking response with theme from the book meeting call
 * @typedef {{response: BookingResponse, theme: string}} BookingResponseWithTheme
 */

var SCREEN = {
  MEETINGS: 0,
  THEME: 1,
  SUBTHEME: 2,
  PLANNER: 3,
  BOOK: 4,
  CONFIRMATION: 5,
  DELETE: 6,
  RESCHEDULE: 7
};

export default class AmbBookingFlow extends AmThemedElement {
  /** Template conditional. Prevents us from flashing the meetings screen on initial load and on event deletion */
  hasData = false;

  /**Cache busting*/
  meetingsCacheResponse = null;

  True = true;
  /** Id of the current flow. This is used when rescheduling a meeting
   * @type {string}
   */
  _bookingFlowId;

  get bookingFlowId() {
    return this._bookingFlowId;
  }

  set bookingFlowId(val) {
    this._bookingFlowId = val;
  }

  /** Customer information */

  /** Customer account id
   * @type {string}
   */
  _accountid = "ACCOUNTNOTSET";

  @api
  get accountid() {
    return this._accountid;
  }

  set accountid(val) {
    this._accountid = val;
  }

  @api contactid = "CONTACTNOTSET";

  // #region  Flow management
  @track step = 0;

  get inbookingflow() {
    return [
      SCREEN.THEME,
      SCREEN.SUBTHEME,
      SCREEN.PLANNER,
      SCREEN.BOOK,
      SCREEN.CONFIRMATION,
      SCREEN.RESCHEDULE
    ].includes(this.step);
  }

  /** Id of the user provided sub theme */
  _subthemeid = null;

  @api
  get subthemeid() {
    return this._subthemeid;
  }

  set subthemeid(val) {
    this._subthemeid = val;
  }

  /** Booking platform meeting id
   * @type {string}
   */
  @api
  get meetingid() {
    return this.bookingFlowId;
  }

  set meetingid(val) {
    this.bookingFlowId = val;
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

  startOnPlannerWithTheme(subthemeid) {
    if (
      subthemeid &&
      this.customflow === "withtheme" &&
      this.themes &&
      this.step !== SCREEN.PLANNER
    ) {
      // set themeId if we start the flow with existing subthemeid
      const parent = this.themes.find((t) =>
        t.subThemes.some((st) => st.id === subthemeid)
      );
      if (parent) {
        this.themeId = parent.id;
        this.step = SCREEN.PLANNER;
      }
    }
  }

  startOnReschedule() {
    if (this.bookingFlowId !== null) {
      this.step = SCREEN.RESCHEDULE;
    }
  }

  startOnCancelMeeting() {
    if (this.bookingFlowId !== null) {
      this.redirectToCancelMeeting();
    }
  }

  /** Force overrides of data driven attributes and default attributes in the customer facing solution
   * @type {{
   * meetingTypeWhitelist: ('Physical' | 'Online' | 'Telephone' | 'OffSite')[],
   * advisorOptionWhitelist: ('PrimaryAdvisor' | 'OtherAdvisors')[]}}
   */
  _configOverride = null;

  @api
  get configoverride() {
    return this._configOverride;
  }

  set configoverride(val) {
    this._configOverride = val;
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

  get showProgressBar() {
    return this.inbookingflow && !this.disableprogressbar;
  }

  get progress() {
    switch (this.step) {
      case SCREEN.THEME:
      case SCREEN.SUBTHEME:
        return this.labels.AMB_BookingFlow_ThemeStepLabel;
      case SCREEN.PLANNER:
      case SCREEN.BOOK:
      case SCREEN.RESCHEDULE:
        return this.labels.AMB_BookingFlow_PlannerStepLabel;
      case SCREEN.CONFIRMATION:
        return this.labels.AMB_BookingFlow_ConfirmStepLabel;
      default:
        return undefined;
    }
  }

  get bookingflowsteps() {
    return [
      this.labels.AMB_BookingFlow_ThemeStepLabel,
      this.labels.AMB_BookingFlow_PlannerStepLabel,
      this.labels.AMB_BookingFlow_ConfirmStepLabel
    ];
  }

  get stepToggles() {
    return {
      meetings: this.step === SCREEN.MEETINGS,
      theme: this.step === SCREEN.THEME,
      subTheme: this.step === SCREEN.SUBTHEME,
      planner: this.step === SCREEN.PLANNER,
      book: this.step === SCREEN.BOOK,
      confirm: this.step === SCREEN.CONFIRMATION,
      delete: this.step === SCREEN.DELETE,
      reschedule: this.step === SCREEN.RESCHEDULE
    };
  }

  // #endregion
  /** Flow lifecycle data */

  // #region SCREEN.MEETINGS

  onBookNewMeeting = () => {
    this.step = SCREEN.THEME;
  };

  /**
  * @type {{
    meetingid: string;
    startdate: Date;
    enddate: Date;
    advisor: string;
    location: string;
    type: string;
    theme: string;
    meetinglink: string;
    isonline: boolean;
    ismovable: boolean;
    iscancelable: boolean;
  }[]}
   */
  bookedMeetings = [];

  get showBookedMeetings() {
    return this.bookedMeetings.length > 0 && !this.disablecustomermeetings;
  }

  /** Disables the customer meetings screen
   * @type {boolean}
   */
  _disablecustomermeetings;

  @api
  get disablecustomermeetings() {
    return this._disablecustomermeetings;
  }

  set disablecustomermeetings(val) {
    this._disablecustomermeetings = val;
  }

  get showCustomerMeetings() {
    return this.stepToggles.meetings && !this.disablecustomermeetings;
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

  @wire(listUpcommingMeetings, {
    accountId: "$accountid"
  })
  wiredMeetings(payload) {
    const { error, data } = payload;
    if (!this.accountid || !data) {
      return;
    }
    if (error) {
      console.error(error);
      return;
    }
    this.bookedMeetings = (data || []).map((evt) => {
      if (evt.AMB_Event_Detail__r.TeamsMeetingLink__c != null) {
        console.log(evt);
      }
      return {
        meetingid: evt.AMB_Event_Detail__r.BookingFlowId__c,
        startdate: new Date(evt.StartDateTime),
        enddate: new Date(evt.EndDateTime),
        advisor: evt.AMB_Event_Detail__r.AdvisorName__c,
        location:
          evt.AMB_Event_Detail__r.MeetingType__c ===
          AMBMeetingTypesUtils.PHYSICAL
            ? evt.AMB_Event_Detail__r.Location__c
            : "",
        type: evt.AMB_Event_Detail__r.MeetingTypeLabel__c,
        theme: evt.AMB_Event_Detail__r.MeetingTaxonomy__r?.Name,
        meetinglink: evt.AMB_Event_Detail__r.TeamsMeetingLink__c,
        isonline: evt.AMB_Event_Detail__r.TeamsMeetingLink__c != null,
        ismovable:
          evt.AMB_Event_Detail__r.AdditionalAdvisorCount__c === 0 &&
          new Date(evt.StartDateTime).getTime() - Date.now() > 900000,
        iscancelable:
          new Date(evt.StartDateTime).getTime() - Date.now() > 900000
        // cancel and reschedule buttons are removed 15 minutes before meeting start
      };
    });
    if (this.customflow) {
      if (this.customflow === "update") {
        if (this.bookingFlowId) {
          this.startOnReschedule();
        }
      } else if (this.customflow === "cancel") {
        if (this.bookingFlowId) {
          this.startOnCancelMeeting();
        }
      }
    } else {
      //If the customer doesn't have any meetings then we'll assume that they want to book a new meeting
      if (this.bookedMeetings.length === 0 || this.disablecustomermeetings) {
        this.step = SCREEN.THEME;
      }
      this.hasData = true;
      this.meetingsCacheResponse = payload;
    }
  }

  /**
   *
   * @param {CustomEvent<{bookingFlowMeetingId: string, meetingTypeLabel: string}>} evt
   */
  handleRescheduleMeeting = (evt) => {
    this.bookingFlowId = evt.detail.bookingFlowMeetingId;
    this.startOnReschedule();
  };

  /**
   * @type {{startDate: string, endDate: string, advisorNames: string, location: string, theme: string, typeLabel: string}}
   */
  cancelMeetingDetails;
  /**
   *
   * @param {CustomEvent<{bookingFlowMeetingId: string}>} evt
   */
  handleCancelMeeting = (evt) => {
    this.bookingFlowId = evt.detail.bookingFlowMeetingId;
    this.redirectToCancelMeeting();
  };

  redirectToCancelMeeting = () => {
    const meeting = this.bookedMeetings.find(
      (m) => m.meetingid === this.bookingFlowId
    );
    if (meeting) {
      this.cancelMeetingDetails = {
        startDate: meeting.startdate,
        endDate: meeting.enddate,
        advisorNames: meeting.advisor,
        location: meeting.location,
        theme: meeting.theme,
        typeLabel: meeting.type
      };
      this.step = SCREEN.DELETE;
    } else {
      console.error("Could not find meeting");
    }
  };

  // #endregion
  // #region SCREEN.THEME
  /**
   * @type {Theme[]}
   */

  /** Id of user provided theme */
  _themeId = null;

  get themeId() {
    return this._themeId;
  }

  set themeId(val) {
    this._themeId = val;
  }

  get themeOptions() {
    return this.themes.map((t) => ({
      label: t.header,
      key: t.id,
      handler: () => {
        this.themeId = t.id;
        if (t.subThemes) {
          this.step = SCREEN.SUBTHEME;
        } else {
          console.error("The selected theme has no subthemes");
        }
      },
      type: "action"
    }));
  }

  /**
   * @type {Theme[]}
   */
  themes = [];
  error;

  @wire(getBookingThemes, {
    accountId: "$accountid",
    isCustomer: true
  })
  wiredThemes({ error, data }) {
    if (data) {
      this.themes = data;
      if (this.customflow === "withtheme") {
        this.startOnPlannerWithTheme(this.subthemeid);
      }
      this.error = undefined;
    } else if (error) {
      this.error = error;
    }
  }

  // #endregion
  // #region SCREEN.SUBTHEME

  get subThemeOptions() {
    if (!(this.themes && this.themeId)) {
      return [];
    }
    const theme = this.themes.find((t) => t.id === this.themeId);

    return theme.subThemes.map((t) => ({
      label: t.header,
      key: t.id,
      handler: () => {
        this._subthemeid = t.id;
        this.step = SCREEN.PLANNER;
      },
      type: "action"
    }));
  }

  handleBackToTheme = (evt) => {
    evt.stopImmediatePropagation();
    this.step = SCREEN.THEME;
  };

  // #endregion
  // #region SCREEN.PLANNER

  /** reserved slot
   * @type {import('../ambBookingPlannerData/ambBookingPlannerData').TimeSlot}
   */
  requestedSlot;

  /** description
   * @type {import('../ambBookingPlannerData/ambBookingPlannerData').MeetingType[]}
   */
  filteredMeetingTypeOptions;

  /** @param {CustomEvent<{slot: import('../ambBookingPlannerData/ambBookingPlannerData').TimeSlot, filteredMeetingTypeOptions: import('../ambBookingPlannerData/ambBookingPlannerData').MeetingType[]}>} evt */
  requestSlotHandler = (evt) => {
    this.requestedSlot = evt.detail.slot;
    this.filteredMeetingTypeOptions = evt.detail.filteredMeetingTypeOptions;
    this.step = SCREEN.BOOK;
  };

  handleBackToSubTheme = (evt) => {
    evt.stopImmediatePropagation();
    if (this.customflow === "withtheme") {
      // Custom flow - emit event to go back to where they came from
      emitCustomEvent(this, "back", undefined);
    } else {
      this.step = SCREEN.SUBTHEME;
    }
  };

  // #endregion
  // #region SCREEN.BOOK

  /** @type {string[]} */
  get themelabels() {
    try {
      const theme = this.themes?.find((t) => t.id === this.themeId);
      const subTheme = theme?.subThemes.find((t) => t.id === this.subthemeid);

      return [theme, subTheme].filter((t) => !!t).map((t) => t.header);
    } catch (e) {
      return "";
    }
  }

  /**
   * @type {{timeslotId:string, start:Date, end:Date}}
   */
  get bookTimeSlot() {
    return {
      timeslotId: this.requestedSlot.id,
      start: new Date(this.requestedSlot.start),
      end: (() => {
        let d = new Date(this.requestedSlot.start);
        d.setMinutes(d.getMinutes() + this.requestedSlot.durationInMinutes);
        return d;
      })()
    };
  }

  /** @type {{id:string, label: string, disabled:boolean}[]} */
  get bookTimeSlotVariants() {
    return this.requestedSlot.timeSlotVariants.map((v) => ({
      id: v.type,
      label: this.filteredMeetingTypeOptions.find((x) => x.id === v.type).name,
      disabled: false
    }));
  }

  get selectedMeetingTypeId() {
    return this.filteredMeetingTypeOptions[0].id;
  }

  get advisorName() {
    // In customerflow we only have a single variant
    return this.requestedSlot?.timeSlotVariants[0]?.advisor.name;
  }

  /** Location of the account (To show on bookingpage and bookingconfirmation)
   * @type {string}
   */
  accountLocation;

  @wire(getAccountLocation, {
    accountId: "$accountid",
    prettyprint: true
  })
  wiredGetAccountLocation(payload) {
    const { error, data } = payload;
    if (!this.accountid || !data) {
      return;
    }
    if (error) {
      console.error(error);
    }
    this.accountLocation = data;
  }

  @wire(getContactInformation, {
    contactId: "$contactid",
    accountId: "$accountid"
  })
  wiredGetContactInformation(payload) {
    const { error, data } = payload;
    if (!this.accountid || !data) {
      return;
    }
    if (error) {
      console.error(error);
    }
    this.customername = data.Name;
    this._customeremail = data.Email;
  }

  /** Email of the customer
   * @type {string}
   */
  _customeremail;

  @api
  get customeremail() {
    return this._customeremail;
  }

  set customeremail(val) {
    this._customeremail = val;
  }

  handleCustomerEmailChanged = (evt) => {
    this._customeremail = evt.detail;
  };

  /** Email of the customer
   * @type {string}
   */
  customername;

  /** The comment to be attached a meeting
   * @type {string}
   */
  comment;

  /** All information about the booked meeting
   * @type {BookingResponseWithTheme}
   */
  bookedMeeting;

  /** @param {CustomEvent<{meetingTypeId: string, comment: string}>} evt */
  bookingAcceptHandler = (evt) => {
    this.handleEnableSpinner();

    this.comment = evt.detail.comment;
    const finalMeetingType = evt.detail.meetingTypeId;

    console.log("trying to book a meeting");
    const finalVariant = this.requestedSlot.timeSlotVariants.find(
      (v) => v.type === finalMeetingType
    );

    /* Object which will be attached to meeting, containing the updated contact email */
    const contact = {
      id: this.contactid,
      email: this.customeremail,
      name: this.customername
    };

    /** Book meeting request
     *  @type {{ accountId: string,
     *  themeId: string,
     *  contactIds: string[],
     *  contacts: {id: string, email: string, name: string},
     *  participants: {id: string, email: string, name: string},
     *  meetingTypeId: string,
     *  meetingTypeLabel: string,
     *  description: string,
     *  bookedByCustomer: boolean,
     *  roomId: string,
     *  startDate: Date,
     *  endDate: Date,
     *  sendMeetingInvites: boolean,
     *  meetingOwner: string,
     *  additionalAdvisors: string[],
     *  advisorReservationKeys: {advisorId: string, reservationKey: string, reservedTimeSlotId: string },
     *  ignoreTimeSlotConflicts: boolean
     *  }}
     */
    const request = {
      accountId: this.accountid,
      themeId: this.subthemeid,
      contactIds: [this.contactid],
      contacts: [contact],
      participants: [],
      meetingTypeId: finalMeetingType,
      meetingTypeLabel: this.filteredMeetingTypeOptions.find(
        (x) => x.id === finalMeetingType
      ).name,
      description: this.comment || "",
      bookedByCustomer: true,
      roomId:
        this.finalMeetingType === AMBMeetingTypesUtils.PHYSICAL
          ? this.requestedSlot.timeSlotVariants.find(
              (x) => x.roomId !== undefined
            )?.roomId
          : undefined,
      startDate: new Date(this.requestedSlot.start),
      endDate: (() => {
        let d = new Date(this.requestedSlot.start);
        d.setMinutes(d.getMinutes() + this.requestedSlot.durationInMinutes);
        return d;
      })(),
      sendMeetingInvites: true,
      additionalAdvisors: [],
      meetingOwner: finalVariant.advisorId,
      advisorReservationKeys: this.requestedSlot.timeSlotVariants.map((tsv) => {
        return {
          advisorId: tsv.advisorId,
          reservationKey: tsv.reservationId,
          reservedTimeSlotId: tsv.id
        };
      }),
      ignoreTimeSlotConflicts: this.requestedSlot.ignoreTimeSlotConflicts
    };

    bookMeeting(request)
      .then(
        /** @param {BookingResponseWithTheme} bookingResponse */
        (bookingResponse) => {
          this.bookedMeeting = bookingResponse;
          console.log("booked meeting:");
          console.log(bookingResponse);
          this.step = SCREEN.CONFIRMATION;
          emitCustomEvent(
            this,
            "meetingbooked",
            this.bookedMeeting.response.eventId
          );
        }
      )
      .catch((e) => {
        console.error(JSON.stringify(e));
      })
      .finally(() => {
        this.handleDisableSpinner();
      });
  };

  handleBackToPlanner = (evt) => {
    evt.stopImmediatePropagation();
    this.step = SCREEN.PLANNER;
  };

  // #endregion
  // #region SCREEN.CONFIRMATION

  get bookedMeetingDate() {
    return new Date(this.bookedMeeting.response.timeSlot.startDate);
  }

  /* Get duration in minutes*/
  get bookedMeetingDuration() {
    const msDiff =
      new Date(this.bookedMeeting.response.timeSlot.endDate) -
      new Date(this.bookedMeeting.response.timeSlot.startDate);
    return Math.floor(msDiff / 1000 / 60);
  }

  get bookedMeetingTheme() {
    return [this.bookedMeeting.theme];
  }

  get bookedMeetingTypeLabel() {
    return this.bookedMeeting.response.meeting.typeLabel;
  }

  /** The names of the advisors in the meeting as a concatenated string
   * @type {string}
   */
  get bookedMeetingAdvisorNames() {
    let advisorNames = this.bookedMeeting.response.advisor.name;
    if (this.bookedMeeting.response.advisors) {
      this.bookedMeeting.response.advisors.forEach((adv) => {
        advisorNames += ", " + adv.name;
      });
    }
    return advisorNames;
  }

  get bookedMeetingLocation() {
    return this.bookedMeeting.response.meeting.type ===
      AMBMeetingTypesUtils.PHYSICAL
      ? this.bookedMeeting.response.timeSlot.location
      : "";
  }

  /** Removes the close button from the booking confirmation
   * @type {boolean}
   */
  _removeclosebutton;

  @api
  get removeclosebutton() {
    return this._removeclosebutton;
  }

  set removeclosebutton(val) {
    this._removeclosebutton = val;
  }

  handleClose = () => {};

  handleClick = () => {};

  // #endregion

  // #region SCREEN.DELETE

  cancelComment = "";

  /**
   *
   * @param {CustomEvent<{meetingId: string, comment: string}>} evt
   */
  handleCancelMeetingConfirmed = (evt) => {
    this.handleEnableSpinner();
    cancelMeeting({
      bookingFlowId: evt.detail.meetingId,
      comment: evt.detail.comment,
      byUser: true,
      accountId: this.accountid
    })
      .then(() => {
        this.hasData = false;
        if (this.customflow === "cancel") {
          // In custom flow - emit meeting canceled event and return user to where they came from
          emitCustomEvent(this, "meetingcanceled", evt.detail.meetingId);
        } else {
          this.step = SCREEN.MEETINGS;
        }
        refreshApex(this.meetingsCacheResponse);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.handleDisableSpinner();
      });
  };

  // #endregion

  // #region SCREEN.RESCHEDULE
  /**
   * @param {CustomEvent<BookingResponseWithTheme>} evt
   */
  handleMeetingRescheduled = (evt) => {
    this.bookedMeeting = evt.detail;
    this.step = SCREEN.CONFIRMATION;
    emitCustomEvent(this, "meetingbooked", this.bookedMeeting.response.eventId);
  };

  handleBackToMeetings = (evt) => {
    evt.stopImmediatePropagation();
    if (this.customflow) {
      // Custom flow - emit event to go back to where they came from
      emitCustomEvent(this, "back", undefined);
    } else {
      refreshApex(this.meetingsCacheResponse);
      this.step = SCREEN.MEETINGS;
    }
  };

  // #endregion

  // #region spinner
  showspinner = false;

  handleEnableSpinner = () => {
    this.showspinner = true;
  };

  handleDisableSpinner = () => {
    this.showspinner = false;
  };
  // #endregion spinner

  // #region utility

  // #endregion

  labels = {
    AMB_CustomerMeetings_StartMeetingLabel:
      AMB_CustomerMeetings_StartMeetingLabel,
    AMB_CustomerMeetings_StartMeetingDescription:
      AMB_CustomerMeetings_StartMeetingDescription,
    AMB_CustomerMeetings_MeetingTypeLabel:
      AMB_CustomerMeetings_MeetingTypeLabel,
    AMB_CustomerMeetings_MeetingThemeLabel:
      AMB_CustomerMeetings_MeetingThemeLabel,
    AMB_CustomerMeetings_Heading: AMB_CustomerMeetings_Heading,
    AMB_CustomerMeetings_Description: AMB_CustomerMeetings_Description,
    AMB_CustomerMeetings_ChooseNewTimeLabel:
      AMB_CustomerMeetings_ChooseNewTimeLabel,
    AMB_CustomerMeetings_CancelLabel: AMB_CustomerMeetings_CancelLabel,
    AMB_CustomerMeetings_BookMeetingLabel:
      AMB_CustomerMeetings_BookMeetingLabel,
    AMB_CustomerMeetings_BookMeetingDesc: AMB_CustomerMeetings_BookMeetingDesc,
    AMB_CustomerMeetings_AdvisorLabel: AMB_CustomerMeetings_AdvisorLabel,
    AMB_BookingTheme_Heading: AMB_BookingTheme_Heading,
    AMB_BookingTheme_Description: AMB_BookingTheme_Description,
    AMB_BookingSubTheme_Heading: AMB_BookingSubTheme_Heading,
    AMB_BookingSubTheme_Description: AMB_BookingSubTheme_Description,
    AMB_BookingPlanner_StartDateLabel: AMB_BookingPlanner_StartDateLabel,
    AMB_BookingPlanner_Heading: AMB_BookingPlanner_Heading,
    AMB_BookingPlanner_AdjustAvailableTimesLabel:
      AMB_BookingPlanner_AdjustAvailableTimesLabel,
    AMB_BookingPage_TimeLabel: AMB_BookingPage_TimeLabel,
    AMB_BookingPage_MeetingThemeLabel: AMB_BookingPage_MeetingThemeLabel,
    AMB_BookingPage_Heading: AMB_BookingPage_Heading,
    AMB_BookingPage_DateLabel: AMB_BookingPage_DateLabel,
    AMB_BookingPage_CommentLabel: AMB_BookingPage_CommentLabel,
    AMB_BookingPage_ChooseDifferentMeetingLabel:
      AMB_BookingPage_ChooseDifferentMeetingLabel,
    AMB_BookingPage_BookMeetingLabel: AMB_BookingPage_BookMeetingLabel,
    AMB_BookingConfirmation_TimeLabel: AMB_BookingConfirmation_TimeLabel,
    AMB_BookingConfirmation_MeetingTypeLabel:
      AMB_BookingConfirmation_MeetingTypeLabel,
    AMB_BookingConfirmation_MeetingThemeLabel:
      AMB_BookingConfirmation_MeetingThemeLabel,
    AMB_BookingConfirmation_Heading: AMB_BookingConfirmation_Heading,
    AMB_BookingConfirmation_DateLabel: AMB_BookingConfirmation_DateLabel,
    AMB_BookingConfirmation_CommentLabel: AMB_BookingConfirmation_CommentLabel,
    AMB_BookingConfirmation_CloseBookingLabel:
      AMB_BookingConfirmation_CloseBookingLabel,
    AMB_BookingConfirmation_AdvisorLabel: AMB_BookingConfirmation_AdvisorLabel,
    AMB_BookingConfirmation_LocationLabel:
      AMB_BookingConfirmation_LocationLabel,
    AMB_BookingCalendar_StartDateLabel: AMB_BookingCalendar_StartDateLabel,
    AMB_Cancel_Heading: AMB_Cancel_Heading,
    AMB_Cancel_Back_label: AMB_Cancel_Back_label,
    AMB_Cancel_Cancel_label: AMB_Cancel_Cancel_label,
    AMB_Cancel_Comment_label: AMB_Cancel_Comment_label,
    AMB_BookingFlow_ThemeStepLabel: AMB_BookingFlow_ThemeStepLabel,
    AMB_BookingFlow_PlannerStepLabel: AMB_BookingFlow_PlannerStepLabel,
    AMB_BookingFlow_ConfirmStepLabel: AMB_BookingFlow_ConfirmStepLabel,
    AMB_BookingPage_AdvisorLabel: AMB_BookingPage_AdvisorLabel,
    AMB_BookingPage_AddressLabel: AMB_BookingPage_AddressLabel,
    AMB_BookingPage_EmailLabel: AMB_BookingPage_EmailLabel,
    AMB_BookingPage_MeetingTypeLabel: AMB_BookingPage_MeetingTypeLabel
  };
}