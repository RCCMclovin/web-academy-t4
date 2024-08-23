// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// setup objects
const forms = ["Ball", "Square"];
var objects = []

var mainColor = parseInt(prompt("Escolha sua cor:\n1 - Vermelho\n2 - Verde\n3 - Azul\n"))

// function to generate random number

function random(min, max) {
  let rand = 0;
  while (rand === 0) rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
}


// function to generate random color

function randomRGB() {
  let rand = random(0, 255);
  switch (mainColor) {
    case 1:
      return `rgb(255,${rand},${rand})`;
    case 2:
      return `rgb(${rand},255,${rand})`;
    case 3:
      return `rgb(${rand},${rand}, 255)`;
    default:
      console.log("Cor inválida!\nUsando cor padrão.");
      mainColor = 1;
      return `rgb(255,${rand},${rand})`;
  }
}

function menorX(o1, o2) {
  if (o1.x > o2.x) return o2;
  
  return o1
}
function menorY(o1, o2) {
  if (o1.y > o2.y) return o2;
  
  return o1
}

function randomObject() {
  const randomIndex = Math.floor(Math.random() * forms.length);
  return forms[randomIndex];
}


function Square(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.invincibilityFrames = 0;
}

Square.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.fill();
};

Square.prototype.update = function () {
  if (this.invincibilityFrames > 0) this.invincibilityFrames -= 1;
  if (this.x + this.size >= width-5) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height-5) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Square.prototype.collisionDetect = function () {
  for (let j = 0; j < objects.length; j++) {
    if (!(this === objects[j]) && (this.invincibilityFrames === 0 && objects[j].invincibilityFrames === 0)) {
      const dx = this.x - objects[j].x;
      const dy = this.y - objects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + objects[j].size) {
        objects[j].color = this.color = randomRGB();
        
        this.invincibilityFrames = 7;
        objects[j].invincibilityFrames = 7;
        
        if (Math.abs(objects[j].x - this.x) < 5 && Math.abs(this.velX + objects[j].velX) > Math.abs(this.velX)) {
          menorX(this, objects[j]).velX = - this.velX;
        }else if (Math.abs(objects[j].y - this.y) < 5 && Math.abs(this.velY + objects[j].velY) > Math.abs(this.velY)) {
          menorY(this, objects[j]).velY = - this.velY;
        }else if (Math.abs(objects[j].x - this.x) < 5) {
          objects[j].velX = -objects[j].velX;
          this.velX = - this.velX;
        }else if (Math.abs(objects[j].y - this.y) < 5) {
          objects[j].velY = -objects[j].velY;
          this.velY = - this.velY;
        }else {
          objects[j].velX = -objects[j].velX;
          this.velX = - this.velX;
          objects[j].velY = -objects[j].velY;
          this.velY = - this.velY;
        }
      }
    }
  }
};

// defining ball

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.invincibilityFrames = 0;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function () {
  if (this.invincibilityFrames > 0) this.invincibilityFrames -= 1;
  if (this.x + this.size >= width-5) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height-5) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < objects.length; j++) {
    if (!(this === objects[j]) && (this.invincibilityFrames === 0 && objects[j].invincibilityFrames === 0)) {
      const dx = this.x - objects[j].x;
      const dy = this.y - objects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + objects[j].size) {
        objects[j].color = this.color = randomRGB();
        
        this.invincibilityFrames = 7;
        objects[j].invincibilityFrames = 7;
        
        if (Math.abs(objects[j].x - this.x) < 5 && Math.abs(this.velX + objects[j].velX) > Math.abs(this.velX)) {
          menorX(this, objects[j]).velX = - this.velX;
        }else if (Math.abs(objects[j].y - this.y) < 5 && Math.abs(this.velY + objects[j].velY) > Math.abs(this.velY)) {
          menorY(this, objects[j]).velY = - this.velY;
        }else if (Math.abs(objects[j].x - this.x) < 5) {
          objects[j].velX = -objects[j].velX;
          this.velX = - this.velX;
        }else if (Math.abs(objects[j].y - this.y) < 5) {
          objects[j].velY = -objects[j].velY;
          this.velY = - this.velY;
        }else {
          objects[j].velX = -objects[j].velX;
          this.velX = - this.velX;
          objects[j].velY = -objects[j].velY;
          this.velY = - this.velY;
        }
      }
    }
  }
};

// Creating balls

while (objects.length < 25) {
  let size = random(10, 20);
  let obj;

  switch (randomObject()){
    case "Ball":
      obj = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
      );
      break;
    case "Square":
      obj = new Square(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
      );
      break;

  }

  objects.push(obj);
}

// creating loop

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < objects.length; i++) {
    objects[i].draw();
    objects[i].update();
    objects[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
