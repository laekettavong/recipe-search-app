# recipe-search-app

A recipe search engine called 'Deliciously' that leverages food2fork.com RESTful APIs. Upon searching for recipes, the user can adjust ingredient portions of a selected recipe according to servings. The user can then add the recipe ingredients to a shopping list. The user can also 'like' any recipes of their choice. The app was developed with modern JavaScript (ES6+) using OOP to encapsulate (with class within an IIFE) and abstract the underlying data model. 'Liked' recipes are persisted by way of `localStorage`. Babel and Webpack were used to to generate polyfills and asset bundling respectively.

Tooling: 
    1. JavaScript (ES6+)
    1. HTML5
    1. CSS
    1. `axios`: RESTful search/lookup
    1. `uniqid`: unqiue ID generation
    1. Babel
    1. Webpack

Site usage per deliciously-ui.png
    1. Search for recipes
    1. Select recipe of interest
    1. Adjust servings (cooking time updates accordingly)
    1. 'Like' a recipe and add to 'Likes' list
    1. Add recipe ingredients to shopping list
    1. Jump to food2fork.com cooking directions page for selected recipe
    1. List of 'Likes' recipes
    1. Adjust ingredient portions, remove ingredients from shopping list 
