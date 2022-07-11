export default class SearchBox {
    constructor() {
        this.render();
        this.addEventListener();
    }


    getTemplate() {
        const result = `
        <div class="form" 
        >
        <input placeholder="Search" class="form-search"  data-element="search-box-input" />
        <i class="bi bi-search input-icon"></i>
        </div>
        `;
        return result;

    }
    render() {
        const div = document.createElement('div');

        div.innerHTML = this.getTemplate();
        this.element = div.firstElementChild;
    }

    addEventListener() {
        const searchElement = this.element.querySelector('[data-element="search-box-input"]');

        // console.log('search', searchElement);

        searchElement.addEventListener('keyup', event => {
            const customEvent = new CustomEvent('search-changed', {
                detail: event.target.value
            });

            console.log(customEvent);
            this.element.dispatchEvent(customEvent);
        });
    }

}




