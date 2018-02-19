class Fat {
	fat: number=0;
	satFat: number=0;
	unsatFat: number=0;
	transFat: number=0;
}

class Vitamin {
	vita: number = 0;
	vitc: number = 0;
}

class Carbs {
	carbs: number= 0;
	sugar: number=0;
	fiber: number=0;
}
export class Nutrition {
	calories: number = 0;
	fat: Fat = new Fat();
	cholestrol: number = 0;
	sodium: number = 0;
	carbs: Carbs = new Carbs();
	protein: number = 0;
	vitamin:Vitamin = new Vitamin();
	calcium: number = 0;
	iron: number = 0;
}
