import { resolveCollision } from './utils/collision.js';
import { distance } from './utils/utils.js';


export default class Particle {
    constructor(x, y, radius, color, game){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.game = game;
        this.mass = 3;
        this.velocity = {
            x: Math.random() * 0.6, 
            y: Math.random()* 0.6,
        };
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    update(deltaTime, particles) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        for(let i = 0; i < particles.length; i++) {
            if(this === particles[i]) continue;
    
            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 <= 0) {
                resolveCollision(this, particles[i]);
               
            }
            
        }

        if(this.x - this.radius <= 0 || this.x + this.radius >= this.game.gameWidth) this.velocity.x = -this.velocity.x;
        if(this.y - this.radius <= 0 || this.y + this.radius >= this.game.gameHeight) this.velocity.y = -this.velocity.y;
    }
}



