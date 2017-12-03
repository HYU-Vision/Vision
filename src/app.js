var SW = new SiriWave({
	width: 400,
	height: 100,
	speed: 0.12,
	amplitude: 0,
	container: document.getElementById('siri-container'),
	autostart: true,
  style: 'ios9'
});

$(function() {
  $('.btn').on('click', function() {
    console.log('click');
    $('.text').removeClass('animated fadeInUp');
    setTimeout(function() {
      $('.text').addClass('animated fadeInUp');
    }, 100);
  });
});

window.onload = function () {
  var soundAllowed = function (stream) {
      window.persistAudioStream = stream;
      var audioContent = new AudioContext();
      var audioStream = audioContent.createMediaStreamSource( stream );
      var analyser = audioContent.createAnalyser();
      audioStream.connect(analyser);
      analyser.fftSize = 32;

      var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      var doDraw = function() {
        requestAnimationFrame(doDraw);
        analyser.getByteFrequencyData(frequencyArray);
        SW.setAmplitude(frequencyArray[3]/100);

      }
      doDraw();
  }

  var soundNotAllowed = function (error) {
      h.innerHTML = "You must allow your microphone.";
      console.log(error);
  }
  navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);
};
