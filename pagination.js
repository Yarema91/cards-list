export default class Pagination {
  constructor({
    activePagesIndex = 0,
    totalPages = 0
  } = {}) {
    // this.totalPages = 12;
    this.activePagesIndex = activePagesIndex;
    this.totalPages = totalPages;

    this.render();
    this.addEventListeners();
  }

  getTemplate() {
    return `
    <nav 
    class="pagination"
    >
      <a href="#" class="prev-page page-link" data-element="nav-prev" >
        <i class="bi bi-chevron-left"></i></a>
      </a>
        ${this.getPages()}
      <a href="#" class="next-page page-link" data-element="nav-next">
        <i class="bi bi-chevron-right"></i>
      </a>
    </nav>
    `;
  }
  getPages() {
    return `
      <ul 
      class="pagination" 
      data-element="pagination"
      >
        ${new Array(this.totalPages).fill(1).map((item, index) => {
      return this.getPageTemplate(index);
    }).join('')}
      </ul>
    `;
  }

  getPageTemplate(pageIndex = 0) {
    const isActive = (pageIndex === this.activePagesIndex) ? 'active' : '';
    return `
    <li class="page-link">
      <a
        href="#"
        data-element="page"
        class="page-link ${isActive}"
        data-page-index="${pageIndex}"
         >${pageIndex + 1}
      </a>
    </li>
    `;
  }


  setPage(pageIndex = 0) {
    if (pageIndex === this.activePageIndex) return;
    if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;

    this.dispatchEvent(pageIndex);

    const activePage = this.element.querySelector('.page-link.active');

    if (activePage) {
      activePage.classList.remove('active');
    }

    const nextActivePage = this.element.querySelector(`[data-page-index="${pageIndex}"]`);

    if (nextActivePage) {
      nextActivePage.classList.add('active');
    }

    this.activePageIndex = pageIndex;
  }

  nextPage() {
    const nextPageIndex = this.activePageIndex + 1;

    this.setPage(nextPageIndex);
  }

  prevPage() {
    const prevPageIndex = this.activePageIndex - 1;

    this.setPage(prevPageIndex);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  addEventListeners() {
    const prevPageBtn = this.element.querySelector('[data-element="nav-prev"]');
    const nextPageBtn = this.element.querySelector('[data-element="nav-next"]');
    const pagesList = this.element.querySelector('[data-element="pagination"]');

    prevPageBtn.addEventListener('click', () => {
      this.prevPage();
    });

    nextPageBtn.addEventListener('click', () => {
      this.nextPage();
    });

    pagesList.addEventListener('click', event => {
      const pageItem = event.target.closest('.page-link');

      if (!pageItem) return;

      const { pageIndex } = pageItem.dataset;

      this.setPage(parseInt(pageIndex, 10));
    });
  }

  dispatchEvent(pageIndex) {
    const customEvent = new CustomEvent('page-changed', {
      detail: pageIndex
    });

    this.element.dispatchEvent(customEvent);
  }

};


