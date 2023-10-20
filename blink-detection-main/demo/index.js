import blink from "../index.js";
// import filmData from "../film.json";
import filmData from "./film.json";

// Commonjs Import
// const { blurhashFromURL } = require("blurhash-from-url");

window.addEventListener("load", function () {
  var blinkCount = 0; // Initialize a blink count variable
  const updateModelStatus = () => {
    const status = document.querySelector(".model-status");
    if (status) {
      status.innerHTML = "Model loaded! You can start!";
      status.classList.add("fade-out");
      status.classList.remove("model-status");
    }
  };

  const video = document.querySelector("video");
  var filmName = "";
  // Function to get a random image URL from the JSON data
  async function getRandomImage() {
    hideMessage();
    blinkCount=0;
    document.getElementById("startImg").style.display = "none";
    // const filmData = await fetchFilmData();
    // console.log(filmData);
    if (filmData) {
      //random index within the number of films
      const filmIndex = Math.floor(Math.random() * filmData.length);
      // random index to choose which image is displayed withing the image urls
      const imageIndex = Math.floor(Math.random() * 5);

      // Get the random image URL from the selected JSON object
      const randomImageUrl = filmData[filmIndex].Images[imageIndex];
      //Get name of the movie
      filmName = filmData[filmIndex].Title;
      console.log(filmName);
      // Display the selected image in the HTML
      const randomImageContainer = document.getElementById(
        "randomImageContainer"
      );
      document.getElementById("randomImageContainer").style.webkitFilter = "blur(" + 20+ "px)";
      
      randomImageContainer.innerHTML = `<img src="${randomImageUrl}" alt="Random Image";">`;
    }
  }

  // Add an event listener to the button
  const randomImageBtn = document.getElementById("randomImageBtn");
  randomImageBtn.addEventListener("click", getRandomImage);

  // Add an event listener to listen for the Enter key press
  const userInput = document.getElementById("userInput");

  userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkFilmGuess(userInput.value);
      console.log(userInput.value);
      userInput.value = "";
    }
  });

  // message element that displays status of user 
  const messageElement = document.getElementById("message");

  function displayMessage(message) {
    messageElement.textContent = message;
    messageElement.classList.remove("hidden"); // Show the message
    // Set a timer to hide the message after 5 seconds
  }

  function hideMessage() {
    messageElement.classList.add("hidden"); // Hide the message
}

  let filmGuess = false;
  async function checkFilmGuess(userInput) {
    if (!filmGuess) {
      if (filmName) {
        if (userInput.trim().toLowerCase() === filmName.toLowerCase()) {
          filmGuess = true;
          displayMessage(
            "Congratulations! You guessed the movie correctly. Number of blinks " +
              blinkCount
          );
          //generate new question
          // getRandomImage();
          blinkCount = 0; //reset blink count
        } else if (blinkCount <= 20) {
          displayMessage("Sorry, your guess is incorrect. Try again!");
        } 
        filmGuess = false;
      }
    }
  }

  var raf;
  const init = async () => {
    try {
      await blink.loadModel();
      await blink.setUpCamera(video);
    } catch(e) {
      console.log(e);
      console.log(video)
      await blink.loadModel();
      await blink.setUpCamera(video);
    }
   

    // let blinkIndicator = document.getElementById('blink-indicator');
    let body = document.getElementsByTagName("body");
    const predict = async () => {
      let result = await blink.getBlinkPrediction();
      updateModelStatus();

      if (result) {
        // if (result.blink) {
        //   blinkIndicator.style.color = 'red';
        // } else {
        //   blinkIndicator.style.color = 'green';
        // }
        // document.getElementById("randomImageContainer").style.webkitFilter = "blur(" + (20) + "px)";
        if (result.longBlink) {
          blinkCount++; // Increment the blink count
          // Decrease the blur

          if (blinkCount <= 20) {
            hideMessage();
            document.getElementById("randomImageContainer").style.webkitFilter = "blur(" + (20 - blinkCount) + "px)";
            console.log(blinkCount);
            console.log(20 - blinkCount);
            console.log(document.getElementById("randomImageContainer"));
          } else {
            displayMessage(`Too late! The correct answer is ${filmName}.`);
            document.getElementById("randomImageContainer").style.webkitFilter = "blur(" + 0+ "px)";
          }
        }
      }
      raf = requestAnimationFrame(predict);
    };
    predict();
  };

  // function pixelate() {
  //   // Set the initial blur to 100% correctly
  //   // const randomImageContainer = document.getElementById(
  //   //   "randomImageContainer"
  //   // );
  //   // randomImageContainer.innerHTML = `<img src="${randomImageUrl}" alt="Random Image";">`;
  //   const image = document.querySelector("img");
  //   const options = {
  //     pixel: 100,
  //     clean: true,
  //     alpha: 0.5,
  //   };
  //   new Pixelify(image, options);
  // }

  // function decreaseBlur() {
  //   const randomImageContainer = document.getElementById(
  //     "randomImageContainer"
  //   );
  //   const image = randomImageContainer.querySelector("img");
  //   if (image) {
  //     // Decrease blur based on the blink count
  //     const newBlur = Math.max(0, 100 - blinkCount * 5); // Decrease blur by 5% per blink
  //     image.style.filter = `blur(${newBlur}%)`; // Update the blur value
  //     // console.log(blinkCount);
  //   }
  // }

  init();
});
