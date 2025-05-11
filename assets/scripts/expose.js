// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Get the dropdown menu (for selecting horn type)
  const hornSelect = document.getElementById('horn-select');

  // Get the <img> element that displays the horn image
  // Note: The img tag within section#expose in expose.html doesn't have an id, so we use a more specific selector
  const hornImage = document.querySelector('#expose img');

  // Get the <audio> element
  const audioElement = document.querySelector('audio'); // There's only one audio element on the page

  // Get the volume control slider <input type="range">
  const volumeSlider = document.getElementById('volume');

  // Get the <img> element that displays the volume icon
  const volumeIcon = document.querySelector('#volume-controls img');

  // Get the "Play Sound" button
  const playButton = document.querySelector('#expose button'); // The button within section#expose

  // Initialize JSConfetti instance (for party horn)
  const jsConfetti = new JSConfetti();

  // TODO: Add event listeners and handling logic

  // Add 'change' event listener for the horn selection dropdown
  hornSelect.addEventListener('change', function () {
    const selectedHorn = hornSelect.value; // Get the currently selected horn value

    // Update image and audio based on selection
    // Image path: assets/images/<value>.svg (e.g., air-horn.svg)
    // Audio path: assets/audio/<value>.mp3 (e.g., air-horn.mp3)

    if (selectedHorn === 'select') {
      // If "Select Horn:" (disabled option) is chosen, reset to default no-image state
      hornImage.src = 'assets/images/no-image.png';
      hornImage.alt = 'No image selected';
      audioElement.src = ''; // Clear audio source
    } else {
      hornImage.src = `assets/images/${selectedHorn}.svg`;
      hornImage.alt = `${selectedHorn.replace('-', ' ')} horn`; // e.g., "air horn horn" (could be further optimized)
      audioElement.src = `assets/audio/${selectedHorn}.mp3`;
    }
  });

  // Implement volume slider functionality
  // Add 'input' event listener for the volume slider
  volumeSlider.addEventListener('input', function () {
    const volumeValue = parseInt(volumeSlider.value); // Get slider value (0-100)
    let iconPath = 'assets/icons/';

    // Update icon based on volume level
    if (volumeValue === 0) {
      iconPath += 'volume-level-0.svg';
    } else if (volumeValue < 33) {
      iconPath += 'volume-level-1.svg';
    } else if (volumeValue < 67) {
      iconPath += 'volume-level-2.svg';
    } else {
      iconPath += 'volume-level-3.svg';
    }
    volumeIcon.src = iconPath;
    volumeIcon.alt = `Volume level ${Math.ceil(volumeValue / 33) - 1 < 0 ? 0 : Math.ceil(volumeValue / 33) - 1}`; // Generate appropriate alt text

    // Update audio element volume (slider is 0-100, audio.volume is 0.0-1.0)
    audioElement.volume = volumeValue / 100;
  });

  // Implement play sound button functionality
  // Add 'click' event listener for the play sound button
  playButton.addEventListener('click', function () {
    // Ensure a horn is selected and audio source is set
    if (audioElement.src && hornSelect.value !== 'select') {
      audioElement.play(); // Play the sound

      // If it's the party horn, throw confetti
      if (hornSelect.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    } else {
      // Optional: Provide feedback if no horn is selected
      // console.log("Please select a horn first.");
      // alert("Please select a horn first.");
    }
  });
}

// trigger new workflow with eslint
