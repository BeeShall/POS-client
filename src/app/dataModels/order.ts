/*

Order

DESCRIPTION: This is a model class for the data model for the orders

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

import { Menu } from "./menu";

export class Order{
	orderType: string;
	menu:Menu; 
	quantity: number;
	size:number;
}