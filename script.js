// Exemplo de uso do localStorage com os métodos setItem, push, stringify, parse e filter para cadastro de pacientes

// Criar uma lista vazia de pacientes
var listaPessoas = []; //Comando que cria uma variável listaPessoas e a inicializa como um array vazio. Essa variável é usada para armazenar a lista de pacientes cadastrados.
var count = 1;

// Função para adicionar um novo paciente
function addPessoa(nome, valor) {
  var newPessoa = { id: count++, nome: nome, valor: valor }; //cria um novo objetivo de paciente (newPessoa), com as propriedades id, nome e valor
  listaPessoas.push(newPessoa); //comando que adiciona o novo paciente ao final da lista de pacientes
  localStorage.setItem('listaPessoas', JSON.stringify(listaPessoas)); //o JSON.stringfy converte o objeto JavaScript em uma string JSON
  renderlistaPessoas();
}

// Função para excluir um paciente
function excluiPessoa(pessoaId) {
  var updatedlistaPessoas = listaPessoas.filter(function (pessoa) {
    return pessoa.id !== pessoaId; //retorna todos os elementos que não sejam no ID selecionado
  });

  if (updatedlistaPessoas.length < listaPessoas.length) { //verifica se a lista atualizada é diferente da lista original
    listaPessoas = updatedlistaPessoas;
    localStorage.setItem('listaPessoas', JSON.stringify(listaPessoas)); 
    renderlistaPessoas();
  } else {
    alert('Paciente não encontrado.');
  }
}

// Função para recuperar a lista de pacientes do localStorage
function getlistaPessoas() {
  var storedList = JSON.parse(localStorage.getItem('listaPessoas')); //converte a string JSON para objeto JavaScript
  listaPessoas = storedList || []; //se storedList for um valor válido (não seja nulo ou indefinido). é atribuido a listaPessoas. Caso contrário, listaPessoas recebe um array vazio
}

// Função para renderizar a lista de pacientes no HTML
function renderlistaPessoas() {
  var listaPessoasElement = document.getElementById('listaPessoas');
  listaPessoasElement.innerHTML = ''; //limpa o conteúdo HTML do elemento listaPessoasElement

  listaPessoas.forEach(function (pessoa) {
    var listItem = document.createElement('li');
    //renderiza a lista de pacientes. Itera sobre cada paciente na lista encontrada e cria um <li> para cada paciente
    listItem.innerHTML = '<span class="listaPessoas">' +addData() +' - '+ pessoa.nome + '</span> (Valor da conta: ' + pessoa.valor + ') <button class="delete-button" onclick="excluiPessoa(' + pessoa.id + ')">Excluir</button>';
    listaPessoasElement.appendChild(listItem);
  });
}

// Recuperar a lista de pacientes do localStorage
getlistaPessoas();

// Renderizar a lista de pacientes no HTML
renderlistaPessoas();

// Event listener para o formulário de cadastro de pacientes
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  var nomeInput = document.getElementById('nome');
  var valorInput = document.getElementById('valor');
  addPessoa(nomeInput.value, parseInt(valorInput.value));
  nomeInput.value = '';
  valorInput.value = '';
});

function addData(){
    const date = new Date();
    let data = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return data;
}

function toggleRegistros(){
    var lista = document.getElementById("registros");
    var botao = document.querySelector(".botaoRegistros");

    if (lista.style.display === "none" || lista.style.display === "") {
        lista.style.display = "block"; // Mostra a lista se estiver oculta
        botao.textContent = "Fechar Registros";
    } else {
        lista.style.display = "none"; // Oculta a lista se estiver visível
        botao.textContent = "Mostrar Registros";
    }
}