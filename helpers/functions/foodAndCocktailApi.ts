export const foodsApi = async () => {
    const foodsFetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodsArray = await foodsFetch.json();
    return foodsArray;
}

export const cockTailApi = async () => {
    const drinksFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksArray = await drinksFetch.json();
    return drinksArray;
}