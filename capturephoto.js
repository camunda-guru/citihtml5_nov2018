/**
 * Created by BALASUBRAMANIAM on 09-06-2016.
 */
window.onload=capturePhoto;

console.log("taking.....");
var width = 640;    // We will scale the photo width to this
var height = 150;     // This will be computed based on the input stream
var video=null;
var streaming = false;
var canvas = null;
var photo = null;
var startbutton = null;
var stream=null;
function capturePhoto() {



    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
            height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
    }

    navigator.getUserMedia_ = (   navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia);

    navigator.getUserMedia_(
        {
            video: true,
            audio: false
        },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {

                var vendorURL = window.URL || window.webkitURL;
                video.srcObject = stream;
                video.play();

            }
            document.getElementById("btnGetAudioTracks").addEventListener("click", function(){
                console.log("getAudioTracks");
                console.log(stream.getAudioTracks());
            });

            document.getElementById("btnGetTrackById").addEventListener("click", function(){
                console.log("getTrackById");
                console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
            });

            document.getElementById("btnGetTracks").addEventListener("click", function(){
                console.log("getTracks()");
                console.log(stream.getTracks());
            });

            document.getElementById("btnGetVideoTracks").addEventListener("click", function(){
                console.log("getVideoTracks()");
                console.log(stream.getVideoTracks());
            });

            document.getElementById("btnRemoveAudioTrack").addEventListener("click", function(){
                console.log("removeAudioTrack()");
                stream.removeTrack(stream.getAudioTracks()[0]);
            });

            document.getElementById("btnRemoveVideoTrack").addEventListener("click", function(){
                console.log("removeVideoTrack()");
                stream.removeTrack(stream.getVideoTracks()[0]);
            });


        },
        function (err) {
            console.log("An error occured! " + err);
        }
    );

// Trigger photo take
    document.getElementById("startbutton").addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);

       //context.toDataURL("image/png");
        var img = new Image();
        var output= document.getElementById("output");
        img.addEventListener("load", function () {
            context.drawImage(img, 0, 0, 600, 200);
            // Get canvas content as a base64 image
            var base64Img = context.toDataURL("image/png");
            output.appendChild(img);
            var dataURL =  canvas.toDataURL("image/png");

            //imgData= dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
            console.log(dataURL);
           window.localStorage.setItem("photo",dataURL);

        }, false);



        console.log("file saved");

    });



  }

