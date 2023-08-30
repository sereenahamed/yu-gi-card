const api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const cardsPerPage = 20;
let currentPage = 1;

const nextPageButton = document.getElementById('nextPageButton');
const prevPageButton = document.getElementById('prevPageButton');

nextPageButton.addEventListener('click', () => {
  currentPage++;
  getCard(currentPage);
});

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getCard(currentPage);
  }
});

async function getCard(page) {
  try {
    const offset = (page - 1) * cardsPerPage;
    const response = await fetch(`${api_url}?race=aqua&num=${cardsPerPage}&offset=${offset}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const cardcontainer = document.getElementById('container');
    cardcontainer.innerHTML = '';

    for (const card of data.data) {
      const carddiv = document.createElement('div');
      carddiv.classList.add('yu-gi-card');
      carddiv.innerHTML = `
        <div class="imgcard">
          <img src="${card.card_images[0].image_url_small}" alt="${card.name}">
        </div>
        <div class="contentcard">
          <h2>${card.name}</h2>
          <h5>${card.type}</h5>
          <p>${card.desc}</p>
        </div>
      `;
      cardcontainer.appendChild(carddiv);
      carddiv.addEventListener('click', () => {
        openCardModal(card);
      });
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getCard(currentPage);


function openCardModal(card) {
  const modal = `
    <div class="modal fade" id="cardModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${card.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src="${card.card_images[0].image_url}" alt="${card.name}" class="modal-image">
            <p>${card.desc}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = modal;

  const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));
  cardModal.show();
}

function myeventFunction (){
  alert("It dosent Work now :(");
}


function darkMode(){

  const butt = document.getElementById('dark-button');
  let isDarkMode = false;
  let originalBackgroundColor = document.body.style.backgroundColor;
  
  butt.addEventListener('click', () => {
    if (isDarkMode) {
      document.body.style.backgroundColor = originalBackgroundColor;
    } else {
      originalBackgroundColor = document.body.style.backgroundColor; 
      document.body.style.backgroundColor = " #213555"; 
    }
    
    isDarkMode = !isDarkMode; 
  });
  
}
darkMode();












