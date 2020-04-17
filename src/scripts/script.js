import {Api} from "./Api.js";
import {Card} from "./Card.js";
import {CardList} from "./CardList.js";
import {FormValidator} from "./FormValidator.js";
import {MessageErrors} from "./MessageErrors.js";
import {Popup} from "./Popup.js";
import {UserInfo} from "./UserInfo.js";
import {getLinkView, confirmDelete, likeContext, overlayOpen} from "./utils.js";

(() => {

  const token = 'f1834465-ef09-4754-acd2-62c7d534b0bf';
  const url = 'https://praktikum.tk/';
  const myCohort = '9';
  const myId = '7a8de0f53bb186f6ee28fdb8';
  const placesList = document.querySelector('.places-list');
  const _handleErr = (err) => {
    console.log(`Упсс ошибка. Подсказка - ${err}`);
    overlayOpen(err)
  }

  // создание экземпляров классов
  const api = new Api({
    baseUrl: `${url}cohort${myCohort}/`, token
  });
  const card = new Card(myId);
  const popupEdit = new Popup(document.getElementById('popup-edit'));
  const popupCreate = new Popup(document.getElementById('popup-create'));
  const popupView = new Popup(document.getElementById('popup-view'));

  const userInfoEdit = new UserInfo({ form: (popupEdit.popup.querySelector('.popup__form')), api });
  const userInfoCreate = new UserInfo({ form: (popupCreate.popup.querySelector('.popup__form')) });

  const messageErrors = new MessageErrors();
  const formValidatorEdit = new FormValidator(popupEdit.popup.querySelector('.popup__form'), messageErrors);
  const formValidatorCreate = new FormValidator(popupCreate.popup.querySelector('.popup__form'), messageErrors);
  const cardList = new CardList(placesList, card);

  // вызовы методов классов
  api.getProfile()
    .then((data) => {
      userInfoEdit.setProfileData(data)
        .then(() => listenerBtnEdit())
    })
    .catch(_handleErr);

  api.getInitialCards()
    .then((data) => {
      cardList.render(data)
        .then(() => {
          listenerBtnCreate();
          listenerliked()
        })
    })
    .catch(_handleErr);

  // --прослушки--
  // удаление, октрытие карточки
  placesList.addEventListener('click', (event) => {
    const { id } = event.target.parentElement.dataset;

    if (event.target.classList.contains('place-card__image')) {
      popupView.open(getLinkView(event.target));
    } else if (event.target.classList.contains('place-card__delete-icon')) {

      if (confirmDelete()) {
        api.deleteOwnCardsOnServer(id, 'DELETE')
          .then(() => card.remove(event.target))
          .catch(_handleErr);
      }
    }
  });

  // прослушка для лайка
  const listenerliked = () => {
    placesList.addEventListener('click', (event) => {

      if (event.target.classList.contains('place-card__like-icon')) {

        const { id } = event.target.closest('.place-card').firstChild.dataset;
        const _handleRes = (data) => {
          card.like(event);
          likeContext({ event, data })
        }

        if (event.target.classList.contains('place-card__like-icon_liked')) {

          api.delLike(id)
            .then(_handleRes)
            .catch(_handleErr);
          return
        }
        api.putLike(id)
          .then(_handleRes)
          .catch(_handleErr);
      }
    })
  };

  // открытие popup(edit)
  const listenerBtnEdit = () => {
    document.getElementById('edit').addEventListener('click', () => {
      popupEdit.open();
      formValidatorEdit.validValues({name:true, job:true});
      formValidatorEdit.setSubmitButtonState();
      userInfoEdit.updateUserInfo();

      popupEdit.popup.querySelectorAll('input').forEach(el => messageErrors.removeErr(el));
    });
  }

  // открытие popup(create)
  const listenerBtnCreate = () => {
    document.getElementById('create').addEventListener('click', () => {
      popupCreate.open();
      formValidatorCreate.validValues({name:false, link:false});
      formValidatorCreate.setSubmitButtonState();
      userInfoCreate.updateUserInfo();
      popupCreate.popup.querySelectorAll('input').forEach(el => messageErrors.removeErr(el));
    })
  }

  // закрытие кликом
  Array.from(document.querySelectorAll('.popup'))
    .forEach((el) => {
      el.addEventListener('click', (event) => {
        const closeBtn = event.target.classList.contains('popup__close');
        const elem = event.currentTarget.getAttribute('id');

        if (elem === 'popup-view' && closeBtn) {
          popupView.close();
        } else if (elem === 'popup-create' && closeBtn) {
          popupCreate.close();
        } else if (elem === 'popup-edit' && closeBtn) {
          popupEdit.close();
        }
      });
    });

  // закрытие Escape
  document.addEventListener('keyup', (event) => {
    event.preventDefault();

    const viewEl = popupView.popup.classList.contains('popup_is-opened');
    const editEl = popupEdit.popup.classList.contains('popup_is-opened');
    const createEl = popupCreate.popup.classList.contains('popup_is-opened');

    if (event.code === 'Escape' && viewEl) {
      popupView.close();
    } else if (event.code === 'Escape' && createEl) {
      popupCreate.close();

    } else if (event.code === 'Escape' && editEl) {
      popupEdit.close();
    }
  });

  // submit кнопки создать в popup-edit
  popupEdit.popup.querySelector('.popup__form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = event.target.elements.name.value;
    const jobVal = event.target.elements.job.value;

    api.patchProfile({ name: nameVal, about: jobVal })
      .then(() => {
        userInfoEdit.setUserInfo();
        userInfoEdit.updateUserInfo()
        popupEdit.close();
      })
      .catch(_handleErr);
  });

  // submit кнопки создать в popup-create
  popupCreate.popup
    .querySelector('.popup__form')
    .addEventListener('submit', (event) => {
      event.preventDefault();

      const nameVal = event.target.elements.name.value;
      const linkVal = event.target.elements.link.value;

      api.createCardOnServer(nameVal, linkVal)
        .then((res) => {
          cardList.addCard(card.create(res));
          popupCreate.close();
        })
        .catch(_handleErr);
    });

  // submit overlay
  document
    .querySelector('.overlay__container')
    .addEventListener('click', (event) => {
      if (event.target.id === 'button-return') {
        overlayClose(event.target)
      } else if (event.target.id === 'button-reload') {
        if (confirmReload()) location.reload();
        console.log('Не хватило смелости');
      }
    });
})();