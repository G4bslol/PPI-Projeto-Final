function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}


let motivoAcao = 'CADASTRAR'

const formFilhotes = document.getElementById('formFilhotes');
formFilhotes.onsubmit = validarCampos;

const urlAPI = 'http://localhost:4000/filhotes'

buscarFilhotes()

function selecionarFilhote(id, especie, raca, motivo) {
  document.getElementById('identificador').innerHTML = id
  document.getElementById('especie').value = especie
  document.getElementById('raca').value = raca

  motivoAcao = motivo;
  const botaoConfirm = document.getElementById('confirmButton')
  if (motivoAcao == 'EDITAR') {
    botaoConfirm.innerHTML = 'EDITAR'
    botaoConfirm.classList = "editar"
  } else if (motivoAcao == 'EXCLUIR') {
    botaoConfirm.innerHTML = 'EXCLUIR'
    botaoConfirm.classList = "cancelar"
  }
}

function gravarFilhote() {

  const filhoteObj = {
    especie: document.getElementById('especie').value,
    raca: document.getElementById('raca').value,
  }

  fetch(urlAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filhoteObj)

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

function excluirFilhote() {
  const filhoteObj = {
    especie: document.getElementById('especie').value,
    raca: document.getElementById('raca').value,
    id: document.getElementById('identificador').innerHTML
  }

  fetch(urlAPI, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(filhoteObj)
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

function atualizarFilhote() {
  const filhoteObj = {
    especie: document.getElementById('especie').value,
    raca: document.getElementById('raca').value,
    id: document.getElementById('identificador').innerHTML
  }

  fetch(urlAPI, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filhoteObj)

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

function buscarFilhotes() {
  fetch(urlAPI, { method: 'GET' })
    .then((res) => {
      return res.json()
    })
    .then((resAPI) => {
      if (resAPI.status == true) {
        exibirFilhotes(resAPI.listaFilhotes)
      } else {
        exibirMessage(resAPI.message, 'red')
      }
    })
    .catch((error) => {
      exibirMessage(error, 'yellow')
    })
}

function exibirFilhotes(listaFilhotes) {
  if (listaFilhotes.length > 0) {
    const espacoTabela = document.getElementById('containerTabel');
    const table = document.createElement('table');
    table.classList = "table table-striped table-hover table-dark"
    const head = document.createElement('thead');
    head.innerHTML = `
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Espécie</th>
            <th scope="col">Raça</th>
            <th scope="col">Opções</th>
        </tr>
      `;
    const body = document.createElement('tbody');
    for (const filhote of listaFilhotes) {
      const linha = document.createElement('tr');
      linha.innerHTML = `
          <td>${filhote.id}</td>
          <td>${filhote.especie}</td>
          <td>${filhote.raca}</td>
          <td>
            <button onClick="selecionarFilhote('${filhote.id}','${filhote.especie}', '${filhote.raca}', 'EDITAR')" class="btn btn-warning">Alterar</button>
            <button onClick="selecionarFilhote('${filhote.id}','${filhote.especie}', '${filhote.raca}', 'EXCLUIR')" class="btn btn-danger">Excluir</button>
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
    exibirMessage('Nenhum filhote encontrado!')
  }
}

function validarCampos(event) {

  const especie = document.getElementById('especie').value;
  const raca = document.getElementById('raca').value;

  event.stopPropagation();
  event.preventDefault();

  if (especie && raca) {
    if (motivoAcao == 'CADASTRAR') {
      gravarFilhote();
    } else if (motivoAcao == "EDITAR") {
      atualizarFilhote()
      motivoAcao = "CADASTRAR"
    } else if (motivoAcao == "EXCLUIR") {
      excluirFilhote()
      motivoAcao = "CADASTRAR"
    }

    formFilhotes.reset();
    buscarFilhotes()
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