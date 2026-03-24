// Conteudo do arquivo:

// Sistema de testes automatizados

const { saudacao, calcular } = require('./app.js');

// Contador de testes

let testesExecutados = 0;

let testesPassaram = 0;

let testesFalharam = 0;

// Funcao auxiliar para executar testes

function executarTeste(nome, funcaoTeste) {

    testesExecutados++;

    try {

        funcaoTeste();

        console.log(`PASSOU: ${nome}`);

        testesPassaram++;

    } catch (error) {

        console.log(`FALHOU: ${nome}`);

        console.log(`   Erro: ${error.message}`);

        testesFalharam++;

    }

}

// Funcao auxiliar para verificar igualdade

function assertEqual(atual, esperado, mensagem = '') {

    if (atual !== esperado) {

        throw new Error(`${mensagem} - Esperado: ${esperado}, Atual: ${atual}`);

    }

}

// Funcao auxiliar para verificar se uma funcao lanca erro

function assertThrows(funcao, mensagemEsperada = '') {

    try {

        funcao();

        throw new Error('Esperava que a funcao lancasse um erro, mas nao lancou');

    } catch (error) {

        if (mensagemEsperada && !error.message.includes(mensagemEsperada)) {

            throw new Error(`Erro lancado, mas mensagem incorreta. Esperado: "${mensagemEsperada}", Atual: "${error.message}"`);

        }

    }

}

console.log('Iniciando bateria de testes automatizados...\n');

// === TESTES DA FUNCAO SAUDACAO ===

console.log('Testando funcao saudacao():');

executarTeste('Saudacao com nome valido', () => {

    const resultado = saudacao('Joao');

    assertEqual(resultado, 'Ola!, Joao! Bem-vindo ao nosso sistema CI/CD!');

});

executarTeste('Saudacao com nome vazio deve falhar', () => {

    assertThrows(() => saudacao(''), 'Nome nao pode estar vazio');

});

executarTeste('Saudacao com null deve falhar', () => {

    assertThrows(() => saudacao(null), 'Nome nao pode estar vazio');

});

// === TESTES DA FUNCAO CALCULAR ===

console.log('\n Testando funcao calcular():');

executarTeste('Soma: 2 + 3 = 5', () => {

    assertEqual(calcular(2, 3, 'soma'), 5);

});

executarTeste('Divisao por zero deve falhar', () => {

    assertThrows(() => calcular(10, 0, 'divisao'), 'Divisao por zero nao e permitida');

});

// === RELATORIO FINAL ===

console.log('\n RELATORIO FINAL DOS TESTES:');

console.log(` Total de testes: ${testesExecutados}`);

console.log(` Passaram: ${testesPassaram}`);

console.log(`Falharam: ${testesFalharam}`);

if (testesFalharam > 0) {

    console.log('\n ATENCAO: Alguns testes falharam! O codigo precisa ser corrigido.');

    process.exit(1); // Sair com codigo de erro

} else {

    console.log('\n SUCESSO: Todos os testes passaram! O codigo esta funcionando corretamente.');

    process.exit(0); // Sair com codigo de sucesso

}
