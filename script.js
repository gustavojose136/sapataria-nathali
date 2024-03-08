document.addEventListener("DOMContentLoaded", function () {
    // Carregar dados do cache ao iniciar a página
    carregarCache();
});

function salvarCadastro() {
    const nome = document.getElementById("nome").value;
    const local = document.getElementById("local").value;
    const cor = document.getElementById("cor").value;

    // Validar se todos os campos estão preenchidos
    if (nome && local && cor) {
        const imagemInput = document.getElementById("imagem");
        const imagemFile = imagemInput.files[0];

        if (imagemFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imagemData = e.target.result;

                // Obter a lista de sapatos do cache ou inicializar uma nova lista
                const cadastrosSapatosCache = localStorage.getItem("cadastrosSapatosCache") || '[]';
                const listaSapatos = JSON.parse(cadastrosSapatosCache);

                // Adicionar novo sapato à lista
                const novoSapato = { nome, local, cor, imagemData };
                listaSapatos.push(novoSapato);

                // Salvar a lista atualizada no cache
                localStorage.setItem("cadastrosSapatosCache", JSON.stringify(listaSapatos));

                // Limpar campos de entrada
                document.getElementById("nome").value = "";
                document.getElementById("local").value = "";
                document.getElementById("cor").value = "";
                imagemInput.value = "";

                // Atualizar exibição do cache
                carregarCache();
            };

            reader.readAsDataURL(imagemFile);
        } else {
            alert("Por favor, selecione uma imagem do sapato.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function carregarCache() {
    const cadastrosSapatosCache = localStorage.getItem("cadastrosSapatosCache");

    if (cadastrosSapatosCache) {
        const listaSapatos = JSON.parse(cadastrosSapatosCache);
        const cacheDisplay = document.getElementById("cacheDisplay");

        cacheDisplay.innerHTML = "<h3 class='text-white'>Sapatos Cadastrados:</h3>";

        listaSapatos.forEach((sapato, index) => {
            cacheDisplay.innerHTML += `
                <div class="sapato col-lg-3 col-md-4 col-sm-6 text-white">
                    <p><strong>Nome:</strong> ${sapato.nome}</p>
                    <p><strong>Local:</strong> ${sapato.local}</p>
                    <p><strong>Cor:</strong> ${sapato.cor}</p>
                    <p><strong>Imagem do Sapato:</strong></p>
                    <img src="${sapato.imagemData}" alt="Imagem do Sapato">
                </div>
            `;
        });

        document.getElementById("form").style.display = "none";
        cacheDisplay.style.display = "block";
    } else {
        document.getElementById("cacheDisplay").style.display = "none";
    }

}
