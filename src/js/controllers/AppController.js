import EventBinder from '../helpers/eventBinder'
import Constants from '../helpers/constants'
import { elements as Elements, Loader } from '../helpers/base'
import Search from '../models/Search'
import Recipe from '../models/Recipe'
import List from '../models/List'
import Likes from '../models/Likes'
import StateManager from '../models/StateManager';
import SearchView from '../views/searchView'
import RecipeView from '../views/recipeView'
import ListView from '../views/listView'
import LikesView from '../views/likesView'

export default (() => {
    const { state } = StateManager

    return class AppController {
        static init() {
            EventBinder.bindSubmit(Constants.ELEMENT_SEARCH, event => {
                event.preventDefault()
                AppController.controlSearch()
            })

            EventBinder.bindClick(Constants.ELEMENT_RESULTS_PAGE, ({ target }) => {
                const btn = target.closest('.btn-inline')
                if (btn) {
                    const gotoPage = +btn.dataset.goto
                    SearchView.clearResults()
                    SearchView.renderResults(state.search.result, gotoPage)
                }
            })
            new Array('hashchange', 'load').forEach(event => EventBinder.bindWindow(event, AppController.controlRecipe))
            EventBinder.bindWindow(Constants.EVENT_LOAD, AppController.loadData)
            EventBinder.bindClick(Constants.ELEMENT_RECIPES, AppController.handlePlusMinusButtons)
            EventBinder.bindClick(Constants.ELEMENT_SHOPPING_LIST, AppController.updateShoppingListItem)
        }

        static async controlSearch() {
            console.log("XXXXXX1", state, state.search)
            const query = SearchView.getInput()
            if (query) {
                state.search = new Search(query)
                console.log("XXXXXX2", state)
                SearchView.clearInput()
                SearchView.clearResults()
                Loader.renderLoader(Elements.searchRes)
                try {
                    await state.search.getResults()
                    Loader.clearLoader()
                    console.log("XXXXXX3", state.search.result)
                    SearchView.renderResults(state.search.result)
                } catch (err) {
                    console.log('Something went wrong with search', err)
                    alert('Something went wrong with search')
                    Loader.clearLoader()
                }
            }
        }

        static async controlRecipe() {
            const recipeId = window.location.hash.replace('#', '')
            if (recipeId) {
                RecipeView.clearRecipe()
                Loader.renderLoader(Elements.recipe)
                if (state.search) {
                    SearchView.highlightSelected(recipeId)
                }
                state.recipe = new Recipe(recipeId)
                try {
                    await state.recipe.getRecipe()
                    state.recipe.parseIngredients()
                    state.recipe.calculateTime()
                    state.recipe.calculateServings()
                    Loader.clearLoader()
                    RecipeView.renderRecipe(state.recipe, state.likes.isLiked(recipeId))
                } catch (err) {
                    console.log("Error processing recipe", err)
                    alert('Error processing recipe!')
                }
            }
        }

        static controlList() {
            if (!state.list) state.list = new List()
            state.recipe.ingredients.forEach(ele => {
                const item = state.list.addItem(ele.count, ele.unit, ele.ingredient)
                ListView.renderItem(item)
            })
        }

        static controlLike() {
            if (!state.likes) state.likes = new Likes()
            const currentId = state.recipe.id

            // User has NOT yet like current recipe
            if (!state.likes.isLiked(currentId)) {
                const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img)
                LikesView.toggleLikeBtn(true)
                LikesView.renderLike(newLike)
            } else { // User has liked current recipe
                state.likes.deleteLike(currentId)
                LikesView.toggleLikeBtn(false)
                LikesView.deleteLike(currentId)
            }

            LikesView.toggleLikeMenu(state.likes.getNumLikes())
        }

        static updateShoppingListItem({ target }) {
            const itemId = target.closest(Constants.ELEMENT_SHOPPING_ITEM).dataset.itemid
            if (target.matches('.shopping__delete, .shopping__delete *')) {
                state.list.deleteItem(itemId)
                ListView.deleteItem(itemId)
            } else if (target.matches('.shopping__count-value')) {
                const value = Number.parseFloat(target.value)
                state.list.updateCount(itemId, value)
            }
        }

        static handlePlusMinusButtons({ target }) {
            if (target.matches('.btn-decrease, .btn-decrease *')) {
                // Decrease button is clicked
                if (state.recipe.servings > 1) {
                    state.recipe.updateServings('dec');
                    RecipeView.updateServingsIngredients(state.recipe);
                }
            } else if (target.matches('.btn-increase, .btn-increase *')) {
                // Increase button is clicked
                state.recipe.updateServings('inc');
                RecipeView.updateServingsIngredients(state.recipe);
            } else if (target.matches('.recipe__btn--add, .recipe__btn--add *')) {
                // Add ingredients to shopping list
                AppController.controlList();
            } else if (target.matches('.recipe__love, .recipe__love *')) {
                // Like controller
                AppController.controlLike();
            }
        }

        static loadData() {
            state.likes = new Likes()
            state.likes.readStorage()
            LikesView.toggleLikeMenu(state.likes.getNumLikes())
            state.likes.likes.forEach(like => LikesView.renderLike(like))
        }
    }
})()


