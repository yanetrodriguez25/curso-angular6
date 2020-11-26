export class DestinoViaje {

	selected: boolean;
	servicios: string[];
	id : number;
	
	constructor(public nombre:string, public u:string, public votes: number = 0){
		this.servicios = ['pileta', 'desayuno'];
	}

	isSelected(): boolean{
		return this.selected;
	}

	setSelected(s :boolean){
		this.selected = s;
	}

	voteUp() {
		this.votes++;
	}
	
	voteDowm() {
		this.votes--;
    }
}