import CardsList from './cards-list.js';
import Pagination from './pagination.js';


///products?_page=${page}&_limit=8
const BACKEND = `https://online-store.bootcamp.place/api/`;

export default class OnlineStorePage {
  constructor() {
    this.pageSize = 9;
    this.products = [];

    this.url = new URL('products', BACKEND);
    this.url.searchParams.set('_limit', this.pageSize)
    console.log(this.url);

    this.components = {};
    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();
    this.update(1);
  }

  async loadDate(pageNumber) {

    this.url.searchParams.set('_page', this.pageNumber)


    const respons = await fetch(this.url);
    const products = await respons.json();
    console.log('products', products);

    return products;
  };

  getTemplate() {
    return `
      <div>
        <div data-element="cardsList">
          <!-- Cards List component -->
        </div>
        <div data-element="pagination">
          <!-- Pagination component -->
        </div>
      </div>
    `;
  }

  initComponents() {
    // const totalPages = Math.ceil(this.products.length / this.pageSize);

    const totalElements = 100;
    const totalPages = Math.ceil(totalElements / this.pageSize)

    const cardList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    });

    this.components.cardList = cardList;
    this.components.pagination = pagination;
  }

  renderComponents() {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');

    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  initEventListeners() {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = event.detail;

      // [0, 1, 2] | pageIndex = 0 pageSize = 3
      // [3, 4, 5] | pageIndex = 1 pageSize = 3
      // [6, 7]    | pageIndex = 2 pageSize = 3

      this.update(pageIndex + 1)
    });
  }

  async update(pageNumber) {
    // const start = pageIndex * this.pageSize;
    // const end = start + this.pageSize;
    // const data = this.products.slice(start, end);

    const data = await this.loadDate(pageNumber)
    this.components.cardList.update(data);
  }
}
