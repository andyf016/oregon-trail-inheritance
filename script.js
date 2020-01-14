function Traveler (name){
    this.name = name;
    this.food = 1;
    this.ishealthy = true;
}

function Wagon (capacity){
    this.capacity = capacity;
    this.passengers = [];
}

Traveler.prototype = {
    
    constructor: Traveler,
    
    hunt: function (){
        this.food += 2;
    },

    eat: function(){
        if(this.food === 0){
            this.ishealthy = false
        } else{
            this.food -=1;
        }

    },
}

Wagon.prototype = {
    
    constructor: Wagon,
    
    getAvailableSeatCount: function (){
        let count = this.capacity - this.passengers.length;
        return count;

    },

    join: function(traveler){
        if(this.passengers.length >= this.capacity){
            console.log("wagon is full")
        }else
            this.passengers.push(traveler);
    },

    shouldQuarantine: function (){
        for(i = 0; i < this.passengers.length; i++){
            if(this.passengers[i].ishealthy === false){
                return true;
            }
                
        }return false;
    },

    totalFood: function(){
        let eats = 0 
        for(i = 0; i < this.passengers.length; i++){
            eats = this.passengers[i].food + eats
        } return eats
    },
}

function Doctor (name, food, ishealthy){
    Traveler.call(this, name, food, ishealthy)
}

Doctor.prototype = Object.create(Traveler.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.heal = function(Traveler){
    if(Traveler.ishealthy == false){
        Traveler.ishealthy = true
    }
}
    

function Hunter (name, food, ishealthy, numOfFoodUnits){
    Traveler.call(this, name, food, ishealthy)
    this.numOfFoodUnits = numOfFoodUnits;
    this.food = 2 ;
}

Hunter.prototype = Object.create(Traveler.prototype);
Hunter.prototype.constructor = Hunter;
Hunter.prototype.hunt = function(){
    this.food +=5
    this.ishealthy = true
}


Hunter.prototype.eat = function(){
    if(this.food >=2){
        this.food -= 2;
    }else if (this.food % 2 == 1){
        this.food -= 1 
        this.ishealthy = false
    }
}

Hunter.prototype.giveFood = function(Traveler, numOfFoodUnits){
    if(this.food > numOfFoodUnits){
        this.food -= numOfFoodUnits;
        Traveler.food += numOfFoodUnits;
    } else if (this.food < numOfFoodUnits){
        return;
    }
}


// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
