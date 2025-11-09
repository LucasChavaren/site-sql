document.addEventListener("DOMContentLoaded", () => {

    // 🔹 Carrega os dados do localStorage (se existirem)
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [
        { nome: "João Pedro", idade: 21, tempo: "2 anos" },
        { nome: "Larissa", idade: 28, tempo: "4 anos" },
        { nome: "Augusto", idade: 25, tempo: "3 anos" },
        { nome: "Matheus", idade: 27, tempo: "6 anos" }
    ];

    // 🔹 Atualiza a tabela com os dados atuais
    function selectFuncionarios() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = `
            <tr>
                <th>Funcionário</th>
                <th>Idade</th>
                <th>Tempo trabalhando na empresa</th>
            </tr>
        `;

        funcionarios.forEach(func => {
            tabela.innerHTML += `
                <tr>
                    <td>${func.nome}</td>
                    <td>${func.idade}</td>
                    <td>${func.tempo}</td>
                </tr>
            `;
        });
    }

    // 🔹 Salva no localStorage
    function salvarDados() {
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    }

    // 🔹 Adicionar funcionário
    window.insertFuncionario = function() {
        const nome = prompt("Nome do funcionário:");
        const idade = prompt("Idade:");
        const tempo = prompt("Tempo de empresa:");

        if (nome && idade && tempo) {
            funcionarios.push({ nome, idade: Number(idade), tempo });
            salvarDados(); // salva permanentemente
            selectFuncionarios();
            alert("Funcionário adicionado com sucesso!");
        } else {
            alert("Preencha todos os campos.");
        }
    };

    // 🔹 Atualizar funcionário
    window.updateFuncionario = function() {
        const nome = prompt("Digite o nome do funcionário que deseja alterar:");
        const funcionario = funcionarios.find(f => f.nome.toLowerCase() === nome.toLowerCase());

        if (funcionario) {
            const novaIdade = prompt("Nova idade:", funcionario.idade);
            const novoTempo = prompt("Novo tempo de empresa:", funcionario.tempo);

            funcionario.idade = novaIdade || funcionario.idade;
            funcionario.tempo = novoTempo || funcionario.tempo;

            salvarDados();
            selectFuncionarios();
            alert("Funcionário atualizado!");
        } else {
            alert("Funcionário não encontrado.");
        }
    };

    // 🔹 Excluir funcionário
    window.deleteFuncionario = function() {
        const nome = prompt("Digite o nome do funcionário que deseja excluir:");
        const index = funcionarios.findIndex(f => f.nome.toLowerCase() === nome.toLowerCase());

        if (index !== -1) {
            funcionarios.splice(index, 1);
            salvarDados();
            selectFuncionarios();
            alert("Funcionário excluído com sucesso!");
        } else {
            alert("Funcionário não encontrado.");
        }
    };

    // 🔹 Listar funcionários (opcional)
    window.selectFuncionarios = selectFuncionarios;

    // 🔹 Monta a tabela ao carregar o site
    selectFuncionarios();

});
