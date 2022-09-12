import { LightningElement, api } from 'lwc';
import images from '@salesforce/resourceUrl/mital_images';

import customCSS from '@salesforce/resourceUrl/staticResourceWhichImport';
import { loadStyle } from 'lightning/platformResourceLoader';


export default class MitalV02 extends LightningElement {
    @api recordId;

    images = {
        "group50"   : images+"/Group50.png",
        "edit"      : images+"/icons/pencil.png",
    }

    bookingLoaded = false;
    connectedCallback(){
        this.template.ownerDocument.body.dataset.amBooking = 'active';
        Promise.all([
            loadStyle(this, customCSS)
        ]) 
        this.bookingLoaded = true;
    }

    disconnectedCallback(){
        this.template.ownerDocument.body.dataset.amBooking = null;
    }

}