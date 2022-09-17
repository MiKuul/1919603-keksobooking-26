const mainOfHtml = document.querySelector('main');
const bodyOfHtml = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

export const showErrorMessage = () => {
  const errorElement = document.createElement('div');
  errorElement.style.backgroundColor = 'red';
  errorElement.style.textAlign = 'center';
  errorElement.style.padding = '5px 0px';
  mainOfHtml.prepend(errorElement);
  errorElement.innerHTML = '<h1>Не удалось загрузить объявления!</h1>';
};

const onKeyDownListener = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSystemMessage (); // eslint-disable-line
  }
};

const closeSystemMessage = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  } else {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onKeyDownListener);
};

export const showSendErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onKeyDownListener);
  bodyOfHtml.appendChild(errorMessage);
  if (document.querySelector('.error__button')) {
    document.querySelector('.error__button').addEventListener('click', () => {
      closeSystemMessage();
    });
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').addEventListener('click', (event) => {
      if (event.target === document.querySelector('.error')) {
        closeSystemMessage();
      }
    });
  }
};

export const showSendSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onKeyDownListener);
  bodyOfHtml.appendChild(successMessage);
  if (document.querySelector('.success')) {
    document.querySelector('.success').addEventListener('click', (event) => {
      if (event.target === document.querySelector('.success')) {
        closeSystemMessage();
      }
    });
  }
};

