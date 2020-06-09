import {
  tableInput1Header,
  tableInput1Div,
  tableInput1Head,
  tableInput1Body,
  tableInput2Header,
  tableInput2Div,
  tableInput2Head,
  tableInput2Body,
  buttonGenerateMeasurementLog,
  buttonClearMeasurementLog,
  buttonMakeCalculations,
  inputTestLocations1,
  inputTestLocations2,
  inputReadings,
  startInfo
} from './GetData.js';

let numberOfTestLocations1;
let numberOfTestLocations2;
let numberOfReadings;

const generateMeasurementLog = () => {

  buttonGenerateMeasurementLog.setAttribute('disabled', 'true');
  buttonClearMeasurementLog.removeAttribute('disabled');
  buttonMakeCalculations.removeAttribute('disabled');
  inputTestLocations1.setAttribute('disabled', 'true');
  inputTestLocations2.setAttribute('disabled', 'true');
  inputReadings.setAttribute('disabled', 'true');
  inputTestLocations1.style.backgroundColor = '#444';
  inputTestLocations2.style.backgroundColor = '#444';
  inputReadings.style.backgroundColor = '#444';
  inputTestLocations1.style.border = 'none';
  inputTestLocations2.style.border = 'none';
  inputReadings.style.border = 'none';
  startInfo.classList.add('hidden');

  //get data from user
  numberOfTestLocations1 = Number(document.getElementById('test-location-type-1').value);
  numberOfTestLocations2 = Number(document.getElementById('test-location-type-2').value);
  numberOfReadings = Number(document.getElementById('readings').value);

  tableInput1Header.classList.remove('hidden');
  tableInput1Div.classList.remove('hidden');

  // No. of row in table-input 1
  let tableInput1RowNumber = 1;

  // number of static cells in tables
  const table1StaticCells = 7;
  const table2StaticCells = 4;

  // generate first part of measurement log
  generateTableInputHeader(tableInput1Head, numberOfReadings);

  // generate second part of measurement log only if number of test locations > 0
  if (numberOfTestLocations2 !== 0) {
    tableInput2Header.classList.remove('hidden');
    tableInput2Div.classList.remove('hidden');
    generateTableInputHeader(tableInput2Head, numberOfReadings);
  }

  // generate all rows of table-input 1
  for (let i = 0; i < numberOfTestLocations1; i++) {
    generateTableInputRow(numberOfReadings, tableInput1RowNumber, tableInput1Body, table1StaticCells);
    tableInput1RowNumber++;
  }

  // No. of row in table-input 2
  let tableInput2RowNumber = tableInput1RowNumber;

  // generate all rows of table-input 2
  for (let i = 0; i < numberOfTestLocations2; i++) {
    generateTableInputRow(numberOfReadings, tableInput2RowNumber, tableInput2Body, table2StaticCells);
    tableInput2RowNumber++;
  }

  // clear inputs after generating measurement log
  document.getElementById('test-location-type-1').value = '';
  document.getElementById('test-location-type-2').value = '';
  document.getElementById('readings').value = '';
}

const generateTableInputHeader = (thead, readings) => {
  // first row of header
  const firstRow = document.createElement('tr');

  const arrayOfCellsinFirstRow = [];

  for (let i = 0; i < 5; i++) {
    const cell = document.createElement('th');
    cell.classList.add('table__data');
    cell.classList.add('table__data--padding');
    cell.setAttribute('scope', 'col');
    firstRow.appendChild(cell);
    arrayOfCellsinFirstRow.push(cell);
  }

  // specify a No. cell
  arrayOfCellsinFirstRow[0].setAttribute('rowspan', '2');
  arrayOfCellsinFirstRow[0].textContent = 'Lp.';

  // specify an angle cell
  arrayOfCellsinFirstRow[1].setAttribute('rowspan', '2');
  arrayOfCellsinFirstRow[1].innerHTML = 'Kąt &alpha; &nbsp; [<sup>o</sup>]<br>';
  const info = document.createElement('dfn');
  info.classList.add('input-data__dfn');
  info.setAttribute('data-info', 'Sposoby ustawienia młotka oraz odpowiadające im wartości kątowe przedstawiono w zakładce "Opis działania"');
  info.style.padding = '0';
  const icon = document.createElement('span');
  icon.classList.add('far');
  icon.classList.add('fa-question-circle');
  icon.style.padding = "5px 0";
  info.appendChild(icon);
  arrayOfCellsinFirstRow[1].appendChild(info);

  // specify a readings cell
  arrayOfCellsinFirstRow[2].setAttribute('colspan', readings);
  arrayOfCellsinFirstRow[2].textContent = 'Odczyty liczb odbicia';

  // specify a median's cells
  arrayOfCellsinFirstRow[3].setAttribute('rowspan', '2');
  arrayOfCellsinFirstRow[3].textContent = 'Mediana';
  arrayOfCellsinFirstRow[4].setAttribute('rowspan', '2');
  arrayOfCellsinFirstRow[4].textContent = 'Mediana sprowadzona';

  // second row of header
  const secondRow = document.createElement('tr');

  // specify an input cells
  for (let i = 0; i < readings; i++) {
    const cell = document.createElement('th');
    cell.classList.add('table__data');
    cell.classList.add('table__data--padding');
    cell.setAttribute('scope', 'col');
    const cellContent = document.createTextNode(i + 1);
    cell.appendChild(cellContent);
    secondRow.appendChild(cell);
  }

  // additional cells in table 1
  if (thead.id === 'thead-input-1') {
    const cell = document.createElement('th');
    cell.classList.add('table__data');
    cell.classList.add('table__data--padding');
    cell.setAttribute('scope', 'col');
    firstRow.appendChild(cell);
    arrayOfCellsinFirstRow.push(cell);
    arrayOfCellsinFirstRow[5].setAttribute('colspan', 3);
    arrayOfCellsinFirstRow[5].textContent = 'Wyniki badań niszczących betonu';

    const arrayOfStaticCellsinSecondRow = [];

    for (let i = 0; i < 3; i++) {
      const cell = document.createElement('th');
      cell.classList.add('table__data');
      cell.classList.add('table__data--padding');
      cell.setAttribute('scope', 'col');
      secondRow.appendChild(cell);
      arrayOfStaticCellsinSecondRow.push(cell);
    }

    // specify a fic cell
    arrayOfStaticCellsinSecondRow[0].innerHTML = 'f<sub>c,ic</sub> &nbsp; [MPa]';

    // specify a factor cell
    arrayOfStaticCellsinSecondRow[1].textContent = 'współ. korekcyjny';

    // specify a fis cell
    arrayOfStaticCellsinSecondRow[2].innerHTML = 'f<sub>c,is</sub> &nbsp; [MPa]';
  }

  thead.appendChild(firstRow);
  thead.appendChild(secondRow);
}

