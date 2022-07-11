import CardsList from './cards-list.js';
import Pagination from './pagination.js';
import SearchBox from './searchBox.js';

const BACKEND_URL = 'https://online-store.bootcamp.place/api/';

export default class OnlineStorePage {
  constructor() {
    this.pageSize = 9;
    this.products = [];

    this.url = new URL('products', BACKEND_URL);
    this.url.searchParams.set('_limit', this.pageSize);

    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();

    this.update(1);


    // this.updateByText();
  }

  async loadData(pageNumber) {
    this.url.searchParams.set('_page', pageNumber);

    const response = await fetch(this.url);
    const products = await response.json();

    return products;
  }

  getTemplate() {
    return `
    <div class="container">
      <header class="header">
        <div class="logo">Online Store</div>
        <div data-element="search-box">
            <!-- Search -->
        </div>
        <a href="#" class="basket-button" data-element="basket">
          <i class="bi bi-cart"></i>
          Cart
          <span class="counter-product"></span>
        </a>

      </header> 
 
      <div class="main-page">
        <div data-element="side-bar"> <!-- Site bar component --></div>
      
        <div class="row">
          <div   
            data-element="cardsList"
            class="cards-list"
            >
            <!-- Cards List component -->
          </div>
          <div data-element="pagination">
            <!-- Pagination component -->
          </div>
          </div>
      <div/>
    </div>
    `;
  }

  initComponents() {
    // TODO: remove hardcoded value
    const totalElements = 100;
    const totalPages = Math.ceil(totalElements / this.pageSize);

    const cardsList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    });
    const searchBox = new SearchBox();

    this.components.cardList = cardsList;
    this.components.pagination = pagination;
    this.components.searchBox = searchBox;
  }

  renderComponents() {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');
    const searchBoxContainer = this.element.querySelector('[data-element="search-box"]');



    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
    searchBoxContainer.append(this.components.searchBox.element);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  initEventListeners() {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = event.detail;

      this.update(pageIndex + 1);
    });

    this.components.searchBox.element.addEventListener('search-change', event => {
      const textSearch = event.detail;

      this.updateByText(textSearch);


    });
  }

  async update(pageNumber) {
    const data = await this.loadData(pageNumber);

    this.components.cardList.update(data);
  }

  // async updateByText(value) {
  //   this.url.searchParams.set('q', value);
  //   this.updateCards();
  // }

  // async updateCards() {
  //   this.url.searchParams.delete('_page');

  //   const response = await fetch(this.url);
  //   const products = await response.json();

  //   this.components.cardsList.update(products);
  //   const totalElements = Number(response.headers.get('X-Total-Count'));
  //   this.components.pagination.updatePageCount(totalElements, this.pageSize);
  //   this.components.pagination.setPage(0);
  // }



}