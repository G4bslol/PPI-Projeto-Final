function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

function carregarFilhotes() {

  fetch('http://localhost:4000/filhotes', { method: 'GET' })
    .then((res) => {
      return res.json()
    })
    .then((resAPI) => {
      if (resAPI.status == true) {
        const listaFilhotes = resAPI.listaFilhotes;

        const selectFilhotes = document.getElementById('filhote-select');

        selectFilhotes.innerHTML = '';

        const optionDefault = document.createElement('option');

        optionDefault.value = '';
        optionDefault.text = 'Selecione um filhote';

        selectFilhotes.appendChild(optionDefault);

        for (const filhote of listaFilhotes) {

          const option = document.createElement('option');

          option.value = filhote.raca;
          option.text = filhote.raca;

          selectFilhotes.appendChild(option);

        }

      } else {
        exibirMessage(resAPI.message, 'red')
      }
    })
    .catch((error) => {
      exibirMessage(error, 'yellow')
    })
}

let motivoAcao = 'CADASTRAR';

const formInteress = document.getElementById('formInteressado');
formInteress.onsubmit = validarCampos;

const urlAPI = 'http://localhost:4000/interessados'

buscarInteressados()
carregarFilhotes()


function selecionarInteressado(id, cpf, nome, telefone, email, motivo) {
  document.getElementById('identificador').innerHTML = id
  document.getElementById('cpf').value = cpf
  document.getElementById('nome').value = nome
  document.getElementById('telefone').value = telefone
  document.getElementById('email').value = email

  motivoAcao = motivo;
  const botaoConfirm = document.getElementById('confirmButton')
  if (motivoAcao == 'EDITAR') {
    botaoConfirm.innerHTML = 'EDITAR'
  } else if (motivoAcao == 'EXCLUIR') {
    botaoConfirm.innerHTML = 'EXCLUIR'
  }
}

function gravarInteressado() {

  const interessadoObj = {
    cpf: document.getElementById('cpf').value,
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
  }

  fetch(urlAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(interessadoObj)

  }).then((res) => {
    return res.json()
  }).then((resAPI) => {
    if (resAPI.status == true) {
      exibirMessage(resAPI.message, 'green');
    }
    else {
      exibirMessage(resAPI.message, 'red')
    }
  }).catch((error) => {
    exibirMessage(error, 'yellow')
  })
 
}

function excluirInteressado() {
  const interessadoObj = {
    cpf: document.getElementById('cpf').value,
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    id: document.getElementById('identificador').innerHTML
  }
  fetch(urlAPI, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(interessadoObj)
  }).then((res)=> {
    return res.json();
  }).then((resApi) => {
    if (resApi.status == true) {
      exibirMessage(resApi.message, 'green')
    } else {
      exibirMessage(resApi.message, 'red')
    }
  }).catch((error) => {
    exibirMessage(error, 'yellow')
  })



}

function atualizarInteressado() {
  const interessadoObj = {
    cpf: document.getElementById('cpf').value,
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    id: document.getElementById('identificador').innerHTML
  }

  fetch(urlAPI, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(interessadoObj)

  }).then((res) => {
    return res.json()
  }).then((resAPI) => {
    if (resAPI.status == true) {
      exibirMessage(resAPI.message, 'green');
    }
    else {
      exibirMessage(resAPI.message, 'red')
    }
  }).catch((error) => {
    exibirMessage(error, 'yellow')
  })

}

function buscarInteressados() {
  fetch(urlAPI, { method: 'GET' })
    .then((res) => {
      return res.json()
    })
    .then((resAPI) => {
      if (resAPI.status == true) {
        exibirInteressados(resAPI.listaInteressados)
      } else {
        exibirMessage(resAPI.message, 'red')
      }
    })
    .catch((error) => {
      exibirMessage(error, 'yellow')
    })
}

function exibirInteressados(listaInteressados) {
  if (listaInteressados.length > 0) {
    const espacoTabela = document.getElementById('containerTabel');
    const table = document.createElement('table');
    table.classList = "table table-striped table-hover table-dark"
    const head = document.createElement('thead');
    head.innerHTML = `
      <tr>
          <th scope="col">ID</th>
          <th scope="col">CPF</th>
          <th scope="col">Nome</th>
          <th scope="col">Telefone</th>
          <th scope="col">Email</th>
          <th scope="col">Opção</th>
      </tr>
    `;
    const body = document.createElement('tbody');
    for (const interessado of listaInteressados) {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${interessado.id}</td>
        <td>${interessado.cpf}</td>
        <td>${interessado.nome}</td>
        <td>${interessado.telefone}</td>
        <td>${interessado.email}</td>
        <td>
          <button onClick="selecionarInteressado('${interessado.id}','${interessado.cpf}', '${interessado.nome}', '${interessado.telefone}', '${interessado.email}', 'EDITAR')" class="btn btn-warning">Alterar</button>
          <button onClick="selecionarInteressado('${interessado.id}','${interessado.cpf}', '${interessado.nome}', '${interessado.telefone}', '${interessado.email}', 'EXCLUIR')" class="btn btn-danger">Excluir</button>
        </td>
      `;
      body.appendChild(linha);
    }
    table.appendChild(head)
    table.appendChild(body)
    espacoTabela.innerHTML = ""
    espacoTabela.appendChild(table)

  }
  else {
    exibirMessage('Nenhum cliente encontrado!')
  }
}

function validarCampos(event) {

  const cpf = document.getElementById('cpf').value;
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  event.stopPropagation();
  event.preventDefault();

  if (cpf && nome && telefone && email) {
    if (motivoAcao == 'CADASTRAR') {
      gravarInteressado();
    } else if (motivoAcao == "EDITAR") {
      atualizarInteressado()
      motivoAcao = "CADASTRAR"
    } else if (motivoAcao == "EXCLUIR") {
      excluirInteressado()
      motivoAcao = "CADASTRAR"
    }

    formInteress.reset();
    buscarInteressados()
    return true;
  } else {
    exibirMessage('Preencha todos os campos do formulário')
    return false;
  }
}

function exibirMessage(message, cor = 'white') {
  const divMessage = document.getElementById('message')

  divMessage.innerHTML = "<p style='color:" + cor + "';>" + message + "</p>"

  setTimeout(() => {
    divMessage.innerHTML = ""
  }, 5000)
}