// selecting video element
let videoPlayer = document.querySelector("video");
let constraints = { video: true, audio: true } // permission we want to access like video audio etc  are the constraints
let btnRecord = document.querySelector("button#record");
let btnCapture = document.querySelector("button#capture");
let mediaRecoder;
let isrecording = false;
let chunks = [];

/*Button Events */
btnRecord.addEventListener("click", function (e) {
    let innerDiv =  btnRecord.querySelector("div");
    if (isrecording) {
        mediaRecoder.stop();
        isrecording = false;
        // btnRecord.innerHTML = "Record";
        innerDiv.classList.remove("record-animation")
    } else {

        mediaRecoder.start();
        isrecording = true;
        // btnRecord.innerHTML = "Recoding...";
        innerDiv.classList.add("record-animation");

    }

})

btnCapture.addEventListener("click", function () {
   let innerDiv =  btnCapture.querySelector("div");
   innerDiv.classList.add("capture-animation")
   setTimeout(() => {
       innerDiv.classList.remove("capture-animation");
   }, 400);
    captureImage();
})



/* navigator is browser buildin  object having child mediaDevices to getUsermedia which accept all permission 
constraints and return a promise with live mediaStream which is an object and assign to source */

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {

    videoPlayer.srcObject = mediaStream; // assigning src object to video instead on url  
    mediaRecoder = new MediaRecorder(mediaStream); // passing th stream to recorder

    mediaRecoder.addEventListener("dataavailable", function (e) { //event 1 of media Recorder
        chunks.push(e.data);
    });

    mediaRecoder.addEventListener("stop", function (e) { //event 2 of media Recorder
        let blob = new Blob(chunks, { type: "video/mp4" }); // basically adding up small chunks of data to one in format mp4

        chunks = []; //empty the stored data

        //  creating download url - via creating ancor element and appending href and download value
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "video.mp4";
        a.click();
        a.remove();
    });


});


//  to caputure image 
function captureImage() {
    let canvas = document.createElement("canvas");
    canvas.width = videoPlayer.videoWidth;  // giving videoplayer height to canvas for caputre img height & width
    canvas.height = videoPlayer.videoHeight;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0); // didnt pass height as its taking from video player itself

    let a = document.createElement("a");
    a.download = "image.jpg";
    a.href = canvas.toDataURL(); // whole canvas data at a frame to URL 
    a.click();
    a.remove(); // removeing a element after click
}