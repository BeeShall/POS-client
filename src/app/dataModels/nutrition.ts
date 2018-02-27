export let DailyValues = {
	"fat": 65,
	"satFat":20,
	"cholestrol":300,
	"sodium":2400,
	"carbs":300,
	"fiber":25
}

class Fat {
	fat: number = 0;
	satFat: number = 0;
	unsatFat: number = 0;
	transFat: number = 0;
}

class Vitamin {
	vita: number = 0;
	vitc: number = 0;
}

class Carbs {
	carbs: number = 0;
	sugar: number = 0;
	fiber: number = 0;
}

class Calories {
	calories: number = 0;
	caloriesFromFat: number = 0;
}

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


