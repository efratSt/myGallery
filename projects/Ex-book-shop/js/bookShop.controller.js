function onInit() {
    renderBooks()
}
function renderBooks() {
    var books = getBooks()

    var mode = getMode()

    var strHTML = ``
    if (mode.table === true) {
        strHTML = `<table >
    <thead>
        <th colspan="1">Id</th>
        <th colspan="1">Title</th>
        <th colspan="1">Price</th>
        <th colspan="3">Actions</th>
        <th colspan="3">Rate</th>
    </thead>
    <tbody>`

        var a = books.map(book => `<tr>
    <td class="id">${book.id}</td>
    <td class="title">${book.title}</td>
    <td class="price">${book.price}</td>
    <td class="read"><button class="btn" onclick="onRead(${book.id})">Read</button></td>
    <td class="update"><button class="btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
    <td class="delete"><button class="btn" onclick="onDeleteBook('${book.id}')">Delete</button></td>
    <td class="rate"><button class="btn-rate" onclick="onAddRatePlus('${book.id}')">+</button> <span class="inRate">${book.rate}</span> <button class="btn-rate" onclick="onAddRateMinus('${book.id}')">-</button></td>
    </tr>`
        )

        a = a.join('')
        strHTML += a + `</tbody>
    </table>`
    } else {
        strHTML = books.map(book => `
        <div class="card">
            <h2 class="title-card">Title: ${book.title}</h2>
            <h3 class="price-card">Price: ${book.price}</h3>
            <h4 class="id-card">Id: ${book.id}</h4>
            <button class="btn read-card" onclick="onRead(${book.id})">Read</button>
            <button class="btn update-card" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="btn delete-card" onclick="onDeleteBook('${book.id}')">Delete</button> <br>
            <button class="btn-rate" onclick="onAddRatePlus('${book.id}')">+</button> <span class="inRate">${book.rate}</span> <button class="btn-rate" onclick="onAddRateMinus('${book.id}')">-</button>
        </div>
        `)
        strHTML = strHTML.join('')
    }
    document.querySelector('.container').innerHTML = strHTML


    // strHTML = ''
}

function onEddBook() {
    var bookName = prompt('Please enter the title of the book')
    var price = +prompt('Please enter the title of the book')
    createBook(bookName, price)
    renderBooks()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Please enter the new price of the book')
    updateBook(bookId, newPrice)
    renderBooks()
}

function onAddRatePlus(bookId) {
    addRatePlus(bookId)
    renderBooks()
}

function onAddRateMinus(bookId) {
    addRateMinus(bookId)
    renderBooks()
}

function onRead(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('p').innerText = makeLorem()
    elModal.classList.add('open')
    renderBooks()
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
    renderBooks()
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    var isDesc = document.querySelector('.sort-desc').checked

    const sotrBy = {
        [prop]: (isDesc) ? -1 : 1
    }

    setBookSort(sotrBy)
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
}

function onSetFilterByText(txt) {
    setFilterByText(txt)
    renderBooks()
}

function onNextPage() {
    nextPage()
    renderBooks()
}

function onTableMode() {
    tableMode()
    renderBooks()
}

function onCardsMode() {
    cardsMode()
    renderBooks()
}