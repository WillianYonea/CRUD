// Seleção dos Elementos
const buttonCancel = document.getElementById('cancel')
const buttonSave = document.getElementById('save')

// Método para acessar o localStorage
// Caso não tenha o a chave db_client criada, será criado um novo []
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

// Método para enviar as informações para o localStorage
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//CRUD
//Create 
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

//Read
const readClient = () => getLocalStorage()

//Update
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//Delete
const deleteClient = (index, client) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//Funções
// Verificar se os campos foram preenchidos
const isValidFields = () => {
    return document.getElementById('create').reportValidity()
}

// Limpar os campos
const clearFields =  () => {
    const fields = document.querySelectorAll('.field')
    fields.forEach(field => field.value = "")
}

// Salvar Cliente no BD
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        }

        const index = document.getElementById('name').dataset.index
        if(index == 'new'){
            createClient(client)
            updateTable()
            clearFields()
        } else {
            updateClient(index, client)
            updateTable()
        }
    }
}

// Tabela

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `<td>${client.nome}</td>
                        <td>${client.phone}</td>
                        <td>${client.email}</td>
                        <td><button type="button" id='edit-${index}' class="edit"></button></td>
                        <td><button type="button" id='delete-${index}' class="delete"></button></td>`
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}
//<img src="img/pen-solid.svg" class="nav-icons table-icons">
//<img src="img/trash-solid (1).svg" class="nav-icons table-icons">

// Função para limpar a tabela, caso contrário os dados irão se repetir
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('name').value = client.nome
    document.getElementById('phone').value = client.phone
    document.getElementById('email').value = client.email
    document.getElementById('name').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    console.log(client)
    client.index = index
    fillFields(client)
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if(action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir ${client.nome}`)
            if(response){
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

//eventos

buttonCancel.addEventListener('click', clearFields)
buttonSave.addEventListener('click', saveClient)   
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)                                                                                                                                                                                                                                                                                                                                                                                                                                                     