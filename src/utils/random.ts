export const generateRandomNumber = () => {
  const max = 36;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomColor = () => {
  const listColor = ['rojo', 'negro'];
  return listColor[Math.floor(Math.random() * listColor.length)];
};
