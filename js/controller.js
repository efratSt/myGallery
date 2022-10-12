'use strict'
console.log('Starting up');

function onInit() {
    
    renderGrids()
    renderPortfolio()
}

function renderGrids() {
    var projs = getProjs()
    var strHTML = projs.map(proj => `
    <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="${proj.img}" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div>
    `)

    document.querySelector('.grigPortfolio').innerHTML = strHTML.join('')
}

function renderPortfolio() {
    var projs = getProjs()
    var strHTML = projs.map(proj => `<div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="close-modal" data-dismiss="modal">
        <div class="lr">
          <div class="rl"></div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="modal-body">
              <!-- Project Details Go Here -->
              <h2>${proj.name}</h2>
              <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
              <p>${proj.desc}</p>
              <ul class="list-inline">
                <li>Date: ${proj.publishedAt}</li>
                <li>Client: </li>
                <li>Category: ${proj.title}</li>
              </ul>
              <button><a href="${proj.url}">Try me</a></button>
              <br><br>
              <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>`)
  document.querySelector('.modalPortfolios').innerHTML = strHTML.join('')
}

function onSend(ev) {
    ev.preventDefault()
    var email = document.querySelector('.E-mail').value
    var subject = document.querySelector('.subject').value
    var msg = document.querySelector('.msg').value
    console.log(email);
    console.log(subject);
    console.log(msg);

    openCanvas()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${msg}`)
}