let uuid = 1;
class Player {
  constructor(name, color = null) {
    if (this.constructor == Player) {
        throw new Error("Abstract Classes can't instantiated.");
    }
    this.colorArray = {
        'dodgerBlue': true,
        'blue': true,
        'red': true,
        'black': true,
        'green': true,
        'tomato': true,
        'yellow': true,
        'purple': true,
        'grey': true,
        'orange': true,
        'violet': true,
        'slateBlue': true,
        'mediumSeaGreen': true,
    }
    this.name = name;
    this.output = '';
    this.color = color;
    this.id = this.name + uuid;
    this.create();
    uuid++;
  }
  create() {
    this.output = "Method create() must be implemeted.";
  }
  setColor(color) {
    this.output = "Method setColor() must be implemeted.";
  }
  strToHTML(str) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  }
  select(element = null, all = null) {
    if (all) {
        return document.querySelectorAll(`#${this.id} ${element ? '.'+element : ''}`);
    }

    return document.querySelector(`#${this.id} ${element ? '.'+element : ''}`);
  }
  remove() {
    this.select().parentNode.removeChild(this.select());
    this.id = null;
    this.output = console.log(`Android ${this.name} Removed Successfully`);
  }
  printOutput(){
  	console.log(this.output);
  }
  afterSomeSec(sec=0){
  	let time = parseInt(sec) + 10000;
  	let promise = new Promise((resolve, reject) => {
  		setTimeout(() => {
  			this.output = 'after some minutes';
  		  resolve(this);
  		}, + time);
  	});
  	return promise;
  }
}
class Android extends Player {
  constructor(name, color = 'dodgerBlue') {
    super(name, color);
  }
  create() {
    let container = document.querySelector('.container');
    let drawing = `<div class="${this.color} robot">` + `<div class="head">` + `<div class="eyes"></div>` + `<div class="eyes"></div>` + `</div>` + `<div class="body">` + `<div class="left hand"></div>` + `<div class="stomach">${this.name}</div>` + `<div class="right hand"></div>` + `</div>` + `<div class="foot">` + `<div class="left leg"></div>` + `<div class="right leg"></div>` + `</div>` + `</div>`;
    let node = this.strToHTML(drawing);
    node.id = this.id;
    container.appendChild(node);
    this.output = `Android ${this.name} Created Successfully`;
	}
	setColor(color) {
    if (!this.id) {
        this.output = 'Android do not exist';
    }
    if (this.colorArray[color]) {
        let prevClass = this.color;
        this.color = color;
        this.select().firstChild.classList.remove(prevClass);
        this.select().firstChild.classList.add(this.color);
        this.output = 'Nice Color';
    }else{
    		this.output = 'Color not found';
    }

    return this;
	}
	turnHead(dir='front') {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				this.select('head').classList.remove('turn', 'left', 'right');
				this.select('head').classList.add('turn', `${dir}`);
				this.output = `Head turn ${dir}!`;
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	handUp(part='all') {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (part == 'all') {
					this.select('hand', 'all').forEach((el) => {
						el.classList.remove('down');
						el.classList.add('up');
					});
					this.output = `${part} hand up!`;
				}else{
					this.select(`${part}.hand`).classList.remove('down');
					this.select(`${part}.hand`).classList.add('up');
					this.output = `${part} hand up!`;
				}
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	handDown(part='all') {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (part == 'all') {
					this.select('hand', 'all').forEach((el) => {
						el.classList.remove('up');
						el.classList.add('down');
					});
					this.output = `${part} hand down!`;
				}else{
					this.select(`${part}.hand`).classList.remove('up');
					this.select(`${part}.hand`).classList.add('down');
					this.output = `${part} hand down!`;
				}
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	legUp(part='all') {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (part == 'all') {
					this.select('leg', 'all').forEach((el) => {
						el.classList.remove('down');
						el.classList.add('up');
					});
					this.output = `${part} leg up!`;
				}else{
					this.select(`${part}.leg`).classList.remove('down');
					this.select(`${part}.leg`).classList.add('up');
					this.output = `${part} leg up!`;
				}
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	legDown(part='all') {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (part == 'all') {
					this.select('leg', 'all').forEach((el) => {
						el.classList.remove('up');
						el.classList.add('down');
					});
					this.output = `${part} leg down!`;
				}else{
					this.select(`${part}.leg`).classList.remove('up');
					this.select(`${part}.leg`).classList.add('down');
					this.output = `${part} leg down!`;
				}
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	startTalk() {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				this.select('stomach').classList.remove('talk');
				this.select('stomach').classList.add('talk');
				this.output = `start talk!`;
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
	stopTalk() {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				this.select('stomach').classList.remove('talk');
				this.output = `stop talk!`;
			  resolve(this);
			}, 2000);
		});
		return promise;
	}
}
//Let's go on a dating
let [tosin, bola,ade, lara] = 
    [
        new Android('Tosin','red'), 
        new Android('Bola','blue'), 
        new Android('Ade','black'), 
        new Android('Lara','slateBlue')
    ];
tosin.legUp('right')
		.then(he => he.turnHead('left')
    .then(he => he.handUp()
));
bola.legUp('left')
		.then(he => he.turnHead('right')
    .then(he => he.handUp('right')
    .then(he => he.startTalk()
)));
ade.legUp()
		.then(he => he.turnHead('left')
    .then(he => he.handUp('left')
    .then(he => he.startTalk()
)));
lara.legUp('right')
		.then(he => he.handUp()
);

tosin.afterSomeSec()
			.then(he => he.turnHead('right')
			.then(he => he.handDown()
			.then(he => he.legDown()
			.then(he => he.legUp('left')
    	.then(he => he.startTalk()
)))));
bola.afterSomeSec()
		.then(he => he.turnHead('left')
    .then(he => he.legUp('right')
    .then(he => he.stopTalk()
    .then(he => he.afterSomeSec()
    .then(he => he.handDown()
    .then(he => he.legDown()
    .then(he => he.handUp('left')
)))))));
ade.afterSomeSec()
		.then(he => he.stopTalk()
		.then(he => he.turnHead('right')
		.then(he => he.ledDown('left')
    .then(he => he.startTalk()
))));
lara.afterSomeSec(100)
.then(he => he.handDown()
.then(he => he.turnHead('left')
));
