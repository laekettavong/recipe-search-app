import DOMSelector from '../helpers/domSelector'
import Constants from '../helpers/constants'
import { elements as Elements } from '../helpers/base'


//export const getInput = () => DOMSelector.getElement(Constants.ELEMENT_SEARCH_FIELD).value


export default (() => {

    return class SearchView {
        static getInput() {
            return Elements.searchInput.value
        }

        static clearInput() {
            Elements.searchInput.value = ''
        }

        static renderRecipe(recipe) {
            const markup =
                `
                    <li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${SearchView.limitRecipeTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>
                `
            Elements.searchResultList.insertAdjacentHTML('beforeend', markup)
        }

        static renderResults(recipes, page = 1, resultsPerPage = 10) {
            const start = (page - 1) * resultsPerPage
            const end = page * resultsPerPage
            recipes.slice(start, end).forEach(SearchView.renderRecipe)
            SearchView.renderPageButtons(page, recipes.length, resultsPerPage)
        }

        static createPageButton(page, type) {
            const button =
                `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>
                `
            return button
        }

        static renderPageButtons(page, numResults, resultsPerPage) {
            const pages = Math.ceil(numResults / resultsPerPage)
            let button
            if (page === 1 && pages > 1) {
                // Only button to go to next page
                button = SearchView.createPageButton(page, 'next')
            } else if (page < pages) {
                // Both buttons
                button = `
                ${button = SearchView.createPageButton(page, 'next')}
                ${button = SearchView.createPageButton(page, 'prev')}
                `;
            } else if (page === pages && pages > 1) {
                // Only button to go to prev page
                button = SearchView.createPageButton(page, 'prev')
            }

            Elements.searchResultPages.insertAdjacentHTML('afterbegin', button)
        }

        static clearResults() {
            Elements.searchResultList.innerHTML = ''
            Elements.searchResultPages.innerHTML = ''
        }

        static highlightSelected(id) {
            const resultsArr = Array.from(DOMSelector.getAllElements('.results__link'))
            resultsArr.forEach(ele => {
                ele.classList.remove('results__link--active')
            })

            DOMSelector.getElement(`.results__link[href*="${id}"]`).classList.add('results__link--active')
        }


        static limitRecipeTitle(title, limit = 17) {
            if (limit <= limit) {
                const retArray = []
                title.split(' ').reduce((acc, cur) => {
                    if (acc + cur.length <= limit) {
                        retArray.push(cur)
                    }
                    return acc + cur.length
                }, 0)

                return `${retArray.join(' ')} ...`
            }
            return title
        }

    }
})()