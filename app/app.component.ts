import {Component, OnInit} from "@angular/core";

var barcodescanner = require("nativescript-barcodescanner");
var Toast = require("nativescript-toast");

@Component({
    selector: "my-app",
    template: `
<StackLayout>
    <Label text="Click to scan" class="title"></Label>
    <Button text="Scan" (tap)="scan()"></Button>
    <Label [text]="message" class="message" textWrap="true"></Label>
</StackLayout>
`,
})
export class AppComponent implements OnInit {
    scanResult = ""; 
    
    ngOnInit(){
        barcodescanner.available().then(()=>{
                barcodescanner.hasCameraPermission().then((granted) =>{
                        if(granted){
                            console.log("Permission to use the camera: " + granted);
                        }
                        else{
                            barcodescanner.requestCameraPermission().then(()=>{
                                console.log("Requesting permission to use the camera")
                            });
                        }
                    }
                );
            }
        );
    }
    
    public scan(){
        console.log("scanning")
        barcodescanner.scan({
            formats: "AZTEC,UPC_E,EAN_13,EAN_8,CODE_128,CODE_93,CODE_39,QR_CODE,PDF_417",
            cancelLabel: "Stop scanning", // iOS only, default 'Close' 
            message: "Scan the part", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.' 
            orientation: "landscape"      // Android only, optionally lock the orientation to either "portrait" or "landscape" 
        })
        .then((result)=> this.scanResult = result, (error)=> this.scanResult = error);
    }

    public get message(): string {
        return JSON.stringify(this.scanResult);
    }
}
