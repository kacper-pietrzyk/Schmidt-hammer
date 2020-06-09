const specifyConreteClass = (fck) => {
  if (fck >= 98) return 'C100/115';
  else if (fck >= 89) return 'C90/105';
  else if (fck >= 81) return 'C80/95';
  else if (fck >= 72) return 'C70/85';
  else if (fck >= 64) return 'C60/75';
  else if (fck >= 57) return 'C55/67';
  else if (fck >= 51) return 'C50/60';
  else if (fck >= 47) return 'C45/55';
  else if (fck >= 43) return 'C40/50';
  else if (fck >= 38) return 'C35/45';
  else if (fck >= 31) return 'C30/37';
  else if (fck >= 26) return 'C25/30';
  else if (fck >= 21) return 'C20/25';
  else if (fck >= 17) return 'C16/20';
  else if (fck >= 13) return 'C12/15';
  else if (fck >= 9) return 'C8/10';
  else return 'Beton nie spełnia wymagań żadnej z klas'
}

const specifyHomogenity = (vf, fck) => {
  if (fck >= 9 && fck < 26) {
    if (vf <= 10) return 'Bardzo dobra';
    else if (vf <= 13) return 'Dobra';
    else if (vf <= 16) return 'Średnia';
    else if (vf <= 20) return 'Dostateczna';
    else return 'Niedostateczna';
  } else if (fck >= 26 && fck < 47) {
    if (vf <= 7) return 'Bardzo dobra';
    else if (vf <= 10) return 'Dobra';
    else if (vf <= 13) return 'Średnia';
    else if (vf <= 15) return 'Dostateczna';
    else return 'Niedostateczna';
  } else return 'Brak możliwości określenia jednorodności betonu';
}

export { specifyConreteClass, specifyHomogenity };