// explore.js

window.addEventListener('DOMContentLoaded', init);

/**
 *
 *
 */
function init() {
  const textToSpeakTextarea = document.getElementById('text-to-speak');
  const voiceSelectDropdown = document.getElementById('voice-select');
  const talkButton = document.querySelector('#explore button');
  const faceImage = document.querySelector('#explore img');
  const synth = window.speechSynthesis;

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
    const currentSelectedValue = voiceSelectDropdown.value;

    // Remove all options starting from the second one, keeping only the first "Select Voice:" option (already in HTML)
    while (voiceSelectDropdown.options.length > 1) {
      voiceSelectDropdown.remove(1);
    }

    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = voice.name; // Use voice.name as the value
      voiceSelectDropdown.appendChild(option);
    });

    // Try to restore the previous selection
    if (
      voices.some((voice) => voice.name === currentSelectedValue) &&
      currentSelectedValue !== 'select'
    ) {
      voiceSelectDropdown.value = currentSelectedValue;
    } else if (
      voiceSelectDropdown.options.length > 1 &&
      voiceSelectDropdown.value === 'select'
    ) {
      // If previously on "Select Voice:" and other voices are available, keep default for user to select
      // Alternatively, could default to first real voice: voiceSelectDropdown.selectedIndex = 1;
    }
  }

  // Initial loading of voice list
  populateVoiceList();
  // Listen for changes to the voice list
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  talkButton.addEventListener('click', function () {
    const textToSpeak = textToSpeakTextarea.value;
    const selectedVoiceName = voiceSelectDropdown.value;

    if (synth.speaking) {
      // If already speaking, can either cancel current speech or simply return
      // synth.cancel(); // Cancel current speech, then play new one
      return; // Simple handling: if speaking, ignore new request
    }

    if (textToSpeak.trim() !== '' && selectedVoiceName !== 'select') {
      const utterThis = new SpeechSynthesisUtterance(textToSpeak);

      const selectedVoiceObject = voices.find(
        (voice) => voice.name === selectedVoiceName,
      );
      if (selectedVoiceObject) {
        utterThis.voice = selectedVoiceObject;
      } else {
        console.warn(
          `Selected voice "${selectedVoiceName}" not found in available voices. Using browser default.`,
        );
        // If selected voice not found (e.g., after list refresh), browser will use default voice
      }

      utterThis.onstart = function (event) {
        faceImage.src = 'assets/images/smiling-open.png';
        faceImage.alt = 'Open mouthed smiling face';
      };

      utterThis.onend = function (event) {
        faceImage.src = 'assets/images/smiling.png';
        faceImage.alt = 'Smiling face';
      };

      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror', event);
        faceImage.src = 'assets/images/smiling.png';
        faceImage.alt = 'Smiling face';
      };

      synth.speak(utterThis);
    } else if (textToSpeak.trim() === '') {
      // alert("Please enter text to speak.");
    } else if (selectedVoiceName === 'select') {
      // alert("Please select a voice.");
    }
  });
}
