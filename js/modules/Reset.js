import * as Data from './GetData.js';
import { chart1, chart2, chart3, chartsAreShown } from '../main.js';

const clearMeasurementLog = () => {

  Data.buttonClearMeasurementLog.setAttribute('disabled', 'true');
  Data.buttonMakeCalculations.setAttribute('disabled', 'true');
  Data.inputTestLocations1.removeAttribute('disabled');
  Data.inputTestLocations2.removeAttribute('disabled');
  Data.inputReadings.removeAttribute('disabled');
  Data.inputTestLocations1.style.backgroundColor = '#c7c7d2';
  Data.inputTestLocations2.style.backgroundColor = '#c7c7d2';
  Data.inputReadings.style.backgroundColor = '#c7c7d2';

  Data.tableInput1Header.classList.add('hidden');
  Data.tableInput2Header.classList.add('hidden');
  Data.tableInput1Div.classList.add('hidden');
  Data.tableInput2Div.classList.add('hidden');
  Data.tableOutput1Div.classList.add('hidden');
  Data.tableOutput2Div.classList.add('hidden');
  Data.startInfo.classList.remove('hidden');

  Data.tableInput1Head.innerHTML = '';
  Data.tableInput1Body.innerHTML = '';
  Data.tableInput2Head.innerHTML = '';
  Data.tableInput2Body.innerHTML = '';
  Data.tableOutput1Head.innerHTML = '';
  Data.tableOutput1Body.innerHTML = '';
  Data.tableOutput2Head.innerHTML = '';
  Data.tableOutput2Body.innerHTML = '';
  Data.tableOutput2Foot.innerHTML = '';

  Data.tableInput1Result.classList.add('hidden');
  Data.tableOutput1Result.classList.add('hidden');
  Data.chart1Div.classList.add('hidden');
  Data.chart2Div.classList.add('hidden');
  Data.chart3Div.classList.add('hidden');
  Data.basicCurveFormula.classList.add('hidden');
  Data.k1FactorDiv.classList.add('hidden');
  Data.deltaDiv.classList.add('hidden');
  Data.correctedCurveFormula.classList.add('hidden');
  Data.fckFormulae.classList.add('hidden');
  Data.vfDiv.classList.add('hidden');
  Data.fckDiv.classList.add('hidden');
  Data.finalResults.classList.add('hidden');

  if (chartsAreShown) {
    if (chart1) {
      chart1.destroy();
    }
    if (chart2) {
      chart2.destroy();
    }
    if (chart3) {
      chart3.destroy();
    }
  }
}

export { clearMeasurementLog };