// вспомогательные функции

// выделение ссылки из карточки
const getLinkView = ((event) => {
  const linkImage = event.getAttribute('style');
  return linkImage.substr(23, (linkImage.length - 26));
});

//учточнение удаления карточки
const confirmDelete = () => {
  return (confirm("Вы подтверждаете удаление?"));
}

//прорисовка подсчета лайков
const likeContext = ({ event, data }) => {
  event.target.nextSibling.textContent = data.likes.length;
}

const overlayOpen = (err) => {
  document.querySelector('.overlay').classList.add('overlay_is-opened')
  document.getElementById('error-overlay').textContent = `Подсказка: ${err}`
};

const overlayClose = (el) => el.closest('section').classList.remove('overlay_is-opened');

const confirmReload = () => confirm("Я могу лишь указать дверь. Ты сам должен перезагрузить страницу");

export {getLinkView, confirmDelete, likeContext, overlayOpen}
