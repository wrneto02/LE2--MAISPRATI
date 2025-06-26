const prompt= require('prompt-sync')()
qst = prompt("Digite a questão que desejar ver:  ")

switch (qst){
    case "1": {
        let dia,mes,ano;
        console.log("Questão 1 : Validação de Datas:\nInforme dia, mês e ano. Verificar se é uma data válida considerando anos bissextos.")
        let data = prompt(`Digite a data ("26/08/2002"): `)
        if (data === null){
            console.log("Usuário não terminou de digitar a data")
        } else{
        dia = Number(data.slice(0,2))
        mes = Number(data.slice(3,5))
        ano = Number(data.slice(6,10))
        } 
            function bissexto(ano){
                if (ano % 4 === 0){
                    if (ano % 100 === 0 && ano % 400 !== 0){
                        return false
                    }
                    return true
                }
                return false
            }
            function ehDataValida(dia,mes,ano){
                if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
                    return false;
                }
                if (ano < 1){
                    return false
                }
                if (dia < 1 || dia > 31){
                    return false
                }
                else if (mes < 1 || mes > 12){
                    return false
                }
                else if (mes === 4 || mes === 6 || mes === 9 || mes === 11){
                    if (dia > 30 ){
                        return false
                    }
                }
                else if (mes === 2){
                    if (dia > 29 ){
                        return false
                    }
                    if (!(bissexto(ano))){
                       if (dia > 28){
                        return false
                       }

                    }
                }
                return true               
            }
            console.log(ehDataValida(dia,mes,ano))
            break
    }
    case "2": {
        console.log("Questão 2 : Jogo de Adivinhação:\nAdivinhe o número de 1 a 100. O jogo dirá se é mais alto ou mais baixo.")
        console.log("Será gerado um número de 1 a 100 e sua missão é encontrá-lo:")
        let tentativas = 1
        let chute = 0
        let numero = parseInt(Number(Math.random() * 100)) + 1
        do {
            chute = Number(prompt("Adivinhe: "))
            if (isNaN(chute)) {
                console.log("Digite um número válido, por favor")
                continue;
            }
            if (chute < numero){
                tentativas++
                console.log("Mais alto!")
            }
            if (chute > numero){
                tentativas++
                console.log("Mais baixo!")
            }
        } while(chute !== numero)
            if(tentativas === 1){
                console.log("Acertou de primeira!")
            } else {
            console.log(`Acertou em ${tentativas} tentativas`)
            }
            break
    }
    case "3": {
        console.log("Questão 3 : Palavras Únicas:\nDigite uma frase e veja quais são as palavras únicas nela.")
        let frase = prompt("Digite a frase: ")
        let palavrasUnicas = []
        let palavra = ""
        let delimitadores = " ,.;:/-(){}[]!?"
        for (let i = 0; i < frase.length;i++){
            if (delimitadores.includes(frase[i])){
                if (palavra.length > 0){
                    verSeEUnica(palavra.toLowerCase(), palavrasUnicas)
                    palavra = ""
                }
            }
            else {
                palavra += frase[i]
            }
        }
        function verSeEUnica(a,b){
            if (a.length === 0) {
                return;
            }

            let existe = false;
            for (let j = 0; j < b.length; j++) {
                if (b[j] === a) { 
                    existe = true;
                    break;
                }
            }
            if (!existe) {
                b.push(a);
            }
        }
        if (palavra.length > 0){
            verSeEUnica(palavra.toLowerCase(),palavrasUnicas)
        }
        console.log(palavrasUnicas)
        break
    }
    case "4": {
        console.log("Questão 4 : Fatorial Recursivo:\nInforme um número inteiro para calcular o fatorial de forma recursiva.")
        let n = parseInt(prompt("Digite o valor que deseja descobrir o fatorial: "))
        function fatorial(n){  
                  
          if (n < 0) {
            return "Fatorial não é definido para números negativos"
          }
          if (n === 0 || n === 1){
            return 1
          }
          return n * fatorial(n - 1)
          
        }
        console.log(`O fatorial de ${n} é igual a ${fatorial(n)}`)
        break
    }
    case "5": {
        console.log("Questão 5 : Debounce:\nClique rapidamente no botão. A função só executa após você parar de clicar por alguns milissegundos.")
        console.log("Essa é a função debounce")
        // Nós utilizamos ela para diversas coisas, como para otimizar a aplicação, quando um usuário clica em um botão várias vezes
        // a debounce funciona para n rodar a aplicação várias vezes e sim somente uma
        function debounce(fn,delay){
            let timeoutId
            return function() {
                if (timeoutId){
                    clearTimeout(timeoutId)
                }
                timeoutId = setTimeout(() => {
                    fn.apply(this, arguments)
                }, delay)
            }
            
        }
        function mostrarDigitacao(textoDigitado) {
            console.log(`[${new Date().toLocaleTimeString()}] Você está digitando: "${textoDigitado}"`)
        }
        const DigitacaoDebounced = debounce(mostrarDigitacao, 500)
        console.log("\n--- Simulação de Digitação Rápida ---")
        DigitacaoDebounced("R")
        setTimeout(function() { DigitacaoDebounced("R"); }, 100)
        setTimeout(function() { DigitacaoDebounced("Re"); }, 200)
        setTimeout(function() { DigitacaoDebounced("Reg "); }, 300)
        setTimeout(function() { DigitacaoDebounced("Regi"); }, 400)
        setTimeout(function() { DigitacaoDebounced("Regin"); }, 500)
        setTimeout(function() { DigitacaoDebounced("Reginal"); }, 600)
        setTimeout(function() { DigitacaoDebounced("Reginald"); }, 700)
        setTimeout(function() { DigitacaoDebounced("Reginaldo"); }, 800)

        console.log("\n-> Note que 'Você está digitando: \"Reginaldo\"' deve aparecer cerca de 500ms (que foi o delay escolhido) após a última chamada.");
        console.log("Todos os 'R', 'Reg', 'Reginal', etc. foram ignorados pelo debounce.");
    break
    }
    case "6": {
        console.log("Questão 6 : Memoization:\nCalcula fatorial com cache. Teste com o mesmo número e veja a diferença de desempenho.")
        function memoize(fn) {
            let cache = {}
            return function(...args) {
                const key = JSON.stringify(args)
                if (cache[key]){
                    return cache[key]
                }
                let resultado = fn(...args)
                cache[key] = resultado
                return resultado
            }
        }
        function fibonacci(a){
            let resultado = 0
            if (a === 0 || a === 1){
                resultado = a
            } 
            else {
                return fibonacciMemoize(a - 1) + fibonacciMemoize(a - 2)
            }
            return resultado
        }
        const fibonacciMemoize = memoize(fibonacci)
        console.log("Usarei o fibonacci como exemplo da função memoize")
        numero = parseInt(prompt("Digite o valor que deseja saber o fibonacci: "))
        console.log(`O valor do fibonacci para ${numero} é ${fibonacciMemoize(numero)}.`)
        break
        }
        case "7": {
            console.log("Questão 7 : Mapeamento e Ordenação:\nInforme uma lista de produtos com nome e preço. O sistema retorna os nomes ordenados pelo preço.")
            let produtos = JSON.parse(prompt("Digite o conjunto de objetos: "))
            function ordenar(produtos){
                let produtosCertos = produtos.slice().sort((a,b) => a.preco - b.preco)
                let certo = produtosCertos.map(produtos => produtos.nome)
                return certo
            }
            console.table(ordenar(produtos))
        break
        }
        case "8": {
            console.log("Questão 8 : Agrupamento por Propriedade:\nInforme uma lista de vendas (cliente e total). O sistema soma os totais por cliente.")
            let vendas = JSON.parse(prompt("Digite as suas vendas: "))
            function vendasSomadas(vendas) {
                let vendaTotalPorCliente = vendas.reduce(function(acumulador, vendaAtual) {
                    let cliente = vendaAtual.cliente
                    let valor = vendaAtual.total
                    if (acumulador[cliente]){
                        acumulador[cliente] += valor
                    } else{
                        acumulador[cliente] = valor
                    }
                        return acumulador
                }, {})
                return vendaTotalPorCliente
            }
            console.table(vendasSomadas(vendas))
        break
        }
        case "9": {
            console.log("Questão 9 : Conversão Entre Formatos:\nTransforma um array de pares em objeto e vice-versa.")
            let arrayDePares = JSON.parse(prompt("Digite a lista de pares: "))
            let arrayDeObjetos = JSON.parse(prompt("Digite a lista de objetos: "))
            function paresParaObjeto(pares){
                let objetos = {}
                for (let i = 0; i < pares.length;i++){
                    objetos[pares[i][0]] = pares[i][1]
                }
                return objetos
            }
            
            function objetoParaPares(objeto){
                let pares = []
                for (let chave in objeto){
                    pares.push([chave,objeto[chave]])
                }
                return pares
            }
            console.table(paresParaObjeto(arrayDePares))
            console.table(objetoParaPares(arrayDeObjetos))
        }
            
}

    

