// Variável para salvarmos a lista de núemros sorteados
let numerosSorteados = [];
// Variável para delimitar o range dos numeros do sorteio
let rangeNumeroSoreteio = 100; 

// Criamos a variável numeroSecreto para ser utilizada na função de gerar número
let numeroSecreto = gerarNumeroAleatorio();

// Variável para armazenar as tentativas
let tentativas = 1;

// Criando uma função para deixar dinâmico a escrita no HTML
function mostrarTexto(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
    // Usamos o responsive voice para adicionar voz ao jovo
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.4});
}
// Criamos a função para definir a mensagem do jogo
function mensagemIncial() {
    mostrarTexto('h1', 'Jogo acerte o número....');
    mostrarTexto('p', `Digite um número de 1 a ${rangeNumeroSoreteio}!`);
}
// Chamamos a função para que ela já seja exibida
mensagemIncial();

// Função para verificar o chute
function verificarChute() {
    let chute = document.querySelector('input').value

    if (chute == numeroSecreto) {
        mostrarTexto('h1', 'Você acertou!! 🎉🥳');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        mostrarTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
            mostrarTexto('p', 'O número secreto é menor, tente de novo...')
        } else {
            mostrarTexto('p', 'O número secreto é maior, tente de novo...')
        }
        tentativas++;
        limparCampo();
    }
}
// Função que vai gerar o número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * rangeNumeroSoreteio + 1);
    let totalNumerosLista = numerosSorteados.length;
    // Condicional para ver o tamanho da lista e limpar quando o limite for atingido
    if(totalNumerosLista == rangeNumeroSoreteio){
        numerosSorteados = [];
    }
    // Condicional para verificar se o numero está na lista e caso não esteja, irá incluir
    if(numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

// Função para limpar o campo do chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para iniciar um novo jogo
function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}