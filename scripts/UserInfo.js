// значения input в popup
class UserInfo {
  constructor({ form, api }) {
    this.form = form;
    this.api = api;
    this.nameDefault = document.querySelector('.user-info__name');
    this.jobDefault = document.querySelector('.user-info__job');
    this.inputName = this.form.elements.name;
    this.inputJob = this.form.elements.job;
    this.inputLink = this.form.elements.link;
  }

  setUserInfo() {
    this.nameDefault.textContent = this.inputName.value;
    this.jobDefault.textContent = this.inputJob.value;
  }

  updateUserInfo(name = this.nameDefault.textContent, job = this.jobDefault.textContent) {

    const idName = this.form.getAttribute('name');

    if (idName === 'edit') {
      this.inputName.value = name;
      this.inputJob.value = job;

    } else if (idName === 'new') {
      this.inputName.value = '';
      this.inputLink.value = '';
    }
  }

  //добавление в разметку данных
  setProfileData(data) {
    document.querySelector('.user-info__name').textContent = data.name;
    document.querySelector('.user-info__job').textContent = data.about;
    return Promise.resolve()
  }
}
