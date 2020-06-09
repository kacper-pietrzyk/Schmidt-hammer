import { tableOutput1Div, tableOutput2Div, tableOutput1Head, tableOutput2Head, tableOutput1Body, tableOutput2Body, tableOutput2Foot } from './GetData.js';
import { validConvertedMediansTable1, validConvertedMediansTable2 } from '../main.js';

const generateOutputTables = () => {
  tableOutput1Div.classList.remove('hidden');
  tableOutput2Div.classList.remove('hidden');

  // No. of row in output tables
  let tableOutput1RowNumber = 1;
  let tableOutput2RowNumber = 1;
  // Number of data-cells in row
  const tableOutput1CellsInRow = 4;
  const tableOutput2CellsInRow = 3;

  generateTableOutputHeader(tableOutput1CellsInRow, tableOutput1Head);
  generateTableOutputHeader(tableOutput2CellsInRow, tableOutput2Head);

  // generate all rows of table-output-1
  for (let i = 0; i < validConvertedMediansTable1.length; i++) {
    generateTableOutputRow(tableOutput1RowNumber, tableOutput1CellsInRow, tableOutput1Body);
    tableOutput1RowNumber++;
  }

  // generate all rows of table-output-2
  for (let i = 0; i < (validConvertedMediansTable1.length + validConvertedMediansTable2.length); i++) {
    generateTableOutputRow(tableOutput2RowNumber, tableOutput2CellsInRow, tableOutput2Body);
    tableOutput2RowNumber++;
  }

  generateTableOutputFoot(tableOutput2Foot);
}


const generateTableOutputHeader = (cellsInRow, thead) => {
  const row = document.createElement('tr');

  const arrayOfCells = [];

  for (let i = 0; i < cellsInRow; i++) {
    const cell = document.createElement('th');
    cell.classList.add('table__data');
    cell.classList.add('table__data--padding');
    cell.setAttribute('scope', 'col');
    row.appendChild(cell);
    arrayOfCells.push(cell);
  }

  // specify a No. cell
  arrayOfCells[0].textContent = 'Lp.';

  // specify a cell with direct-test results
  arrayOfCells[1].classList.add('table__data--width');
  arrayOfCells[1].textContent = 'Wytrzymałość na ściskanie określona na próbkach [MPa]';

  // specify a cell with indirect-test results (regression curve)
  arrayOfCells[2].classList.add('table__data--width');
  if (thead.id === 'thead-output-1') {
    arrayOfCells[2].textContent = 'Wytrzymałość na ściskanie określona z podstawowej krzywej regresji [MPa]';
    // specify a cell with strength's subtraction
    arrayOfCells[3].classList.add('table__data--width');
    arrayOfCells[3].textContent = 'Różnica wytrzymałości [MPa]';
  } else {
    arrayOfCells[2].textContent = 'Wytrzymałość na ściskanie określona ze skorygowanej krzywej regresji [MPa]';
  }

  thead.appendChild(row);
}

const generateTableOutputRow = (rowNumber, cellsInRow, tbody) => {
  // create a row
  const row = document.createElement('tr');
  row.classList.add('table__row');

  const arrayOfCells = [];

  // create all cells
  for (let i = 0; i < cellsInRow; i++) {
    const cell = document.createElement('td');
    cell.classList.add('table__data');
    cell.classList.add('table__data--padding');
    row.appendChild(cell);
    arrayOfCells.push(cell);
  }

  // specify a No. cell
  arrayOfCells[0].textContent = rowNumber;

  // specify a cell with direct-test results
  arrayOfCells[1].classList.add('table__data-output-result');
  if (tbody.id === 'tbody-output-1') {
    arrayOfCells[1].setAttribute('data-name', 'table-1_direct');
  } else {
    arrayOfCells[1].setAttribute('data-name', 'table-2_direct');
  }

  // specify a cell with indirect-test results (regression curve)
  arrayOfCells[2].classList.add('table__data-output-result');
  if (tbody.id === 'tbody-output-1') {
    arrayOfCells[2].setAttribute('data-name', 'table-1_indirect');
  } else {
    arrayOfCells[2].setAttribute('data-name', 'table-2_indirect');
  }

  // specify a cell with strength's subtraction
  if (tbody.id === 'tbody-output-1') {
    arrayOfCells[3].classList.add('table__data-output-result');
    arrayOfCells[3].setAttribute('data-name', 'table-1_substraction');
  }

  tbody.appendChild(row);
}

const generateTableOutputFoot = (tfoot) => {

  for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    const arrayOfCells = [];

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('th');
      cell.classList.add('table__data');
      cell.classList.add('table__data--padding');
      row.appendChild(cell);
      arrayOfCells.push(cell);
    }

    // specify a cells
    arrayOfCells[0].setAttribute('scope', 'row');
    switch (i) {
      case 0:
        arrayOfCells[0].innerHTML = 'f<sub>c,m(m)is</sub>';
        arrayOfCells[1].setAttribute('id', 'direct-mean-strength');
        arrayOfCells[2].setAttribute('id', 'indirect-mean-strength');
        break;
      case 1:
        arrayOfCells[0].innerHTML = 'f<sub>c,is,lowest</sub>';
        arrayOfCells[1].setAttribute('id', 'direct-lowest-strength');
        arrayOfCells[2].setAttribute('id', 'indirect-lowest-strength');
        break;
      case 2:
        arrayOfCells[0].innerHTML = 's';
        arrayOfCells[1].setAttribute('id', 'direct-sd-strength');
        arrayOfCells[2].setAttribute('id', 'indirect-sd-strength');
    }
    tfoot.appendChild(row);
  }
}

export { generateOutputTables };