/*

Nutrition

DESCRIPTION: This is a model class for the nutitional information of a menu

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

//object holding constant values for daily nutritional value
export let DailyValues = {
	"fat": 65,
	"satFat":20,
	"cholestrol":300,
	"sodium":2400,
	"carbs":300,
	"fiber":25
}


//data model for Fat 
class Fat {
	fat: number = 0;
	satFat: number = 0;
	unsatFat: number = 0;
	transFat: number = 0;
}

//dagta model for vitamin
class Vitamin {
	vita: number = 0;
	vitc: number = 0;
}

//data model for carbohydrates
class Carbs {
	carbs: number = 0;
	sugar: number = 0;
	fiber: number = 0;
}

//data model for calories
class Calories {
	calories: number = 0;
	caloriesFromFat: number = 0;
}

//data model for Nutritonal facts in a menu
export class Nutrition {
	calories: Calories = new Calories();
	fat: Fat = new Fat();
	cholestrol: number = 0;
	sodium: number = 0;
	carbs: Carbs = new Carbs();
	protein: number = 0;
	vitamin: Vitamin = new Vitamin();
	calcium: number = 0;
	iron: number = 0;
}