// generate one row of table
const generateTableInputRow = (readings, rowNumber, tbody, staticCells) => {
  // create a row
  const row = document.createElement('tr');
  row.classList.add('table__row');

  const arrayOfCells = [];

  // create all cells
  const numberofAllCells = readings + staticCells;
  for (let i = 0; i < numberofAllCells; i++) {
    const cell = document.createElement('td');
    cell.classList.add('table__data');
    row.appendChild(cell);
    arrayOfCells.push(cell);
  }

  // specify a No. cell
  arrayOfCells[0].textContent = rowNumber;
  arrayOfCells[0].classList.add('table__data--padding');

  // specify an angle cell
  arrayOfCells[1].classList.add('table__data--border');
  const optionValues = [-90, -45, 0, 45, 90];
  const cellSelect = document.createElement('select');
  cellSelect.classList.add('table__data--select-angle');
  cellSelect.setAttribute('name', 'angle');
  if (tbody.id === 'tbody-input-1') {
    cellSelect.setAttribute('data-name', `table-1_angle`);
  } else {
    cellSelect.setAttribute('data-name', `table-2_angle`);
  }

  for (let i = 0; i < 5; i++) {
    const option = document.createElement('option');
    option.classList.add('table__data--option');
    option.setAttribute('value', optionValues[i]);
    const optionText = document.createTextNode(optionValues[i]);
    if (i === 2) {
      option.setAttribute('selected', 'selected');
    }
    option.appendChild(optionText);
    cellSelect.appendChild(option);
  }
  arrayOfCells[1].appendChild(cellSelect);

  // specify an input cells
  for (let i = 0; i < readings; i++) {
    arrayOfCells[i + 2].classList.add('table__data--border');
    const cellInput = document.createElement('input');
    cellInput.classList.add('table__data--input');
    if (tbody.id === 'tbody-input-1') {
      cellInput.setAttribute('data-name', `table-1_inputs_row-${rowNumber}`);
    } else {
      cellInput.setAttribute('data-name', `table-2_inputs_row-${rowNumber}`);
    }
    cellInput.setAttribute('type', 'number');
    arrayOfCells[i + 2].appendChild(cellInput);
  }

  // specify a median's and converted-median's cells
  arrayOfCells[readings + 2].classList.add('table__data--padding');
  arrayOfCells[readings + 2].classList.add('table__data-result');
  arrayOfCells[readings + 3].classList.add('table__data--padding');
  arrayOfCells[readings + 3].classList.add('table__data-result');
  if (tbody.id === 'tbody-input-1') {
    arrayOfCells[readings + 2].setAttribute('data-name', 'table-1_median');
    arrayOfCells[readings + 3].setAttribute('data-name', 'table-1_converted-median');
  } else {
    arrayOfCells[readings + 2].setAttribute('data-name', 'table-2_median');
    arrayOfCells[readings + 3].setAttribute('data-name', 'table-2_converted-median');
  }

  // additional cells in table 1
  if (tbody.id === 'tbody-input-1') {
    // specify a fic cell
    arrayOfCells[readings + 4].classList.add('table__data--border');
    const cellInput = document.createElement('input');
    cellInput.classList.add('table__data--input');
    cellInput.classList.add('table__data--wide-input');
    cellInput.setAttribute('type', 'number');
    cellInput.setAttribute('data-name', 'fic');
    arrayOfCells[readings + 4].appendChild(cellInput);

    // specify a factor cell
    arrayOfCells[readings + 5].classList.add('table__data--padding');
    arrayOfCells[readings + 5].textContent = '0.85';

    // specify a fis cell
    arrayOfCells[readings + 6].classList.add('table__data--padding');
    arrayOfCells[readings + 6].classList.add('table__data-result');
    arrayOfCells[readings + 6].setAttribute('data-name', 'fis');
  }
  tbody.appendChild(row);
}

export {
  generateMeasurementLog,
  numberOfTestLocations1,
  numberOfTestLocations2
};