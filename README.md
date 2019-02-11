# recipe-search-engine

A recipe search engine called 'Deliciously' that leverages food2fork.com RESTful APIs. Upon searching for recipes, the user can adjust ingredient portions of a selected recipe according to servings. The user can then add the recipe ingredients to a shopping list. The user can also 'like' any recipes of their choice. The app was developed with modern JavaScript (ES6+) using OOP to encapsulate (with class within an IIFE) and abstract the underlying data model. 'Liked' recipes are persisted by way of `localStorage`. Babel and Webpack were used to to generate polyfills and asset bundling respectively.

#### Tooling: 
1. JavaScript (ES6+)
2. HTML5
3. CSS
4. `axios`: RESTful search/lookup
5. `uniqid`: unqiue ID generation
6. Babel
7. Webpack

#### Site usage per 'deliciously-ui.png'
1. Search for recipes
2. Select recipe of interest
3. Adjust servings (cooking time updates accordingly)
4. 'Like' a recipe and add to 'Likes' list
5. Add recipe ingredients to shopping list
6. Jump to food2fork.com cooking directions page for selected recipe
7. List of 'Likes' recipes
8. Adjust ingredient portions, remove ingredients from shopping list 
