const completeEarnings = {
  "photo-seafood-tea-house": [10000, 20000, 50000, 0, 0, 0],
  "florist-jewelry-tropical-fish": [10000, 20000, 40000, 80000, 0, 0],
  "dim-sum-laundry-take-out": [10000, 20000, 40000, 60000, 110000, 0],
  "antiques-factory-restaurant": [10000, 20000, 40000, 60000, 80000, 140000]
};

const maxTiles = {
  "photo-seafood-tea-house": 3,
  "florist-jewelry-tropical-fish": 4,
  "dim-sum-laundry-take-out": 5,
  "antiques-factory-restaurant": 6
};

let shops = [];
let selectedShopType = null;

function selectShop(element) {
  const images = document.querySelectorAll('.shop-selection img');
  images.forEach(img => img.classList.remove('selected'));
  element.classList.add('selected');
  selectedShopType = element.getAttribute('data-shop-type');

  const maxTile = maxTiles[selectedShopType];
  const tileSelectionDiv = document.getElementById('tile-selection');
  const radioButtons = tileSelectionDiv.querySelectorAll('input[type="radio"]');
  const labels = tileSelectionDiv.querySelectorAll('label');

  radioButtons.forEach((radioButton, index) => {
      if (index < maxTile) {
          radioButton.style.display = 'inline-block';
          labels[index].style.display = 'inline-block';
      } else {
          radioButton.style.display = 'none';
          labels[index].style.display = 'none';
      }
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach((radioButton) => {
        radioButton.style.display = 'none';
      });
  });

  // Deselect previously selected tile if it is greater than maxTile
  const selectedRadioButton = tileSelectionDiv.querySelector('input[type="radio"]:checked');
  if (selectedRadioButton && selectedRadioButton.value > maxTile) {
      selectedRadioButton.checked = false;
  }
}

function addShop() {
  if (!selectedShopType) {
      alert("Please select a shop type.");
      return;
  }

  const numTiles = parseInt(document.querySelector('input[name="num-tiles"]:checked').value);

  if (!numTiles || numTiles < 1 || numTiles > 6) {
      alert("Please select a valid number of tiles.");
      return;
  }

  const completeEarning = completeEarnings[selectedShopType][numTiles - 1];
  shops.push({ shopType: selectedShopType, numTiles, completeEarning });
  updateShopList();
}




function updateShopList() {
  const shopListDiv = document.getElementById('shop-list');
  shopListDiv.innerHTML = shops.map((shop, index) => {
      const shopName = document.querySelector(`img[data-shop-type="${shop.shopType}"]`).alt;
      return `<div>Shop ${index + 1}: ${shopName}, ${shop.numTiles}-tile : $${shop.completeEarning.toLocaleString()} 
      <button id="remove-${index}" class="remove-button">X</button></div>`;
  }).join('');

  // Add event listeners to the remove buttons
  shops.forEach((shop, index) => {
      const button = document.getElementById(`remove-${index}`);
      button.addEventListener('click', () => {
          shops.splice(index, 1); // Remove the shop from the array
          updateShopList(); // Update the shop list
          
      });
  });

}


function calculateTotalEarnings() {
  let totalCompleteEarnings = 0;
  let totalIncompleteEarnings = 0;

  shops.forEach(shop => {
      const incompleteEarning = shop.completeEarning * shop.numTiles / 10;
      totalCompleteEarnings += shop.completeEarning;
      totalIncompleteEarnings += incompleteEarning;
  });

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    Total Complete Earnings: <br>$${totalCompleteEarnings.toLocaleString()}<br>
  `;

  const radioButton = document.createElement('input');
  radioButton.type = 'radio';
  radioButton.name = 'shop-type';
  radioButton.value = shopType;
  radioButton.id = `shop-type-${shopType}`;
  radioButton.className = 'custom-radio-button'; // Add the class here
  
  
}
