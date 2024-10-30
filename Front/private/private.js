function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
}

// Função para fechar a sidebar
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

function carregarFilhotes() {
  fetch(urlBase + '/filhotes').then((resposta) => {

    return resposta.json();

  }).then((filhote) => {
    const selectFilhotes = document.getElementById('filhote-select');

    selectFilhotes.innerHTML = '';

    const optionDefault = document.createElement('option');

    optionDefault.value = '';
    optionDefault.text = 'Selecione um filhote';

    selectFilhotes.appendChild(optionDefault);

    for (let i = 0; i < filhote.length; i++) {

      const option = document.createElement('option');

      option.value = filhote[i].nome;
      option.text = filhote[i].nome;

      selectFilhotes.appendChild(option);

    }
  }).catch((erro) => {
    console.error('Erro:', erro.message);
  })
}



const formInteress = document.getElementById('formInteressado');
formInteress.onsubmit = validarCampos;

// const urlAPI = 'http://localhost:4000/interessados'


function gravarInteressado() {

  const interessado = {
    cpf: document.getElementById('cpf').value,
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value
  }

  // fetch(urlAPI, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(interessado)

  // }).then((res)=> {
  //   return res.json()
  // }).then((resAPI)=> {
  //   if(resAPI.status == true) {
  //     exibirMessage(resAPI.message, 'green');
  //   }
  //   else {
  //     exibirMessage(resAPI.message, 'red')
  //   }
  // }).catch((error) => {
  //   exibirMessage(error, 'yellow')
  // })

}

function excluirInteressado() {

}

function atualizarInteressado() {

}

function buscarInteressados() {

}

function validarCampos(event) {

  const cpf = document.getElementById('cpf').value;
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  event.stopPropagation();
  event.preventDefault();

  if (cpf && nome  && telefone && email) {
    gravarInteressado()
    return true;
  } else {
    exibirMessage('Preencha todos os campos do formulário')
    return false;
  }
}

function exibirMessage(message, cor = 'white') {
  const divMessage = document.getElementById('message')

  divMessage.innerHTML = "<p style='color:"+ cor +";>" + message + "</p>"

  setTimeout(() => {
    divMessage.innerHTML = ""
  }, 5000)
}

function exibirInteressados() {

}