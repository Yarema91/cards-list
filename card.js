export default class Card {
  constructor(products) {
    this.state = products;


    this.myRender();
    // this.update();
    // console.error(products);


  }
  getTemplate() {
    return `
    <div class="card">
    <img class="card-image" src=${this.state.images[0]} alt="image">
    <div class="card-head">
      <div class="card-rating button-text ">
        <span>${this.state.rating}</span>
        <a><i class="bi bi-star">&nbsp;</i></a>
      </div>
      <div class="price">${this.state.price}</div>
    </div>
    <div class="card-body">
      <span class="card-text">${this.state.title}</span>
      <p class="article">${this.state.category}</p>
    </div>
    <button class="button button-text">Add To Cart</button>
  </div>
    `;
  }


  update(data = {}) {
    this.state = data;
    this.componentElement.innerHTML = this.getTemplate()
  }


  myRender() {
    const div = document.createElement('div');
    div.innerHTML = this.getTemplate();
    this.element = div.firstElementChild;

  }


}
