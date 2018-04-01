import { Nutrition } from "./nutrition"

export let MenuType: string[] = ["PASTA A LA CARTE", "SAUCES", "ENTREES A LA CARTE", "SOUP & SALAD", "SANDWICHES", "SIDES", "DESSERTS", "BEVERAGES"];

export let SizeList: string[] = ["REGULAR", "SMALL", "LARGE"]


export class Menu {
	menuId: string;
	name: string;
	prices: Price[] = [];
	description: string;
	ingredients: string[] = [];
	menutype: string;
	nutrition: Nutrition = new Nutrition();
	reviews: Review = new Review();
	images: any[] = [];
}

export class Price {
	type: string;
	price: number;
}

export class Review{
	rating: number;
	review: string;
}