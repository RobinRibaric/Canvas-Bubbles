import Particle from './particle.js';
import { randomIntFromRange } from './utils/utils.js';

const COLORS = ['blue', 'green', 'pink', 'purple', 'yellow'];

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.gameObjects = [];
        this.particles = [];
        
    }
    
    start() {
        this.createParticles(60);
        this.gameObjects = [...this.particles];
    }

    getRandomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    createParticles(amount) {
        for(let i = 0; i < amount; i++){
            let radius = 10;
            let x  = randomIntFromRange(radius, this.gameWidth - radius);
            let y  = randomIntFromRange(radius, this.gameHeight - radius);
            
            let color = this.getRandomColor();
            this.particles = [...this.particles, new Particle(x, y, radius, color, this)];
            
            if(i !== 0) {
                for(let j = 0; j < this.particles.length; j++){
                    if(this.distance(x, y, this.particles[j].x, this.particles[j].y) - radius * 2 < 0) {
                        x  = randomIntFromRange(radius, this.gameWidth - radius);
                        y  = randomIntFromRange(radius, this.gameHeight - radius);

                        j = -1;
                    }
                }
            }
        }
    }

    
    distance(x1, y1, x2, y2){
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    };

    update(deltaTime){
        this.gameObjects.forEach(gameObject => gameObject.update(deltaTime, this.particles));
    };

    draw(ctx){
        this.gameObjects.forEach(gameObject => gameObject.draw(ctx));
    };
    
}