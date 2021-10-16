let searchBtn = document.getElementById('search-btn');
let recipeResults = document.getElementById('recipe-results') 
let recipeDisplayContent = document.querySelector('.recipe-modal');
let closeBtn = document.getElementById('recipe-close-btn');

//Adding event listeners on the elements selected 
searchBtn.addEventListener('click', getSearchResults);

recipeResults.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('recipe-display-item-btn')){
        let recipeItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
});

closeBtn.addEventListener('click',()=>{
    recipeDisplayContent.parentElement.classList.remove('showRecipe');
})

//Creating a function to get the list of recipes based on the search 
function getSearchResults(){
    let searchQuery = document.getElementById('ingredient-input').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`)
    .then(response=>response.json())
    .then(data=>{
        let displayHTML = ""; 
        if(data.meals){
            data.meals.forEach(meal=>{
                //console.log(meal);
                displayHTML += `
                    <div class="recipe-display-item" data-id="${meal.idMeal}">
                        <div class="recipe-display-item-image">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal} Image">
                        </div>
                        <div class="recipe-display-item-heading">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-display-item-btn">Show Recipe</a>
                        </div>
                    </div>
                `;
            });
        recipeResults.classList.remove('noResults');
    } else{
        displayHTML = "No results found for the ingredient you are looking for.";
        recipeResults.classList.add('noResults');
    }
    
    recipeResults.innerHTML = displayHTML;
   });
}

//Modal for displaying the recipe 
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0]; 

    let displayHTML = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category>${meal.strCategory}</p>
        <div class="recipe-instructions">
            <h3>How To Prepare?</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-image">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal} Image">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank"> Video Recipe </a>
        </div>
    `;

    recipeDisplayContent.innerHTML = displayHTML;
    recipeDisplayContent.parentElement.classList.add('showRecipe'); 
}

//Creating a function to get a particular recipe 
function getRecipeResults(e){
    
}

