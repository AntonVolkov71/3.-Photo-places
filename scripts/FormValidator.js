class FormValidator {
  constructor(form, messageErrors) {
    this.form = form;
    this.validName = true;
    this.validJob = true;
    this.validLink = false;
    this.messageErrors = messageErrors;

    this.setEventListeners();
  }

  checkInputValidity(elementInput) {
    const elInLength = elementInput.value.length;
    const nameValue = elementInput.classList.contains('popup__input_type_name');
    const linkValue = elementInput.classList.contains('popup__input_type_link-url');
    const jobValue = elementInput.classList.contains('popup__input_type_job');

    if (nameValue) {
      if (elInLength === 0) {
        this.messageErrors.requiredErr(elementInput);

        this.validName = false;
        this.setSubmitButtonState();
      } else if (!(elInLength >= 2 && elInLength <= 30)) {
        this.messageErrors.lengthErr(elementInput);

        this.validName = false;
        this.setSubmitButtonState();
      } else {
        this.messageErrors.removeErr(elementInput);

        this.validName = true;
        this.setSubmitButtonState();
      }
    }

    if (linkValue) {
      if (elInLength === 0) {
        this.messageErrors.requiredErr(elementInput);

        this.validLink = false;
        this.setSubmitButtonState();
      } else if (!(elementInput.value.startsWith('http'))) {
        this.messageErrors.linkErr(elementInput);

        this.validLink = false;
        this.setSubmitButtonState();
      } else {
        this.messageErrors.removeErr(elementInput);

        this.validLink = true;
        this.setSubmitButtonState();
      }
    }
    if (jobValue) {
      if (elInLength === 0) {
        this.messageErrors.requiredErr(elementInput);

        this.validJob = false;
        this.setSubmitButtonState();
      } else if (!(elInLength >= 2 && elInLength <= 30)) {
        this.messageErrors.lengthErr(elementInput);

        this.validJob = false;
        this.setSubmitButtonState();
      } else {
        this.messageErrors.removeErr(elementInput);

        this.validJob = true;
        this.setSubmitButtonState();
      }
    }
  }

  setSubmitButtonState() {
    const btn = this.form.querySelector('.popup__button');

    if (this.form.getAttribute('name') === 'edit') {
      if (this.validName && this.validJob) {
        btn.removeAttribute('disabled');
        btn.classList.remove('popup__button_disabled');
      } else {
        btn.setAttribute('disabled', true);
        btn.classList.add('popup__button_disabled');
      }
    }
    if (this.form.getAttribute('name') === 'new') {
      if (this.validName && this.validLink) {
        btn.removeAttribute('disabled');
        btn.classList.remove('popup__button_disabled');
      } else {
        btn.setAttribute('disabled', true);
        btn.classList.add('popup__button_disabled');
      }
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target);
    });
  }

  validValues({name, job, link}) {
    this.validName = name;
    this.validJob = job;
    this.validLink = link; 
  }
}
