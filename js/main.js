import {
  buttonGenerateMeasurementLog,
  buttonClearMeasurementLog,
  buttonMakeCalculations,
  buttonReport,
  inputTestLocations1,
  inputTestLocations2,
  inputReadings,
  tableInput1Result,
  chart1Div,
  chart2Div,
  chart3Div,
  tableOutput1Result,
  tableOutput2Div,
  basicCurveFormula,
  k1FactorDiv,
  deltaDiv,
  correctedCurveFormula,
  fckFormulae,
  vfDiv,
  fckDiv,
  finalResults,
  darkGreen,
  lightGreen,
  darkRed,
  lightRed,
  colorBars,
  colorGridLines,
  basicCurveColor,
  correctedCurveColor,
  directPointsColor
} from './modules/GetData.js';
import {
  generateMeasurementLog,
  numberOfTestLocations1,
  numberOfTestLocations2
} from './modules/MeasurementLog.js';
import {
  clearMeasurementLog
} from './modules/Reset.js';
import {
  calculateOrientationFactor
} from './modules/OrientationFactor.js';
import {
  calculateKnFactor
} from './modules/KnFactor.js';
import {
  calculateMFactor
} from './modules/MFactor.js';
import {
  generateOutputTables
} from './modules/TableOutput.js';
import {
  calculateAverage
} from './modules/Average.js';
import {
  calculateStandardDeviation
} from './modules/StandardDeviation.js';
import {
  calculateScPartStandardDeviation
} from './modules/ScPartStandardDeviation.js';
import {
  specifyConreteClass,
  specifyHomogenity
} from './modules/SpecifyResults.js';
import {
  checkInputs
} from './modules/CheckInputs.js';
import { generateReport } from './modules/Report.js'

let chart1;
let chart2;
let chart3;
let chartsAreShown = false;

const validConvertedMediansTable1 = [];
const validConvertedMediansTable2 = [];

