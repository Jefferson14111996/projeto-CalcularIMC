// =========================================================
// SCRIPT.JS - LÓGICA DA TELA DE REGISTRO
// =========================================================

// =========================================================
// 1. FUNCIONALIDADE DO BOTÃO DE VOLTAR
// =========================================================

// Pega o botão "Voltar" usando o ID 'back-to-login-btn'
const backButton = document.getElementById('back-to-login-btn'); 

if (backButton) {
    backButton.addEventListener('click', function() {
        // Redireciona o usuário para a página de login
        window.location.href = 'index.html'; 
    });
}


// =========================================================
// 2. MOSTRAR/ESCONDER SENHA
// =========================================================

// Adiciona a funcionalidade de clique a todos os ícones de olho
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


// =========================================================
// 3. LIMPAR E VALIDAR FORMULÁRIO
// =========================================================

const registrationForm = document.getElementById('registration-form');

// Ação do botão "Limpar"
document.getElementById('clear-btn').addEventListener('click', function() {
    // A função .reset() limpa todos os campos dentro do formulário com o ID 'registration-form'
    if (registrationForm) {
        registrationForm.reset();
        alert('Os campos do formulário foram limpos.');
    }
});

// Validação e Ação do botão "Registrar"
if (registrationForm) {
    registrationForm.addEventListener('submit', function(event) {
        // Previne o envio padrão (para rodar a validação JS)
        event.preventDefault();

        // Captura e limpeza de espaços em branco (trim)
        const nome = document.getElementById('nome')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const confirmEmail = document.getElementById('confirm-email')?.value.trim();
        const senha = document.getElementById('senha')?.value;
        const confirmarSenha = document.getElementById('confirmar-senha')?.value;

        // Opcional, mas limpa espaços
        const sobrenome = document.getElementById('sobrenome')?.value.trim(); 
        const cpf = document.getElementById('cpf')?.value.trim(); 
        const rg = document.getElementById('rg')?.value.trim(); 
        
        let isValid = true;

        // A. Validar preenchimento obrigatório: Nome
        if (!nome || nome === '') {
            alert('O campo Nome é obrigatório.');
            document.getElementById('nome').focus();
            isValid = false;
            return;
        }
        
        // B. Validar E-mail
        if (!email || email === '') {
             alert('O campo E-mail é obrigatório.');
             document.getElementById('email').focus();
             isValid = false;
             return;
        }
        
        if (email !== confirmEmail) {
            alert('Os e-mails não coincidem.');
            document.getElementById('email').focus();
            isValid = false;
            return;
        }

        // C. Validar Senha
        if (!senha || senha === '') {
             alert('O campo Senha é obrigatório.');
             document.getElementById('senha').focus();
             isValid = false;
             return;
        }
        
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            document.getElementById('senha').focus();
            isValid = false;
            return;
        }
        
        // D. Outras validações (Ex: verificar se Senha tem tamanho mínimo)
        if (senha.length < 6) {
             alert('A senha deve ter no mínimo 6 caracteres.');
             document.getElementById('senha').focus();
             isValid = false;
             return;
        }

        // --- REGISTRO BEM-SUCEDIDO (Simulação) ---
        if (isValid) {
            // Em um projeto real, aqui você faria o POST/fetch para o servidor.
            alert('Registro concluído com sucesso! Redirecionando para a tela de Login.');
            window.location.href = 'login.html';
        }
    });
}