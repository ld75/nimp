var localMediaStream;
var recorder;

window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      audio_context = new AudioContext;
    } catch (e) {
      alert('No web audio support in this browser!');
    }
  if ( navigator.getUserMedia){
  		  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      		alert('No live audio input: ' + e);
   	 		});
	}
	else {
    		navigator.mozGetUserMedia({audio: true}, startUserMedia, function(e) {
      		alert('No live audio input: ' + e);
    		});

	}
  };
    function startUserMedia(stream) {
      var input = audio_context.createMediaStreamSource(stream);
      console.log('Media stream created.');
      // Uncomment if you want the audio to feedback directly
      //input.connect(audio_context.destination);
      //__log('Input connected to audio context destination.');
      recorder = new Recorder(input);
      console.log('Recorder initialised.');
    }
  function startRecording(button) {
    recorder && recorder.record();
    console.log('Recording...');
    document.getElementById("record").classList.add('recording');
    setTimeout("stopRecording()", 5000);
  }

  function stopRecording() {
    recorder && recorder.stop();
     console.log('Stop Recording');
    document.getElementById("play").classList.add('play');
    createPlayLink();
    uploadToServer();
   // recorder.clear();
  }

  function uploadToServer(){
  		recorder.exportWAV(
  					function(blob)
  					{
  		 				var fileType = blob.type.split('/')[0] || 'audio';
                  				var fileName = "RecordRTC-"+(Math.random() * 1000).toString().replace('.', '');
                      				fileName += '.wav';
                  				// create FormData
                  				var formData = new FormData();
                  				formData.append(fileType + '-filename', fileName);
                  				formData.append(fileType + '-blob', blob);
  		 				makeXMLHttpRequest(
  									'save.php',
  									 formData,
  									 function(progress)
  									 {
                 									//         callback(progress);
                 									//         return;
                     							 }
                  						  );
             				 }
        				 );
  		recorder.clear();
  				}
function makeXMLHttpRequest(url, data, callback) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {
                        callback('upload-ended');
                    }
                };

                request.upload.onloadstart = function() {
                    callback('Upload started...');
                };

                request.upload.onprogress = function(event) {
                    callback('Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%");
                };

                request.upload.onload = function() {
                    callback('progress-about-to-end');
                };

                request.upload.onload = function() {
                    callback('progress-ended');
                };

                request.upload.onerror = function(error) {
                    callback('Failed to upload to server');
                    console.error('XMLHttpRequest failed', error);
                };

                request.upload.onabort = function(error) {
                    callback('Upload aborted.');
                    console.error('XMLHttpRequest aborted', error);
                };

                request.open('POST', url);
                request.send(data);
            }
 function createPlayLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var au = document.getElementById("lecture");
      au.controls = true;
      au.src = url;
      console.log(url);
      au.play();
    });
  }
