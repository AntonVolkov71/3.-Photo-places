export class Popup {
  constructor(popup) {
    this.popup = popup;
    // this.link = link;
  }



  open(link) {
    if (link === undefined) {
      this.popup.classList.toggle('popup_is-opened');
    } else {
      this.popup.classList.toggle('popup_is-opened');
      this.popup
        .querySelector('.popup__image')
        .setAttribute('src', link);
    }
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}
