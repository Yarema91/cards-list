export default class Pagination {
  constructor({
    activePagesIndex = 0,
    totalPages = 0
  } = {}) {
    this.defaultPageSize = 12;
    this.activePagesIndex = activePagesIndex;
    this.totalPages = totalPages;

    this.render();
    this.addEventListener();
  }

  getTemplate() {
    return `
    ${this.getPages()}
    `;
  }

  getPages() {
    return `
    <nav
    class="prev-page page "
    data-element="nav-prev"
    ><i class="bi bi-chevron-left"></i></>
    </nav>


      <ul
          class="pagination"
          data-element="pagination"
          >
        ${new Array(this.defaultPageSize).fill(1).map((item, index) => this.getPageTemplate(index)).join('')}
      </ul>

     <nav
      class="next-page page"
      data-element="nav-next"
      ><i class="bi bi-chevron-right"></i></nav>
    `;
  }

  getPageTemplate(pageIndex = 0) {

    const isActive = (pageIndex === this.activePagesIndex) ? 'active' : '';
    return `
    <li>
      <a
        href="#"
        data-element="page"
        class="page ${isActive}"
        data-page-index="${pageIndex}"
         >${pageIndex + 1}
         </a>
    </li>
    `;
  }

  setPage(pageIndex = 0) {

    if (pageIndex === this.activePagesIndex) return;
    if (pageIndex > this.defaultPageSize - 1 || pageIndex < 0) return;


    // this.dispatchSomeEvent()
    const activePages = this.element.querySelector('.page.active');

    if (activePages) {
      activePages.classList.remove('active')
    }

    const nextActivePage = this.element.querySelector(`[data-page-index="${pageIndex}" ]`);

    // console.error("nextActivePage", nextActivePage);

    if (nextActivePage) {
      nextActivePage.classList.add('active')
    }
    this.activePagesIndex = pageIndex;
  }

  nextPage() {
    const nextPageIndex = this.activePagesIndex + 1;
    this.setPage(nextPageIndex);
  }

  prevPage() {
    const prevPageIndex = this.activePagesIndex - 1;
    this.setPage(prevPageIndex);
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTemplate();
    this.element = wrapper;
  }

  addEventListener() {
    const prevPageButton = this.element.querySelector('[data-element="nav-prev"]');
    const nextPageButton = this.element.querySelector('[data-element="nav-next"]');
    const pagesList = this.element.querySelector('[data-element="pagination"]');

    prevPageButton.addEventListener('click', () => {
      this.prevPage();
    });

    nextPageButton.addEventListener('click', () => {
      this.nextPage();
    });

    pagesList.addEventListener('click', event => {

      const pageItem = event.target.closest('.page');

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
