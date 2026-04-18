const PATH = "src/data.json"

export const getData = (async() => {
  try {
    const response = await fetch(PATH);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
})