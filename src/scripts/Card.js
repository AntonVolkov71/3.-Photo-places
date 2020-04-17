export class Card {
  constructor(myId) {
    this.myId = myId;
  }

  create(card) {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const buttonDeleteCard = document.createElement('button');
    const placeCardDesc = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const buttonLike = document.createElement('button');

    const counterLike = document.createElement('p');
    const blockLike = document.createElement('div');


    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.setAttribute('data-action', 'view');
    placeCardImage.setAttribute('data-id', `${card._id}`);
    
    if (card.owner._id == this.myId) {
      placeCardImage.appendChild(buttonDeleteCard);
      buttonDeleteCard.style.display = 'block';
    }

    card.likes.forEach(el => {
      if (el._id == this.myId) {
        buttonLike.classList.add('place-card__like-icon_liked');
      }
    })

    placeCardImage.style.backgroundImage = `url(${card.link})`;
    
    buttonDeleteCard.classList.add('place-card__delete-icon');
    buttonDeleteCard.setAttribute('data-action', 'remove');
    placeCardDesc.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = card.name;
    buttonLike.classList.add('place-card__like-icon');
    buttonLike.setAttribute('data-action', 'like');

    counterLike.classList.add('place-card__counterLike');
    blockLike.classList.add('place-card__blockLike');

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDesc);
    placeCardDesc.appendChild(placeCardName);
    placeCardDesc.appendChild(blockLike);
    blockLike.appendChild(buttonLike);
    blockLike.appendChild(counterLike);

    counterLike.textContent = card.likes.length;

    return placeCard;
  }

  like(el) {
    el.target.classList.toggle('place-card__like-icon_liked')
  }
  
  remove(el) {
    el.closest('.place-card').remove(el.parentElement)
  }
}
