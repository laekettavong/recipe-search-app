import { elements as Elements } from '../helpers/base'
import DOMSelector from '../helpers/domSelector'

export default class ListView {
    static renderItem(item) {
        console.log("FFFFFF", item)
        const markup =
            `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input class="shopping__count-value" type="number" value="${item.count}" step="${item.count}">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
            `

        Elements.shoppingList.insertAdjacentHTML('beforeend', markup)
    }

    static deleteItem(id) {
        const item = DOMSelector.getElement(`[data-itemid="${id}"]`)
        if (item) item.parentElement.removeChild(item)
    }
}