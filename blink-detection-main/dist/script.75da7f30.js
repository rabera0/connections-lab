// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
// import blink from 'blink-detection';

window.addEventListener('load', async function () {
  // await blink.loadModel();

  // // set up the camera feed needed for the detection
  // const videoElement = document.querySelector('video');

  // const init = async () => {
  //   // Using the default webcam
  //   await gaze.setUpCamera(videoElement);

  //   // Or, using more camera input devices
  //   const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  //   const camera = mediaDevices.find(
  //     (device) =>
  //       device.kind === 'videoinput' &&
  //       device.label.includes(/* The label from the list of available devices*/)
  //   );

  //   await gaze.setUpCamera(videoElement, camera.deviceId);
  // };

  // //training
  // const predict = async () => {
  //     const blinkPrediction = await blink.getBlinkPrediction();
  //     console.log('Blink: ', blinkPrediction); // will return an object indicating the booleans for different states
  //     // expect blinkPrediction to be {
  //     //  blink: boolean,
  //     //  wink: boolean,
  //     //  longBlink: boolean,
  //     //  left: boolean,
  //     //  right: boolean,
  //     //  rate: number
  //     // }
  //     if (blinkPrediction.blink) {
  //       console.log(blinkPrediction);
  //     }
  //     let raf = requestAnimationFrame(predict);
  //   };
  //   predict();
  //   cancelAnimationFrame(raf);

  // Function to fetch the JSON data from the "film.json" file
  async function fetchFilmData() {
    try {
      const response = await fetch('film.json'); // Replace with the correct path to your JSON file
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Function to get a random image URL from the JSON data
  async function getRandomImage() {
    const filmData = await fetchFilmData();
    if (filmData) {
      //random index within the number of films
      const filmIndex = Math.floor(Math.random() * filmData.length);
      // random index to choose which image is displayed withing the image urls
      const imageIndex = Math.floor(Math.random() * 5);

      // Get the random image URL from the selected JSON object
      const randomImageUrl = filmData[filmIndex].Images[imageIndex];

      //Get name of the movie
      const filmName = filmData[filmIndex].Title;
      console.log(filmName);
      // Display the selected image in the HTML
      const randomImageContainer = document.getElementById('randomImageContainer');
      randomImageContainer.innerHTML = `<img src="${randomImageUrl}" alt="Random Image">`;
    }
  }
  // Add an event listener to the button
  const randomImageBtn = document.getElementById('randomImageBtn');
  randomImageBtn.addEventListener('click', getRandomImage);
});
},{}]},{},["script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map