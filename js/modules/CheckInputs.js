import { inputTestLocations1, inputTestLocations2, inputReadings, buttonGenerateMeasurementLog } from './GetData.js';

function checkInputs() {
  let input1Correct = false;
  let input2Correct = false;
  let input3Correct = false;

  if (inputTestLocations1.value < 10) {
    inputTestLocations1.style.backgroundColor = '#d87272';
    input1Correct = false;
  } else {
    inputTestLocations1.style.backgroundColor = '#54c04a';
    input1Correct = true;
  }

  if (inputTestLocations2.value < 0 || inputTestLocations2.value === '') {
    inputTestLocations2.style.backgroundColor = '#d87272';
    input2Correct = false;
  } else {
    inputTestLocations2.style.backgroundColor = '#54c04a';
    input2Correct = true;
  }

  if (inputReadings.value < 9) {
    inputReadings.style.backgroundColor = '#d87272';
    input3Correct = false;
  } else {
    inputReadings.style.backgroundColor = '#54c04a';
    input3Correct = true;
  }


  if (input1Correct && input2Correct && input3Correct) {
    buttonGenerateMeasurementLog.removeAttribute('disabled');
  } else {
    buttonGenerateMeasurementLog.setAttribute('disabled', 'true');
  }
}

export { checkInputs };