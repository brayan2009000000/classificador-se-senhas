const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');

// Configura os botões de + e -
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// 🔥 CORREÇÃO 1: Adiciona o evento de mudança para CADA checkbox
checkbox.forEach(box => {
    box.onchange = geraSenha;
});

function diminuiTamanho(){
    if (tamanhoSenha > 1){
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho(){
    if (tamanhoSenha < 20){
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Gera a primeira senha ao carregar a página
geraSenha();

function geraSenha(){
    let alfabeto = '';
    if (checkbox[0].checked){
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked){
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked){
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked){
        alfabeto = alfabeto + simbolos;
    }
    
    // Tratamento caso o usuário desmarque todas as caixas
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        classificaSenha(0); 
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++){
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    
    // Passa o tamanho do alfabeto como argumento
    classificaSenha(alfabeto.length);
}

// 🔥 CORREÇÃO 2: Agora a função recebe o 'tamanhoAlfabeto' corretamente
function classificaSenha(tamanhoAlfabeto) {
    const valorEntropia = document.querySelector('.entropia');

    if (tamanhoAlfabeto === 0) {
        forcaSenha.classList.remove('media', 'forte');
        forcaSenha.classList.add('fraca');
        valorEntropia.textContent = "Entropia: 0 bits";
        return;
    }

    // Usa o parâmetro recebido para calcular a entropia
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log("Entropia atual:", entropia);
    
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    // Configura a classe correta na barra de força
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) { 
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    
    // Calcula e exibe o tempo estimado para quebrar a senha
    let dias = 2**Math.floor(entropia) / (100e6 * 60 * 60 * 24);
    
    if (dias > 365) {
        valorEntropia.textContent = `Levaria cerca de ${Math.floor(dias / 365)} anos para quebrar esta senha.`;
    } else {
        valorEntropia.textContent = `Levaria cerca de ${Math.floor(dias)} dias para quebrar esta senha.`;
    }
}