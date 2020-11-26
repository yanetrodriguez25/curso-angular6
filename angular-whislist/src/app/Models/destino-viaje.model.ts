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
		var tempDestino = JSON.parse(JSON.stringify(this));
		tempDestino.selected = s;
	}

	voteUp() {
		var tempDestino = JSON.parse(JSON.stringify(this));
		tempDestino.votes++;
	}
	
	voteDowm() {
		var tempDestino = JSON.parse(JSON.stringify(this));
		tempDestino.votes--;
    }
}