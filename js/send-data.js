export const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      }
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};