const makeCalculations = () => {

  // get all input-cells with rebound readings and fic value
  const inputCells = document.querySelectorAll('.table__data--input');

  // check if the measurement log is filled
  let filledCells = 0;
  for (let i = 0; i < inputCells.length; i++) {
    if (inputCells[i].value !== '') {
      filledCells++;
    }
  }
  if (filledCells !== inputCells.length) {
    alert(`Dziennik pomiarów sklerometrycznych nie został w całości uzupełniony. Wypełniono ${filledCells} spośród ${inputCells.length} komórek dziennika. Proszę uzupełnić brakujące wartości i ponownie uruchomić obliczenia.`);
    return;
  }

  buttonMakeCalculations.setAttribute('disabled', 'true');

  // get all cells in tables which show results
  const resultCells = document.querySelectorAll('.table__data-result');
  // get all cells in tables with angle's values
  const selectCells = document.querySelectorAll('.table__data--select-angle');

  // extract angle's column from tables
  const angleCellsTable1 = [...selectCells].filter(selectCell => selectCell.dataset.name === 'table-1_angle');
  const angleCellsTable2 = [...selectCells].filter(selectCell => selectCell.dataset.name === 'table-2_angle');
  // extract median's column from tables
  const medianCellsTable1 = [...resultCells].filter(resultCell => resultCell.dataset.name === 'table-1_median');
  const medianCellsTable2 = [...resultCells].filter(resultCell => resultCell.dataset.name === 'table-2_median');
  // extract converted median's column from tables
  const convertedMedianCellsTable1 = [...resultCells].filter(resultCell => resultCell.dataset.name === 'table-1_converted-median');
  const convertedMedianCellsTable2 = [...resultCells].filter(resultCell => resultCell.dataset.name === 'table-2_converted-median');

  // extract fic column
  const ficCells = [...inputCells].filter(inputCell => inputCell.dataset.name === 'fic');
  // extract fis column
  const fisCells = [...resultCells].filter(resultCell => resultCell.dataset.name === 'fis');

  const numberOfTable1 = 1;
  const numberOfTable2 = 2;

  const firstRowNumberTable1 = 1;
  const firstRowNumberTable2 = numberOfTestLocations1 + 1;

  const mediansTable1 = [];
  const mediansTable2 = [];
  const convertedMediansTable1 = [];
  const convertedMediansTable2 = [];
  const fis = [];

  const fillInputTables = (numberOfTable, numberOfTestLocations, numberOfFirstRow, medianCells, medians, angleCells, convertedMedianCells, convertedMedians) => {

    for (let i = 0; i < numberOfTestLocations; i++) {
      const inputCellsRow = [...inputCells].filter(inputCell => inputCell.dataset.name === `table-${numberOfTable}_inputs_row-${i + numberOfFirstRow}`);
      const inputCellsRowValue = inputCellsRow.map(inputCellRow => Number(inputCellRow.value));
      inputCellsRowValue.sort((a, b) => a - b);
      const halfLength = Math.floor(inputCellsRowValue.length / 2);

      // calculate medians
      if (inputCellsRowValue.length % 2) {
        medians[i] = inputCellsRowValue[halfLength];
        medianCells[i].textContent = medians[i];
      } else {
        medians[i] = (inputCellsRowValue[halfLength - 1] + inputCellsRowValue[halfLength]) / 2;
        medianCells[i].textContent = medians[i];
      }

      // mark cells with green and red color to show which values are out of range
      const properValues = inputCellsRowValue.filter(value => value >= 0.7 * medians[i] && value <= 1.3 * medians[i]);
      inputCellsRow.forEach(cell => cell.value >= 0.7 * medians[i] && cell.value <= 1.3 * medians[i] ? cell.style.backgroundColor = darkGreen : cell.style.backgroundColor = darkRed);

      // calculate converted-medians and mark cells with red/green color
      const angle = Number(angleCells[i].value);
      const orientationFactor = calculateOrientationFactor(angle, medians[i]);
      if (properValues.length >= 0.8 * inputCellsRowValue.length) {
        medianCells[i].style.backgroundColor = lightGreen;
        convertedMedianCells[i].style.backgroundColor = lightGreen;
        if (Number(medians[i] + orientationFactor) >= 0) {
          convertedMedians[i] = Math.floor(medians[i] + orientationFactor);
        } else {
          convertedMedians[i] = 0;
        }
        convertedMedianCells[i].textContent = convertedMedians[i];
      } else {
        convertedMedians[i] = null;
        medianCells[i].style.backgroundColor = lightRed;
        convertedMedianCells[i].style.backgroundColor = lightRed;
        convertedMedianCells[i].textContent = '-';
      }

      // calculate fis values
      if (numberOfTable === 1) {
        fis[i] = Number((ficCells[i].value / 0.85).toFixed(2));
        if (properValues.length >= 0.8 * inputCellsRowValue.length) {
          fisCells[i].textContent = fis[i];
          fisCells[i].style.backgroundColor = lightGreen;
        } else {
          fisCells[i].style.backgroundColor = lightRed;
          fisCells[i].textContent = '-';
        }
      }
    }
  }

  fillInputTables(numberOfTable1, numberOfTestLocations1, firstRowNumberTable1, medianCellsTable1, mediansTable1, angleCellsTable1, convertedMedianCellsTable1, convertedMediansTable1);
  fillInputTables(numberOfTable2, numberOfTestLocations2, firstRowNumberTable2, medianCellsTable2, mediansTable2, angleCellsTable2, convertedMedianCellsTable2, convertedMediansTable2);

  const tableInput1Results = () => {

    // get elements which shows results of table 1
    const avgReboundNumberBox = document.getElementById('average-rebound-number');
    const sdReboundNumberBox = document.getElementById('SD-rebound-number');
    const avgStrengthBox = document.getElementById('average-strength');
    const minStrengthBox = document.getElementById('min-strength');
    const sdStrengthBox = document.getElementById('SD-strength');

    // clear validConvertedMediansTable1 after previous calculations
    if (validConvertedMediansTable1.length) {
      const tableLength = validConvertedMediansTable1.length;
      for (let i = 0; i < tableLength; i++) {
        validConvertedMediansTable1.pop();
      }
    }
    // clear validConvertedMediansTable2 after previous calculations
    if (validConvertedMediansTable2.length) {
      const tableLength = validConvertedMediansTable2.length;
      for (let i = 0; i < tableLength; i++) {
        validConvertedMediansTable2.pop();
      }
    }

    // remove incorrect test locations
    let removedElements = 0;
    for (let i = 0; i < convertedMediansTable1.length; i++) {
      if (convertedMediansTable1[i] !== null) {
        validConvertedMediansTable1.push(convertedMediansTable1[i]);
      } else {
        fis.splice(i - removedElements, 1);
        removedElements++;
      }
    }
    for (let i = 0; i < convertedMediansTable2.length; i++) {
      if (convertedMediansTable2[i] !== null) {
        validConvertedMediansTable2.push(convertedMediansTable2[i]);
      }
    }

    // calculate table-1 results
    const avgReboundNumber = calculateAverage(validConvertedMediansTable1);
    const sdReboundNumber = calculateStandardDeviation(validConvertedMediansTable1);
    const avgStrength = calculateAverage(fis);
    const minStrength = Math.min(...fis);
    const sdStrength = calculateStandardDeviation(fis);

    // show table-1 results
    tableInput1Result.classList.remove('hidden');
    avgReboundNumberBox.textContent = avgReboundNumber;
    sdReboundNumberBox.textContent = sdReboundNumber;
    avgStrengthBox.textContent = avgStrength;
    minStrengthBox.textContent = minStrength;
    sdStrengthBox.textContent = sdStrength;
  }

  tableInput1Results();

  const showBarCharts = () => {

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontColor = "#c7c7d2";
    chartsAreShown = true;

    const chart1Labels = [];
    for (let i = firstRowNumberTable1; i <= numberOfTestLocations1; i++) {
      chart1Labels.push(i);
    }

    chart1Div.classList.remove('hidden');

    // chart 1
    chart1 = new Chart(document.getElementById("chart1"), {
      type: 'bar',
      data: {
        labels: chart1Labels,
        datasets: [{
          label: "Liczba odbicia",
          backgroundColor: () => {
            const colorsArray = [];
            for (let i = 0; i <= numberOfTestLocations1; i++) {
              colorsArray.push(colorBars);
            }
            return colorsArray;
          },
          data: convertedMediansTable1
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: ['Wartości liczby odbicia w poszczególnych', 'punktach pomiarowych'],
          fontSize: 18
        },
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Liczba odbicia',
              fontSize: 16
            },
            gridLines: {
              display: true,
              color: colorGridLines
            },
            ticks: {
              fontSize: 13,
              beginAtZero: true,
              min: 0
            }
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Punkty pomiarowe',
              fontSize: 16
            },
            ticks: {
              fontSize: 13
            }
          }]
        }
      }
    });

    if (numberOfTestLocations2 !== 0) {
      const chart2Labels = [];
      for (let i = firstRowNumberTable2; i < (firstRowNumberTable2 + numberOfTestLocations2); i++) {
        chart2Labels.push(i);
      }

      chart2Div.classList.remove('hidden');

      // chart 2
      chart2 = new Chart(document.getElementById("chart2"), {
        type: 'bar',
        data: {
          labels: chart2Labels,
          datasets: [{
            label: "Liczba odbicia",
            backgroundColor: () => {
              const colorsArray = [];
              for (let i = 0; i < numberOfTestLocations2; i++) {
                colorsArray.push(colorBars);
              }
              return colorsArray;
            },
            data: convertedMediansTable2
          }]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: ['Wartości liczby odbicia w poszczególnych', 'punktach pomiarowych'],
            fontSize: 18,
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Liczba odbicia',
                fontSize: 16,
              },
              gridLines: {
                display: true,
                color: colorGridLines
              },
              ticks: {
                fontSize: 13,
                beginAtZero: true,
                min: 0
              }
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Punkty pomiarowe',
                fontSize: 16,
              },
              ticks: {
                fontSize: 13,
              }
            }]
          }
        }
      });
    }
  }

  showBarCharts();

  basicCurveFormula.classList.remove('hidden');

  generateOutputTables();

  // get all cells in table-output which show results
  const outputResultCells = document.querySelectorAll('.table__data-output-result');
  // extract direct-result column from tables
  const directCellsTable1 = [...outputResultCells].filter(outputResultCell => outputResultCell.dataset.name === 'table-1_direct');
  const directCellsTable2 = [...outputResultCells].filter(outputResultCell => outputResultCell.dataset.name === 'table-2_direct');

  // extract indirect-result column from tables
  const indirectCellsTable1 = [...outputResultCells].filter(outputResultCell => outputResultCell.dataset.name === 'table-1_indirect');
  const indirectCellsTable2 = [...outputResultCells].filter(outputResultCell => outputResultCell.dataset.name === 'table-2_indirect');

  // extract strength's substraction column
  const substractionStrengthCells = [...outputResultCells].filter(outputResultCell => outputResultCell.dataset.name === 'table-1_substraction');

  const correlationDirectStrength = fis.slice();
  const validDirectStrength = fis.slice();
  const correlationConvertedMediansTable1 = validConvertedMediansTable1.slice();
  const indirectStrengthTable1 = [];
  const indirectStrengthTable2 = [];
  const substractionStrength = [];

  const fillOutputTable1 = () => {
    for (let i = 0; i < validConvertedMediansTable1.length; i++) {

      // show direct-test values
      directCellsTable1[i].textContent = fis[i];

      // calculate indirect-test values
      if (validConvertedMediansTable1[i] >= 20 && validConvertedMediansTable1[i] <= 24) {
        indirectStrengthTable1[i] = 1.25 * validConvertedMediansTable1[i] - 23;
      } else if (validConvertedMediansTable1[i] > 24 && validConvertedMediansTable1[i] <= 50) {
        indirectStrengthTable1[i] = 1.73 * validConvertedMediansTable1[i] - 34.5;
      } else {
        indirectStrengthTable1[i] = null;
      }
      if (typeof (indirectStrengthTable1[i]) === 'number') {
        indirectCellsTable1[i].textContent = indirectStrengthTable1[i].toFixed(2);
      } else {
        indirectCellsTable1[i].textContent = 'poza zakresem korelacji';
        indirectCellsTable1[i].style.backgroundColor = lightRed;
        directCellsTable1[i].style.backgroundColor = lightRed;
      }

      // calculate strength's substraction values
      if (!indirectStrengthTable1[i]) {
        substractionStrength[i] = null;
        substractionStrengthCells[i].textContent = '-';
        substractionStrengthCells[i].style.backgroundColor = lightRed;
      } else {
        substractionStrength[i] = Number(fis[i] - indirectStrengthTable1[i]);
        substractionStrengthCells[i].textContent = (substractionStrength[i]).toFixed(2);
      }
    }

    // remove from tables values out of range
    for (let i = 0; i < indirectStrengthTable1.length; i++) {
      if (indirectStrengthTable1[i] === null) {
        correlationConvertedMediansTable1.splice(i, 1);
        correlationDirectStrength.splice(i, 1);
        indirectStrengthTable1.splice(i, 1);
        substractionStrength.splice(i, 1);
        i--;
      }
    }
  }

  fillOutputTable1();

  // show warning if too few result pairs
  const elementAboveWarning = document.getElementById('table-output-1-div');
  if (substractionStrength.length < 9) {
    if (!(elementAboveWarning.lastElementChild.classList.value === 'warning')) {
      const warning = document.createElement('h2');
      warning.classList.add('warning');
      const warningText = document.createTextNode('Liczba poprawnych wyników badań nieniszczących potrzebnych do przeprowadzenia korelacji jest mniejsza od minimalnej wynoszącej 9. Należy powtórzyć badanie z odpowiednią liczbą poprawnych wyników');
      warning.appendChild(warningText);
      elementAboveWarning.appendChild(warning);
    }
    tableOutput2Div.classList.add('hidden');
    return;
  } else if (substractionStrength.length >= 9 && elementAboveWarning.lastElementChild.classList.value === 'warning') {
    elementAboveWarning.lastElementChild.classList.add('hidden');
  }

  const tableOutput1Results = () => {
    // get elements which shows results of table-output 1
    const avgSubstractionBox = document.getElementById('average-substraction');
    const sdSubstractionBox = document.getElementById('SD-substraction');

    // calculate table-output-1 results
    const avgSubstraction = calculateAverage(substractionStrength);
    const sdSubstraction = calculateStandardDeviation(substractionStrength);
    // show table-output-1 results
    tableOutput1Result.classList.remove('hidden');
    avgSubstractionBox.textContent = avgSubstraction;
    sdSubstractionBox.textContent = sdSubstraction;

    return {
      avgSubstraction,
      sdSubstraction
    }
  }

  const dataTableOutput1Results = tableOutput1Results();

  const correctedRegressionCurve = () => {

    // set value of k1 factor
    const k1Factors = {
      9: 1.67,
      10: 1.62,
      11: 1.58,
      12: 1.55,
      13: 1.52,
      14: 1.50,
      15: 1.48
    }
    let k1Factor;
    const k1FactorBox = document.getElementById('k1-factor');
    if (correlationDirectStrength.length > 15) {
      k1Factor = 1.48;
    } else {
      k1Factor = k1Factors[correlationDirectStrength.length];
    }
    k1FactorBox.textContent = k1Factor;

    // show number of direct-tests
    const numberOfDirectTestsBox = document.getElementById('number-of-direct-tests');
    const numberOfDirectTests = correlationDirectStrength.length;
    numberOfDirectTestsBox.textContent = numberOfDirectTests;

    // calculate delta f value
    const deltaBox = document.getElementById('delta-f-box');
    const avgSubstraction = dataTableOutput1Results.avgSubstraction;
    const sdSubstraction = dataTableOutput1Results.sdSubstraction;
    const delta = avgSubstraction - k1Factor * sdSubstraction;
    deltaBox.textContent = ` ${avgSubstraction} - ${k1Factor} x ${sdSubstraction} = ${delta.toFixed(1)}`;

    // calculate corrected curve formula
    const correctedCurve1Box = document.getElementById('corrected-curve-1');
    const correctedCurve2Box = document.getElementById('corrected-curve-2');
    const correctedCurve1 = `1,25 x R ${(-23 + delta).toFixed(1)}`;
    const correctedCurve2 = `1,73 x R ${(-34.5 + delta).toFixed(1)}`;
    correctedCurve1Box.textContent = correctedCurve1;
    correctedCurve2Box.textContent = correctedCurve2;

    k1FactorDiv.classList.remove('hidden');
    deltaDiv.classList.remove('hidden');
    correctedCurveFormula.classList.remove('hidden');

    return {
      delta
    }
  }

  const dataCorrectedRegressionCurve = correctedRegressionCurve();

  const showLineChart = () => {

    chart3Div.classList.remove('hidden');

    // chart 3
    const delta = dataCorrectedRegressionCurve.delta;

    // generate points for direct test results
    const directPoints = [];
    for (let i = 0; i < correlationConvertedMediansTable1.length; i++) {
      const point = {
        x: correlationConvertedMediansTable1[i],
        y: correlationDirectStrength[i]
      };
      directPoints.push(point);
    }

    const labels = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

    const indirectBasicPoints = [];
    const indirectCorrectedPoints = [];

    // basic regression curve
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] < 24) {
        const basicPoint = {
          x: labels[i],
          y: (1.25 * labels[i] - 23).toFixed(2)
        };
        const correctedPoint = {
          x: labels[i],
          y: (1.25 * labels[i] - 23 + delta).toFixed(2)
        }
        indirectBasicPoints.push(basicPoint);
        indirectCorrectedPoints.push(correctedPoint);
      } else {
        const basicPoint = {
          x: labels[i],
          y: (1.73 * labels[i] - 34.5).toFixed(2)
        };
        const correctedPoint = {
          x: labels[i],
          y: (1.73 * labels[i] - 34.5 + delta).toFixed(2)
        }
        indirectBasicPoints.push(basicPoint);
        indirectCorrectedPoints.push(correctedPoint);
      }
    }

    const dataChart3 = {
      datasets: [{
        type: 'scatter',
        label: "Podstawowa krzywa regresji",
        borderColor: basicCurveColor,
        backgroundColor: basicCurveColor,
        data: indirectBasicPoints,
        fill: false,
        showLine: true
      },
      {
        type: 'scatter',
        label: "Skorygowana krzywa regresji",
        borderColor: correctedCurveColor,
        backgroundColor: correctedCurveColor,
        data: indirectCorrectedPoints,
        fill: false,
        showLine: true
      },
      {
        type: 'scatter',
        label: "Badania niszczące betonu",
        borderColor: directPointsColor,
        backgroundColor: directPointsColor,
        data: directPoints,
        fill: false,
      }
      ]
    };

    chart3 = new Chart(document.getElementById("chart3"), {
      type: 'scatter',
      data: dataChart3,
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 2.5
          }
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: ['Wykresy podstawowej i skorygowanej krzywej regresji', 'wraz z wynikami badań niszczących'],
          fontSize: 18,
          letterSpacing: 2
        },
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Wytrzymałość betonu na ściskanie [MPa]',
              fontSize: 16
            },
            gridLines: {
              display: true,
              color: colorGridLines
            },
            ticks: {
              fontSize: 13,
              beginAtZero: true,
              min: 0
            }
          }],
          xAxes: [{
            // type: 'linear',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Liczba odbicia',
              fontSize: 16
            },
            gridLines: {
              display: true,
              color: colorGridLines
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              fontSize: 13
            }
          }]
        }
      }
    });
  }

  showLineChart();

  const fillOutputTable2 = () => {

    const validConvertedMedians = validConvertedMediansTable1.concat(validConvertedMediansTable2);
    const delta = dataCorrectedRegressionCurve.delta;

    const directMeanStrengthCell = document.getElementById('direct-mean-strength');
    const directLowestStrengthCell = document.getElementById('direct-lowest-strength');
    const directSdStrengthCell = document.getElementById('direct-sd-strength');
    const indirectMeanStrengthCell = document.getElementById('indirect-mean-strength');
    const indirectLowestStrengthCell = document.getElementById('indirect-lowest-strength');
    const indirectSdStrengthCell = document.getElementById('indirect-sd-strength');

    for (let i = 0; i < validConvertedMedians.length; i++) {
      // show direct-test values
      if (i < validConvertedMediansTable1.length) {
        directCellsTable2[i].textContent = fis[i];
      } else {
        directCellsTable2[i].textContent = '-';
      }
      // calculate indirect-test values
      if (validConvertedMedians[i] >= 18 && validConvertedMedians[i] <= 24) {
        indirectStrengthTable2[i] = 1.25 * validConvertedMedians[i] + (-23 + delta);
      } else if (validConvertedMedians[i] > 24 && validConvertedMedians[i] <= 52) {
        indirectStrengthTable2[i] = 1.73 * validConvertedMedians[i] + (-34.5 + delta);
      } else {
        indirectStrengthTable2[i] = null;
      }
      if (typeof (indirectStrengthTable2[i]) === 'number') {
        indirectCellsTable2[i].textContent = indirectStrengthTable2[i].toFixed(2);
      } else {
        indirectCellsTable2[i].textContent = 'poza zakresem korelacji';
        indirectCellsTable2[i].style.backgroundColor = lightRed;
        directCellsTable2[i].style.backgroundColor = lightRed;
      }
    }

    // remove from tables values out of range
    for (let i = 0; i < indirectStrengthTable2.length; i++) {
      if (indirectStrengthTable2[i] === null) {
        indirectStrengthTable2.splice(i, 1);
        if (i < validDirectStrength.length) {
          validDirectStrength.splice(i, 1)
        }
        i--;
      }
    }

    const directMeanStrength = calculateAverage(validDirectStrength);
    const directLowestStrength = Math.min(...validDirectStrength);
    const directSdStrength = calculateStandardDeviation(validDirectStrength);
    const indirectMeanStrength = calculateAverage(indirectStrengthTable2);
    const indirectLowestStrength = Math.min(...indirectStrengthTable2);
    const indirectSdStrengthPartSe = calculateStandardDeviation(indirectStrengthTable2);
    const indirectSdStrengthPartSc = calculateScPartStandardDeviation(validDirectStrength, indirectStrengthTable2);
    const indirectSdStrength = Math.pow(Math.pow(indirectSdStrengthPartSe, 2) + Math.pow(indirectSdStrengthPartSc, 2), 0.5);

    directMeanStrengthCell.textContent = directMeanStrength.toFixed(2);
    directLowestStrengthCell.textContent = directLowestStrength.toFixed(2);
    directSdStrengthCell.textContent = directSdStrength.toFixed(2);
    indirectMeanStrengthCell.textContent = indirectMeanStrength.toFixed(2);
    indirectLowestStrengthCell.textContent = indirectLowestStrength.toFixed(2);
    indirectSdStrengthCell.textContent = indirectSdStrength.toFixed(2);

    return {
      directMeanStrength,
      directLowestStrength,
      directSdStrength,
      indirectMeanStrength,
      indirectLowestStrength,
      indirectSdStrengthPartSe,
      indirectSdStrengthPartSc,
      indirectSdStrength
    }
  }

  const dataOutputTable2 = fillOutputTable2();

  const calculateFck = () => {
    const neffBox = document.getElementById('neff');
    const fckis1Box = document.getElementById('fck-is-1');
    const fckis2Box = document.getElementById('fck-is-2');
    const fckisFormulaBox = document.getElementById('fck-is-formula');
    const fckisBox = document.getElementById('fck-is');

    const directLowestStrength = dataOutputTable2.directLowestStrength;
    const indirectMeanStrength = dataOutputTable2.indirectMeanStrength;
    const indirectLowestStrength = dataOutputTable2.indirectLowestStrength;
    const indirectSdStrength = dataOutputTable2.indirectSdStrength;
    const se = dataOutputTable2.indirectSdStrengthPartSe;
    const sc = dataOutputTable2.indirectSdStrengthPartSc;

    const neffNumerator = Math.pow(Math.pow(sc, 2) + Math.pow(se, 2), 2);
    const neffDenominator = (Math.pow(sc, 4) / (validDirectStrength.length - 2)) + (Math.pow(se, 4) / (indirectStrengthTable2.length - 1));
    const neff = Math.round(neffNumerator / neffDenominator);
    const knFactor = calculateKnFactor(neff);
    const fckis1 = (indirectMeanStrength - knFactor * indirectSdStrength).toFixed(2);
    const commonLowestStrength = Math.min(directLowestStrength, indirectLowestStrength);
    const mFactor = calculateMFactor(commonLowestStrength);
    const fckis2 = (commonLowestStrength + mFactor).toFixed(2);
    const fckis = Math.min(fckis1, fckis2);

    neffBox.textContent = neff;
    fckis1Box.textContent = `${indirectMeanStrength} - ${knFactor.toFixed(2)} x ${indirectSdStrength.toFixed(2)} = ${fckis1} MPa`;
    fckis2Box.textContent = `${commonLowestStrength.toFixed(2)} + ${mFactor} = ${fckis2} MPa`;
    fckisFormulaBox.textContent = `min(${fckis1} MPa; ${fckis2} MPa)`;
    fckisBox.textContent = fckis;

    fckFormulae.classList.remove('hidden');
    fckDiv.classList.remove('hidden');

    return fckis;
  }

  const calculateVf = () => {
    const vfBox = document.getElementById('vf');

    const indirectMeanStrength = dataOutputTable2.indirectMeanStrength;
    const indirectSdStrength = dataOutputTable2.indirectSdStrength;

    const vf = ((indirectSdStrength / indirectMeanStrength) * 100).toFixed(2);
    vfBox.textContent = `${indirectSdStrength.toFixed(2)} / ${indirectMeanStrength} * 100% = ${vf} %`;

    vfDiv.classList.remove('hidden');

    return vf;
  }

  const showFinalResults = () => {

    const fckis = calculateFck();
    const vf = calculateVf();

    const compressiveStrengthClassBox = document.getElementById('compressive-strength-class');
    const homogenityOfConcreteBox = document.getElementById('homogenity-of-conrete');

    const compressiveStrengthClass = specifyConreteClass(fckis);
    const homogenityOfConcrete = specifyHomogenity(vf, fckis);

    compressiveStrengthClassBox.textContent = compressiveStrengthClass;
    homogenityOfConcreteBox.textContent = homogenityOfConcrete;

    finalResults.classList.remove('hidden');
  }

  showFinalResults();
}

inputTestLocations1.addEventListener('input', checkInputs);
inputTestLocations2.addEventListener('input', checkInputs);
inputReadings.addEventListener('input', checkInputs);

buttonGenerateMeasurementLog.addEventListener('click', generateMeasurementLog);
buttonClearMeasurementLog.addEventListener('click', clearMeasurementLog);
buttonMakeCalculations.addEventListener('click', makeCalculations);
buttonReport.addEventListener('click', generateReport);

export {
  chart1,
  chart2,
  chart3,
  chartsAreShown,
  validConvertedMediansTable1,
  validConvertedMediansTable2
};

function showMenu() {
  const navIcon = document.querySelector('.nav__icon');
  const navList = document.querySelector('.nav__list');
  const logo = document.querySelector('.header__logo');

  navIcon.classList.toggle('change');

  if (navList.style.display === 'block') {
    navList.style.display = 'none';
    navList.classList.remove('nav__list--active');
    logo.style.display = 'block';
  } else {
    navList.style.display = 'block';
    navList.classList.add('nav__list--active');
    logo.style.display = 'none';
  }
}

const menu = document.querySelector('.nav__icon');
menu.addEventListener('click', showMenu);