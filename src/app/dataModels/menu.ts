import {Nutrition} from "./nutrition"

export enum MenuType{'APPETIZER', 'ENTREE', 'DRINK', 'DESSERT'};

export class Menu{
	menuId:string;
	name:string;
	price: number;
	description: string;
	ingredients: string[];
	menutype : MenuType;
	menuSection: string;
	nutrition: Nutrition
}