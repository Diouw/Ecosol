// Exemplo de uso do localStorage com os métodos setItem, push, stringify, parse e filter para cadastro de pacientes

// Criar uma lista vazia de pacientes
var listaPessoas = []; //Comando que cria uma variável listaPessoas e a inicializa como um array vazio. Essa variável é usada para armazenar a lista de pacientes cadastrados.
var count = 1;

// Função para adicionar um novo paciente
function addPessoa(nome, valor, email, estado, projeto) {
  var newPessoa = { id: count++, nome: nome, valor: valor, email:email, estado:estado, projeto:projeto }; //cria um novo objetivo de paciente (newPessoa), com as propriedades id, nome e valor
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
    pesquisar();
  } else {
    alert('Paciente não encontrado.');
  }
}

function exclui(){
  var listaVazia = [];
  listaPessoas = listaVazia;
  localStorage.setItem('listaPessoas', JSON.stringify(listaPessoas));
  renderlistaPessoas(); 
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
  var emailInput = document.getElementById('email');
  var estadoInput = document.getElementById('estado');
  var projetoInput = document.getElementById('projeto');

  if(estadoInput.value == '' && projetoInput.value == ''){
    alert('Selecione os campos de estado e de projeto');
  }
  else if(estadoInput.value == ''){
    alert('Selecione o campo de estado');
  }
  else if(projetoInput.value == ''){
    alert('Selecione o campo de projeto');
  }
  else{
    alert('Cadastro realizado!');
    addPessoa(nomeInput.value, parseInt(valorInput.value), emailInput.value, estadoInput.value, projetoInput.value);
  }
});

function limparCampos (){
  var nomeInput = document.getElementById('nome');
  var valorInput = document.getElementById('valor');
  var emailInput = document.getElementById('email');
  var estadoInput = document.getElementById('estado');
  var projetoInput = document.getElementById('projeto');
  nomeInput.value = '';
  valorInput.value = '';
  emailInput.value = '';
  estadoInput.value = '';
  projetoInput.value = '';
} 



function addData(){
    const date = new Date();
    let data = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return data;
}

function toggleRegistros(){
    var lista = document.getElementById("registros");
    var botao = document.querySelector(".botaoRegistros");

    if (lista.style.display === "none" || lista.style.display === "") {
        lista.style.display = "flex"; // Mostra a lista se estiver oculta
        botao.textContent = "Fechar Registros";
    } else {
        lista.style.display = "none"; // Oculta a lista se estiver visível
        botao.textContent = "Mostrar Registros";
    }
}

function pesquisar() {
  var checkboxes = document.querySelectorAll('input[type="radio"]:checked'); // Obtém todos os checkboxes marcados
  var inputValor = document.getElementById('inputPesquisa').value.toLowerCase(); // Obtém o valor do campo de pesquisa em letras minúsculas

  var criterios = Array.from(checkboxes).map(function(checkbox) {
    return checkbox.value; // Obtém os valores dos checkboxes marcados
  });

  var resultados;
 
  if (criterios.includes('nome')) {
    resultados = listaPessoas.filter(function (pessoa) {
      return pessoa.nome.toLowerCase().includes(inputValor); // Realiza a pesquisa pelo nome
    });
  } 
  else if (criterios.includes('email')) {
    resultados = listaPessoas.filter(function (pessoa) {
      return pessoa.email.toLowerCase().includes(inputValor); // Realiza a pesquisa pelo email
    });
  }
  else if (criterios.includes('valor')) {
    resultados = listaPessoas.filter(function (pessoa) {
      return pessoa.valor.toString().includes(inputValor); // Realiza a pesquisa pelo email
    });
  }


  renderizarResultados(resultados); // Renderiza os resultados da pesquisa
}



function renderizarResultados(resultados) {
  var listaPessoasElement = document.getElementById('listaPessoas');
  listaPessoasElement.innerHTML = ''; // Limpa o conteúdo HTML do elemento listaPessoasElement

  resultados.forEach(function (pessoa) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="listaPessoas">' + addData() + ' - ' + pessoa.nome + '</span> (Valor da conta: ' + pessoa.valor + ') <button class="delete-button" onclick="excluiPessoa(' + pessoa.id + ')">Excluir</button>';
    listaPessoasElement.appendChild(listItem);
  });
}
