export const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking/data'
    );
    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }
    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};
