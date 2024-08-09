export class CustomPageable {
	readonly page: number;
	readonly limit: number;

	constructor(_page: number, _limit: number) {
		this.page = _page;
		this.limit = _limit;
	}

	get skip(): number {
		return (this.page - 1) * this.limit;
	}
}
