import DOMSelector from './domSelector'
import Constants from './constants'

export const elements = {
    searchForm: DOMSelector.getElement(Constants.ELEMENT_SEARCH),
    searchInput: DOMSelector.getElement(Constants.ELEMENT_SEARCH_FIELD),
    searchRes: DOMSelector.getElement(Constants.ELEMENT_RESULTS),
    searchResultList: DOMSelector.getElement(Constants.ELEMENT_RESULTS_LIST),
    searchResultPages: DOMSelector.getElement(Constants.ELEMENT_RESULTS_PAGE),
    searchLoader: DOMSelector.getElement(Constants.ELEMENT_LOADER),
    recipe: DOMSelector.getElement(Constants.ELEMENT_RECIPES),
    shoppingList: DOMSelector.getElement(Constants.ELEMENT_SHOPPING_LIST),
    likesMenu: DOMSelector.getElement(Constants.ELEMENT_LIKES_FIELD),
    likesList: DOMSelector.getElement(Constants.ELEMENT_LIKES_LIST)
}

export const Loader = (() => {
    return class Loader {
        static renderLoader(parent) {
            const loader =
                `
                    <div class="loader">
                        <svg>
                            <use href="img/icons.svg#icon-cw"></use>
                        </svg>
                    <div>
                `
            parent.insertAdjacentHTML('afterbegin', loader);
        }

        static clearLoader() {
            const loader = DOMSelector.getElement(Constants.ELEMENT_LOADER)
            if (loader) loader.parentElement.removeChild(loader)
        }
    }
})()
