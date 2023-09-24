//written by Robi, cleaned up by ChatGPT
document.addEventListener('DOMContentLoaded', () => {
    const soundcloudIframe = document.querySelector('iframe');
  
    // Wait for the SoundCloud iframe to load its content
    soundcloudIframe.onload = () => {
      const soundcloudWindow = soundcloudIframe.contentWindow;
  
      // Post a message to the iframe to request access to the audio element
      soundcloudWindow.postMessage('request-audio-element', 'https://w.soundcloud.com');
  
      // Listen for messages from the iframe
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://w.soundcloud.com' && event.data === 'audio-element-available') {
          // Once we receive confirmation that the audio element is available,
          // we can proceed with setting up the audio context and analyzer.
          const soundcloudAudio = soundcloudWindow.document.querySelector('audio');
  
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyzer = audioContext.createAnalyser();
  
          const source = audioContext.createMediaElementSource(soundcloudAudio);
          source.connect(analyzer);
          source.connect(audioContext.destination);
  
          analyzer.fftSize = 4096;
          const bufferLength = analyzer.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          const canvas = document.createElement('canvas');
          const canvasContext = canvas.getContext('2d');
          document.body.appendChild(canvas);
  
          function draw() {
            analyzer.getByteFrequencyData(dataArray);
            console.log(dataArray);
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
  
            dataArray.forEach((value) => {
              const barHeight = (value / 256) * canvas.height;
              canvasContext.fillStyle = 'rgb(' + (value + 100) + ',50,50)';
              canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              x += barWidth + 1;
            });
  
            requestAnimationFrame(draw);
          }
  
          draw();
        }
      });
    };
  });
  