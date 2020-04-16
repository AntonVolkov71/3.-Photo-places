class MessageErrors {
  requiredErr(el) {
    const requiredErr = 'Это обязательное поле';
    const span = el.parentElement.querySelector(`#error-${el.name}`);

    span.classList.add('open');
    span.textContent = requiredErr;
  }

  lengthErr(el) {
    const lengthErr = 'Должно быть от 2 до 30 символов';
    const span = el.parentElement.querySelector(`#error-${el.name}`);

    span.classList.add('open');
    span.textContent = lengthErr;
  }

  linkErr(el) {
    const linkErr = 'Здесь должна быть ссылка';
    const span = el.parentElement.querySelector(`#error-${el.name}`);

    span.classList.add('open');
    span.textContent = linkErr;
  }

  removeErr(el) {
    const span = el.parentElement.querySelector(`#error-${el.name}`);

    span.classList.remove('open');
    span.textContent = '';
  }
}
