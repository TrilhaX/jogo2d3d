class Veiculo {
    Tipo: string;
    Marca: string;
    Cor: string;
    Velocidade: number;
    Passageiro: number;

    constructor(tipo: string, marca: string, cor: string, velocidade: number, passageiro: number) {
        this.Tipo = tipo;
        this.Marca = marca;
        this.Cor = cor;
        this.Velocidade = velocidade;
        this.Passageiro = passageiro;
    }

    acelerar() {
        this.Velocidade += 5;
        console.log(`O carro ${this.Marca} acelerou para ${this.Velocidade} km/h.`);
    }
    frear(){
        this.Velocidade -= 1;
        console.log(`O carro ${this.Marca} freiou para ${this.Velocidade} km/h.`);
    }
}

let carro = new Veiculo("Mustang", "Ford", "Amarelo", 100, 4);
carro.acelerar();
carro.frear();
console.log(carro);