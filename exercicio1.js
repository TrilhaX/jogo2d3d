var Veiculo = /** @class */ (function () {
    function Veiculo(tipo, marca, cor, velocidade, passageiro) {
        this.Tipo = tipo;
        this.Marca = marca;
        this.Cor = cor;
        this.Velocidade = velocidade;
        this.Passageiro = passageiro;
    }
    Veiculo.prototype.acelerar = function () {
        this.Velocidade += 5;
        console.log("O carro ".concat(this.Marca, " acelerou para ").concat(this.Velocidade, " km/h."));
    };
    Veiculo.prototype.frear = function () {
        this.Velocidade -= 1;
        console.log("O carro ".concat(this.Marca, " freiou para ").concat(this.Velocidade, " km/h."));
    };
    return Veiculo;
}());
var carro = new Veiculo("Mustang", "Ford", "Amarelo", 100, 4);
carro.acelerar();
carro.frear();
console.log(carro);