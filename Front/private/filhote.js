function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
  }
  
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
  }
  
  const formFilhotes = document.getElementById('formFilhotes');
  formFilhotes.onsubmit = validarCampos;
  
  const urlAPI = 'http://localhost:4000/filhotes'
  buscarFilhotes()
  
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
  
  function excluirInteressado() {
  
  }
  
  function atualizarInteressado() {
  
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
            <button class="btn btn-warning">Alterar</button>
            <button class="btn btn-danger">Excluir</button>
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
      gravarFilhote();
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