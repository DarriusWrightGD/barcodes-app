import {Component, OnInit} from "@angular/core";

var barcodescanner = require("nativescript-barcodescanner");
var Toast = require("nativescript-toast");

@Component({
    selector: "my-app",
    template: `
<StackLayout>
    <Label text="Click to scan" class="title"></Label>
    <Button text="Scan Part" (tap)="scan()"></Button>
    <Label [text]="message" [hidden]="message == ''" class="message" textWrap="true"></Label>
</StackLayout>
`,
})
export class AppComponent implements OnInit {
    scanResult = ''; 
    
    ngOnInit(){
        barcodescanner.available().then(()=>{
                barcodescanner.hasCameraPermission().then((granted) =>{
                        if(granted){
                            console.log("Permission to use the camera: " + granted);
                        }
                        else{
                            var obtainedResult = barcodescanner.requestCameraPermission().then(()=>{
                                console.log("Requesting permission to use the camera");
                            });
                            
                            obtainedResult.then((response)=>console.log("Response: " + JSON.stringify(response)));
                        }
                    }
                );
            }
        );
    }
    
    public scan(){
        console.log("scanning")
        var result = barcodescanner.scan({
            formats: "AZTEC,UPC_E,EAN_13,EAN_8,CODE_128,CODE_93,CODE_39,QR_CODE,PDF_417",
            cancelLabel: "Stop scanning", // iOS only, default 'Close' 
            message: "Scan for parts", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.' 
            orientation: "landscape"      // Android only, optionally lock the orientation to either "portrait" or "landscape" 
        })
        .then((result)=> this.scanResult = result, (error)=> this.scanResult = error);
        result.then((r)=> console.log("barcode result: " + JSON.stringify(r)));
       
    }

    public get message(): string {
        if(this.scanResult == '')
            return this.scanResult
        return JSON.stringify(this.scanResult);
    }
}
