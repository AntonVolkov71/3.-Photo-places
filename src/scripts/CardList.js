export class CardList {
  constructor(container, card) {
    this.container = container;
    this.card = card;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render(element) {
    element.forEach((item) => this.addCard(this.card.create(item)))
    return Promise.resolve()
  }
}