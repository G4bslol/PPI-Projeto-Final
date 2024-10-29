function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
}

// Função para fechar a sidebar
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

const urlBase = "http://localhost:4000"

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
