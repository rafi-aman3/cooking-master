const mealContainer = document.getElementById("meal-container");

//Search Event
const searchMealsData = async () => {
    let searchMeal = document.getElementById("searchMeal").value;
    if(searchMeal){
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+ searchMeal);
        let data = await response.json();
        if(data.meals) {
            displayMeals(data.meals);
        } else {
            const sorryMessage = `<h2>Sorry, No Such Meals Available.</h2>`;
            mealContainer.innerHTML = sorryMessage;
        }
    } else {
        const alertMessage = `<h2> Please, Type a meal name you want to know</h2`;
        mealContainer.innerHTML = alertMessage;
    }
    document.getElementById("searchMeal").value = '';
    //document.getElementById("meal-detail").style.display = 'none';
};

//Display Meals
const displayMeals = meals => {
    let mealName = ``;
    meals.forEach(meal => {
        mealName = mealName + `
            <div onclick="displayMealDetails(${meal.idMeal})" class="col meal-item" id=${meal.idMeal}>
                <div class="card w-100 h-100 shadow-lg">
                    <img src="${meal.strMealThumb}"/>
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        `;
        mealContainer.innerHTML = mealName;
    });
};

//Display Meal Details
const displayMealDetails = async (mealId) => {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ mealId);
    let data = await response.json();
    let meals = data.meals[0];


    
    let mealDetail = `
    <img src="${meals.strMealThumb}" alt="">
    <h2>${meals.strMeal}</h2>
    <h3>Ingredients</h3>
        `;        
    document.getElementById("meal-detail").innerHTML = mealDetail;

    let ingredientList = [];
    for (let i = 1; i <= 20; i++) {
        if (meals[`strIngredient${i}`]) {
            ingredientList.push(meals[`strIngredient${i}`]);
        }
    }
    ul = document.createElement('ul');
    document.getElementById("meal-detail").appendChild(ul);
    ingredientList.forEach(item => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = item;
        
    });
};



