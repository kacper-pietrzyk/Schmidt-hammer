const generateReport = () => {
  const structureDescription = document.getElementById('structure').value;
  const elementDescription = document.getElementById('element').value;
  const reportStructureDescr = document.getElementById('report-structure');
  structureDescription === '' ? reportStructureDescr.textContent = 'Nie wprowadzono informacji dotyczących obiektu.' : reportStructureDescr.textContent = structureDescription;
  const reportElementDescr = document.getElementById('report-element');
  elementDescription === '' ? reportElementDescr.textContent = 'Nie wprowadzono informacji dotyczących badanego elementu.' : reportElementDescr.textContent = elementDescription;

  window.print();
}

export { generateReport }