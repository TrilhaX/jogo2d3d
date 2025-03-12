const canvas = document.querySelector("#jogo2D");
const ctx = canvas.getContext("2d");
const textDerrota = document.getElementById("h1");
const buttonAviadado = document.getElementById("buttonAviadado");
const pontos2 = document.getElementById("pontos");
const maxPointos = document.getElementById("Maxpontos");

const imgObstaculo = new Image();
imgObstaculo.src = "images/obstaculos.png";
const imgPersonagemAndando = new Image();
imgPersonagemAndando.src = "images/marioCorrendo.png";
const imgPersonagemPulando = new Image();
imgPersonagemPulando.src = "images/marioPulando.png";

let jogoAtivo = true;
let points = 0;
let MaxPoints = 0;

class entidade {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }
}

class personagem extends entidade {
    #gravidade;
    constructor(x, y, altura, largura) {
        super(x, y, largura, altura);
        this.#gravidade = 0.5;
        this.velocidadeY = 0;
        this.pulando = false;
        this.forcaPulo = 10;
    }

    getGravidade = () => this.#gravidade;

    getChao = () => 88;

    desenharPersonagem = () => {
        ctx.drawImage(this.pulando ? imgPersonagemPulando : imgPersonagemAndando, this.x, this.y, this.largura, this.altura);
    }

    atualizarPersonagem = () => {
        if (this.pulando) {
            this.velocidadeY += this.getGravidade();
            this.y += this.velocidadeY;
            if (this.y >= this.getChao()) {
                this.y = this.getChao();
                this.velocidadeY = 0;
                this.pulando = false;
            }
        }
    }

    pular = () => {
        if (!this.pulando) {
            this.velocidadeY = -this.forcaPulo;
            this.pulando = true;
        }
    }
}

class obstaculo extends entidade {
    constructor(x, y, altura, largura, velocidadeX) {
        super(x, y, largura, altura);
        this.velocidadeX = velocidadeX;
    }

    desenharObstaculo = () => {
        ctx.drawImage(imgObstaculo, this.x, this.y, this.largura, this.altura);
    }

    atualizarObstaculo = () => {
        this.x -= this.velocidadeX;
        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.velocidadeX += 0.3;
            let nova_altura = (Math.random() * 50) + 35;
            this.altura = nova_altura;
            this.y = canvas.height - this.altura;
            points++;
            pontos2.innerHTML = "Pontos: " + points;
            if (points > MaxPoints) {
                MaxPoints = points;
                maxPointos.innerHTML = "Max Pontos: " + MaxPoints;
            }
        }
    }
}

const p = new personagem(30, 88, 40, 30);
const ob = new obstaculo(260, 88, 70, 70, 5);

function playAgain() {
    textDerrota.style.display = "none";
    buttonAviadado.style.display = "none";
    points = 0;
    pontos2.innerHTML = "Pontos: " + points;
    p.x = 30;
    p.y = p.getChao();
    p.pulando = false;
    p.velocidadeY = 0;
    ob.x = canvas.width;
    ob.velocidadeX = 5;
    jogoAtivo = true;
}

function detectarColisao(a, b) {
    return (
        a.x < b.x + b.largura &&
        a.x + a.largura > b.x &&
        a.y < b.y + b.altura &&
        a.y + a.altura > b.y
    );
}

function gameOver() {
    jogoAtivo = false;
    textDerrota.style.display = "block";
    buttonAviadado.style.display = "block";
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (jogoAtivo) {
        p.atualizarPersonagem();
        ob.atualizarObstaculo();
        if (detectarColisao(p, ob)) gameOver();
    }
    p.desenharPersonagem();
    ob.desenharObstaculo();
    requestAnimationFrame(loop);
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && jogoAtivo){
        p.pular();
    }
    else if (event.code === "Space" && !jogoAtivo){
        playAgain();
    }
});

buttonAviadado.addEventListener("click", playAgain);

loop();