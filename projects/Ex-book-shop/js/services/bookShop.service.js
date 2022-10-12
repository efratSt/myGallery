'use strict'

const STORAGE_KEY = 'bookDB'
var id = 1
var gBooks
const PAGE_SIZE = 9
var gPageIdx = 0
var gMode = {table: true, cards: false}
var gFilterBy = {minPrice: 0, minRate: 0, txt:''}

createBooks()

function createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    gMode = loadFromStorage('mode')
    if (!books || !books.length) {
        books = [
            {
                id: getRandomInt(1, 100),
                title: 'Learning Laravel',
                price: 18.90,
                rate: 0,
            },
            {
                id: getRandomInt(1, 100),
                title: 'Beginning with Laravel',
                price: 6.65,
                rate: 0,
            },
            {
                id: getRandomInt(1, 100),
                title: 'Java for developers',
                price: 7.20,
                rate: 0,
            },
        ]

    }
    gBooks = books
    _saveBooksToStorage()
}


function getBooks() {
    var books = gBooks.filter(book => book.price >= gFilterBy.minPrice && book.rate >= gFilterBy.minRate)
    books = books.filter(book => book.title.toLowerCase().includes(gFilterBy.txt.toLowerCase()))


    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function createBook(bookName, price) {
    gBooks.push({
        id: getRandomInt(1, 100),
        title: bookName,
        price,
        rate: 0
    })
    _saveBooksToStorage()

}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => +bookId === +book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {

    const book = gBooks.find(book => book.id === +bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}


function addRatePlus(bookId) {
    var book = gBooks.find(book => book.id === +bookId)
    if (book.rate === 10) return
    book.rate++
    _saveBooksToStorage()
}

function addRateMinus(bookId) {
    var book = getBookById(bookId)
    if (book.rate === 0) return
    book.rate--
    _saveBooksToStorage()
}


function getBookById(bookId) {
    var book = gBooks.find(book => book.id === +bookId)
    return book
}

function setBookSort(sotrBy = {}) {
    if (sotrBy.minPrice !== undefined) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sotrBy.minPrice)
    } else if (sotrBy.minRate !== undefined) {
        gBooks.sort((b1, b2) => (b1.rate - b2.rate) * sotrBy.minRate)
    }
}

function setBookFilter(filterBy = {}) {
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}

function setFilterByText(txt) {
    gFilterBy.txt = txt
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getMode() {
    return gMode
}

function tableMode() {
    gMode.table = true
    gMode.cards = false
    saveToStorage('mode', gMode)
}

function cardsMode() {
    gMode.table = false
    gMode.cards = true
    saveToStorage('mode', gMode)
}