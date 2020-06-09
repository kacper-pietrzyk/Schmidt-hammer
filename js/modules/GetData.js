// get buttons
const buttonGenerateMeasurementLog = document.getElementById('button-generate-log');
const buttonClearMeasurementLog = document.getElementById('button-clear-log');
const buttonMakeCalculations = document.getElementById('button-calculations');
const buttonReport = document.querySelector('.output-data__button');

// get inputs for measurement log
const inputTestLocations1 = document.getElementById('test-location-type-1');
const inputTestLocations2 = document.getElementById('test-location-type-2');
const inputReadings = document.getElementById('readings');

// get elements to generate tables
// table-input 1
const tableInput1Header = document.getElementById('table-input-1-header');
const tableInput1Div = document.getElementById('table-input-1-div');
const tableInput1Head = document.getElementById('thead-input-1');
const tableInput1Body = document.getElementById('tbody-input-1');

// table-input 2
const tableInput2Header = document.getElementById('table-input-2-header');
const tableInput2Div = document.getElementById('table-input-2-div');
const tableInput2Head = document.getElementById('thead-input-2');
const tableInput2Body = document.getElementById('tbody-input-2');

// table-output 1
const tableOutput1Div = document.getElementById('table-output-1-div');
const tableOutput1Head = document.getElementById('thead-output-1');
const tableOutput1Body = document.getElementById('tbody-output-1');

// table-output 2
const tableOutput2Div = document.getElementById('table-output-2-div');
const tableOutput2Head = document.getElementById('thead-output-2');
const tableOutput2Body = document.getElementById('tbody-output-2');
const tableOutput2Foot = document.getElementById('tfoot-output-2');

// get others elements for calculations
const tableInput1Result = document.getElementById('table-input-1-result');
const tableOutput1Result = document.getElementById('table-output-1-result');
const chart1Div = document.getElementById('chart-1-box');
const chart2Div = document.getElementById('chart-2-box');
const chart3Div = document.getElementById('chart-3-box');
const basicCurveFormula = document.getElementById('basic-curve');
const k1FactorDiv = document.getElementById('k1-factor-div');
const deltaDiv = document.getElementById('delta-f-div');
const correctedCurveFormula = document.getElementById('corrected-curve');
const fckFormulae = document.getElementById('fck-formulae');
const vfDiv = document.getElementById('vf-div');
const fckDiv = document.getElementById('fck-is-div');
const finalResults = document.getElementById('final-results');

// get informations about using the program
const startInfo = document.getElementById('start-info');

// colors to mark cells and for charts
const darkGreen = '#0f2f12';
const lightGreen = '#164a19';
const darkRed = '#2f0f12';
const lightRed = '#410e11';
const colorBars = '#094186';
const colorGridLines = '#c7c7d210';
const basicCurveColor = "#4bc0c0";
const correctedCurveColor = "#f52a20";
const directPointsColor = "#05de02";

export {
  buttonGenerateMeasurementLog,
  buttonClearMeasurementLog,
  buttonMakeCalculations,
  buttonReport,
  inputTestLocations1,
  inputTestLocations2,
  inputReadings,
  tableInput1Header,
  tableInput1Div,
  tableInput1Head,
  tableInput1Body,
  tableInput2Header,
  tableInput2Div,
  tableInput2Head,
  tableInput2Body,
  tableOutput1Div,
  tableOutput1Head,
  tableOutput1Body,
  tableOutput2Div,
  tableOutput2Head,
  tableOutput2Body,
  tableOutput2Foot,
  tableInput1Result,
  tableOutput1Result,
  chart1Div,
  chart2Div,
  chart3Div,
  basicCurveFormula,
  k1FactorDiv,
  deltaDiv,
  correctedCurveFormula,
  fckFormulae,
  vfDiv,
  fckDiv,
  finalResults,
  startInfo,
  darkGreen,
  lightGreen,
  darkRed,
  lightRed,
  colorBars,
  colorGridLines,
  basicCurveColor,
  correctedCurveColor,
  directPointsColor
}