import {Nutrition} from "./nutrition"

let MenuType :string[] = ["APPETIZER", "ENTREE", "DRINK", "DESSERT"];

export default MenuType;

export class Menu{
	menuId:string;
	name:string;
	price: number;
	description: string;
	ingredients: string[] = [];
	menutype : string;
	nutrition: Nutrition = new Nutrition()
}