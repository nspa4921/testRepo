import { LightningElement } from 'lwc';
import meetingBookingCSS from '@salesforce/resourceUrl/meetingBookingCSS';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class AlResponsiveModalModifier extends LightningElement {

    connectedCallback(){
        this.template.ownerDocument.body.dataset.amBooking = 'active';
        Promise.all([
            loadStyle(this, meetingBookingCSS)
        ]) 
    }

    disconnectedCallback(){
        this.template.ownerDocument.body.dataset.amBooking = null;
    }
}