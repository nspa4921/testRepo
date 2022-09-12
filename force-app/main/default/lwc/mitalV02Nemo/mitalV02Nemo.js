import { LightningElement, api, track, wire } from 'lwc';
import images from '@salesforce/resourceUrl/mital_images';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [
    'Account.Id',
    'Account.Name',
];

export default class MitalV02 extends LightningElement {
    images = {
        "group50"   : images+"/Group50.png",
        "edit"      : images+"/icons/pencil.png",
    }

    @track error ;
    @track name;
    
    @wire(getRecord, {
        recordId: "0011x00001deYGBAA2",
        fields: FIELDS
    }) wireuser({
        error,
        data
    }) {
        if(error) {
            console.log(error);
            this.error = error;
        } else if(data) {
            console.log(data);
            this.name = data.fields.Name.value;
        }
    }
     
}