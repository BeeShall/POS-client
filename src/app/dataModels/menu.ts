/*

Menu

DESCRIPTION: This is a model class for the menu data structure

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

import { Nutrition } from "./nutrition"

//list of all the menu sections
export let MenuType: string[] = ["PASTA A LA CARTE", "SAUCES", "ENTREES A LA CARTE", "SOUP & SALAD", "SANDWICHES", "SIDES", "DESSERTS", "BEVERAGES"];

//lis of all the food sizes
export let SizeList: string[] = ["REGULAR", "SMALL", "LARGE"]

//data model for Menu
export class Menu {
	menuId: string;
	name: string;
	prices: Price[] = [];
	description: string;
	ingredients: string[] = [];
	menutype: string;
	nutrition: Nutrition = new Nutrition();
	reviews: Review[] = [];
	images: any[] = [];
}

//data model for different prices for different types
export class Price {
	type: string;
	price: number;
}

//data model for the review for a menu
export class Review{
	rating: number;
	review: string;
}