// =========================================================
// 2. CALCULADORA BÁSICA (CÓDIGO COMPLETO)
// =========================================================

const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.calc-btn');
let currentInput = '';
let pendingOperation = null; // Armazena a operação pendente (+, -, *, /)
let firstOperand = null;     // Armazena o primeiro número da operação
let waitingForSecondOperand = false; // Sinaliza que o próximo número é o segundo operando

// FUNÇÃO DE RESET
function resetCalculator() {
    currentInput = '';
    pendingOperation = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    display.value = '0';
}

// FUNÇÃO PRINCIPAL DE CÁLCULO
function operate(num1, num2, operator) {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    if (operator === '/') {
        if (num2 === 0) {
            alert("Divisão por zero não é permitida!");
            resetCalculator();
            return 0;
        }
        return num1 / num2;
    }
    return num2; // Retorna o segundo número se a operação for nula (caso do primeiro clique em '=')
}

// FUNÇÃO QUE PROCESSA A LÓGICA DE OPERAÇÃO
function performCalculation(nextOperator) {
    const inputValue = parseFloat(currentInput);

    // Se o primeiro operando for nulo, armazena o valor atual
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (pendingOperation) {
        // Se houver uma operação pendente, realiza o cálculo
        const result = operate(firstOperand, inputValue, pendingOperation);
        
        // Limita o resultado para evitar números gigantes
        currentInput = String(result.toFixed(8).replace(/\.?0+$/, '')); 
        
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    pendingOperation = nextOperator; // Armazena a nova operação (se houver)
    display.value = currentInput;
}

// FUNÇÃO PARA LIDAR COM NÚMEROS 
function handleNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    display.value = currentInput;
}

// FUNÇÃO PARA LIDAR COM O PONTO DECIMAL
function handleDecimal(dot) {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        display.value = currentInput;
        return;
    }

    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    display.value = currentInput;
}

// EVENT LISTENER PRINCIPAL (Onde a ação é delegada)
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        const action = button.getAttribute('data-action');

        if (button.classList.contains('number') && value !== '.') {
            handleNumber(value);
        } else if (value === '.') {
            handleDecimal(value);
        } 
        
        // *************** AÇÃO DOS OPERADORES ***************
        else if (button.classList.contains('operator')) {
            if (action === 'backspace') {
                // Lógica de backspace
                currentInput = currentInput.slice(0, -1) || '0';
                display.value = currentInput;
            } else {
                // Trata +, -, *, /
                performCalculation(value); 
            }
        } 
        
        // *************** AÇÃO DO BOTÃO IGUAL (=) ***************
        else if (action === 'calculate') {
            performCalculation(null); // Passa null para forçar o cálculo
            pendingOperation = null;
            waitingForSecondOperand = false;
        } 
        
        // *************** AÇÃO DO BOTÃO LIMPAR (C) ***************
        else if (action === 'clear') {
            resetCalculator();
        }
    });
});
// =========================================================
// 3. CÁLCULO DE IMC
// =========================================================

// Função que define a classificação do IMC
function getClassificacao(imc) {
    if (imc < 18.5) return { text: "Abaixo do peso", color: "#ffc107" }; 
    if (imc >= 18.5 && imc < 24.9) return { text: "Peso normal", color: "#28a745" }; 
    if (imc >= 25 && imc < 29.9) return { text: "Sobrepeso", color: "#ffc107" }; 
    if (imc >= 30 && imc < 34.9) return { text: "Obesidade Grau I", color: "#fd7e14" }; 
    if (imc >= 35 && imc < 39.9) return { text: "Obesidade Grau II", color: "#dc3545" }; 
    if (imc >= 40) return { text: "Obesidade Grau III (Mórbida)", color: "#8b0000" }; 
    return { text: "Valor inválido", color: "#6c757d" };
}

// Função para limpar os campos e resultados do IMC
function clearIMC() {
    document.getElementById('imc-peso').value = '';
    document.getElementById('imc-altura').value = '';
    document.getElementById('imc-output').textContent = '0.00';
    document.getElementById('imc-classificacao').textContent = '';
    document.getElementById('imc-classificacao').style.color = '';
}

// Event listener para o botão "Calcular IMC"
document.getElementById('imc-btn').addEventListener('click', function() {
    const pesoElement = document.getElementById('imc-peso');
    const alturaElement = document.getElementById('imc-altura');
    const outputElement = document.getElementById('imc-output');
    const classificacaoElement = document.getElementById('imc-classificacao');

    const peso = parseFloat(pesoElement.value);
    const altura = parseFloat(alturaElement.value);

    // Validação de entrada
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        outputElement.textContent = '0.00';
        classificacaoElement.textContent = 'Preencha Peso e Altura corretamente.';
        classificacaoElement.style.color = '#dc3545';
        return;
    }

    // Cálculo principal do IMC: Peso / (Altura * Altura)
    const imc = peso / (altura * altura);
    const classificacao = getClassificacao(imc);

    // Atualiza o display
    outputElement.textContent = imc.toFixed(2);
    classificacaoElement.textContent = 'Classificação: ' + classificacao.text;
    classificacaoElement.style.color = classificacao.color;
});

// Event listener para o botão "Limpar" do IMC
document.getElementById('imc-clear-btn').addEventListener('click', clearIMC);


// =========================================================
// 4. FUNCIONALIDADE DO BOTÃO "SAIR" (LOGOUT)
// =========================================================

document.getElementById('logout-btn').addEventListener('click', function() {
    alert('Sessão encerrada com sucesso.');
    window.location.href = 'index.html'; 
});