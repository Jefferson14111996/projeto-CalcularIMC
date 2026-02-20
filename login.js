// Funcionalidade de Toggle da Senha (Reaproveitada do script.js)
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

// Funcionalidade de Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Pega os valores inseridos pelo usuário
    const emailInput = document.getElementById('login-email').value.trim();
    const passwordInput = document.getElementById('login-senha').value.trim();

    // *********************************************************
    // ALTERAÇÃO: LÓGICA PARA PERMITIR QUALQUER LOGIN
    // *********************************************************

    // Verifica se os campos de E-mail e Senha não estão vazios.
    // Qualquer valor preenchido será aceito.
    if (emailInput !== "" && passwordInput !== "") {
        
        // Login BEM-SUCEDIDO (qualquer dado inserido)
        // Redireciona diretamente para a página Home
        window.location.href = 'home.html'; 
        
    } else {
        // Falha no login (campos vazios)
        alert("Erro no login. Por favor, preencha seu e-mail e senha.");
    }
});

// =========================================================
// 2. MOSTRAR/ESCONDER SENHA (Mantido do código anterior)
// =========================================================

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const passwordInput = document.getElementById('login-senha'); // ID do campo de senha
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});