import {Nutrition} from "./nutrition"

enum MenuType{'APPETIZER', 'ENTREE', 'DRINK', 'DESSERT'};

export class Menu{
	id:number;
	name:string;
	price: number;
	description: string;
	ingredients: string;
	menutype : MenuType;
	menuSection: string;
	nutrition: Nutrition
}