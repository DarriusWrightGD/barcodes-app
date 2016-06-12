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
            cancelLabel: "Stop scanning", // iOS only, default 'Close' 
            message: "Go scan something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.' 
            preferFrontCamera: false,     // Android only, default false 
            showFlipCameraButton: true,   // Android only, default false (on iOS it's always available) 
            orientation: "landscape"      // Android only, optionally lock the orientation to either "portrait" or "landscape" 
        }).then(
            function(result) {
                console.log("Scan format: " + result.format);
                console.log("Scan text:   " + result.text);
                console.log("Scan result: " + result);
            },
            function(error) {
                console.log("No scan: " + error);
            }
        )
    }

    public get message(): string {
        return "Scan message eventually";
    }
}
