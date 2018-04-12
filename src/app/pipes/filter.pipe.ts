import { Injectable, Pipe, PipeTransform } from '@angular/core';
/*

Filter Pipe

DESCRIPTION: This is a piope class to use for filtering in the search bar

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Pipe({
	name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {

	transform(items: any[], field: string, value: string): any[] {
		if (!items) {
			return [];
		}
		if (!field || !value) {
			return items;
		}

		return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
	}
}
