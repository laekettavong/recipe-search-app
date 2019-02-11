import { elements as Elements } from '../helpers/base'
import SearchView from './searchView'
import DOMSelector from '../helpers/domSelector'

export default class LikesView {
    static toggleLikeBtn(isLiked) {
        const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
        DOMSelector.getElement('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
    }

    static toggleLikeMenu(numLikes) {
        Elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'
    }

    static renderLike(like) {
        const markup =
            `
                <li>
                    <a class="likes__link" href="#${like.id}">
                        <figure class="likes__fig">
                            <img src="${like.img}" alt="${like.title}">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${SearchView.limitRecipeTitle(like.title)}</h4>
                            <p class="likes__author">${like.author}</p>
                        </div>
                    </a>
                </li>
            `
        Elements.likesList.insertAdjacentHTML('beforeend', markup)
    }

    static deleteLike(id) {
        const ele = DOMSelector.getElement(`.likes__link[href*="${id}"]`).parentElement
        if (ele) ele.parentElement.removeChild(ele)
    }
}