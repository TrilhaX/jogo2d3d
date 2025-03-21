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
const buffImg1 = new Image();
buffImg1.src = "images/boost.png";

let jogoAtivo = true;
let points = 0
let MaxPoints = 0;
let firstObstaculo = true;
let cogumeloOnMap = false;

const personagem = {
    x: 30,
    y: 110,
    altura: 40,
    largura: 30,
    velocidadeY: 0,
    pulando: false,
    gravidade: 1,
    forcaPulo: 12,
    chao: 0
};

const obstaculo = {
    x: 260,
    y: canvas.height,
    largura: 40,
    altura: 70,
    velocidadeX: 5,
};

const buff1 = {
    x: 260,
    y: canvas.height,
    largura: 30,
    altura: 50,
}

personagem.chao = canvas.height - personagem.altura;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !personagem.pulando && jogoAtivo) {
        personagem.pulando = true;
        personagem.velocidadeY = -personagem.forcaPulo; 
    }
});

function desenharPersonagem() {
    if (personagem.pulando === false){
        ctx.drawImage(imgPersonagemAndando, personagem.x, personagem.y, personagem.largura, personagem.altura);
    }else{
        ctx.drawImage(imgPersonagemPulando, personagem.x, personagem.y, personagem.largura, personagem.altura);
    }
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadeY += personagem.gravidade;
        personagem.y += personagem.velocidadeY;
        if (personagem.y >= personagem.chao) {
            personagem.y = personagem.chao;
            personagem.velocidadeY = 0;
            personagem.pulando = false;
        }
    }
}

function desenharObstaculo() {
    ctx.drawImage(imgObstaculo,obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadeX;
    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadeX += 0.3;
        let nova_altura = (Math.random() * 50) + 10;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - obstaculo.altura; 
        cogumeloOnMap = false;
        if (firstObstaculo) {
            firstObstaculo = false;
        } else {
            pontos();
        }
        boost();
    }
}

function detectarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        textDerrota.style.display = "block";
        buttonAviadado.style.display = "block";
        textDerrota.style.marginTop = "10px";
        buttonAviadado.style.marginTop = "10px";
        pontos2.style.marginTop = "0";
        canvas.style.marginTop = "0";
        jogoAtivo = false;
        maxPontos();
    }
}

function playAgain() {
    textDerrota.style.display = "none";
    buttonAviadado.style.display = "none";
    canvas.style.marginTop = "60px";
    pontos2.style.marginTop = "50px";
    personagem.x = 30;
    personagem.y = personagem.chao;
    personagem.pulando = false;
    personagem.velocidadeY = 0;
    personagem.gravidade = 0.8;
    personagem.forcaPulo = 12;
    obstaculo.velocidadeX = 5;
    obstaculo.x = canvas.width;
    points = 0;
    document.getElementById("pontos").innerHTML = "Pontos: " + points;
    jogoAtivo = true;
}

function pontos(){
    points += 10;
    document.getElementById("pontos").innerHTML = "Pontos: " + points;
}

function maxPontos(){
    if(points > MaxPoints){
        MaxPoints = points;
        document.getElementById("Maxpontos").innerHTML = "Máximo de Pontos: " + MaxPoints;
    }
}

function boost() {
    if (!cogumeloOnMap) {
        let chanceAtual = Math.random() * 100;
        if (chanceAtual >= 0) {
            cogumeloOnMap = true;
            buff1.x = canvas.width;
            buff1.y = canvas.height - buff1.altura - 10;
        }
    }
    if (cogumeloOnMap) {
        ctx.drawImage(buffImg1, buff1.x, buff1.y, buff1.largura, buff1.altura);
    }
}

function colisaoBoost(){
    if (
        buff1.x < personagem.x + personagem.largura &&
        buff1.x + buff1.largura > personagem.x &&
        buff1.y < personagem.y + personagem.altura &&
        buff1.y + personagem.altura > personagem.y
    ) {
        personagem.altura += 10
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharPersonagem();
    if (jogoAtivo) {
        atualizarPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        detectarColisao();
        colisaoBoost();
    }
    requestAnimationFrame(loop);
}

document.getElementById("buttonAviadado").addEventListener("click", playAgain);
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !jogoAtivo) {
        playAgain();
    }
});
loop();