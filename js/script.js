// input field and search button 
const searchButton = () => {
  document.getElementById('spinner').style.display = 'block';
  const inputValue = document.getElementById('input-field').value;
  loadApiResult(inputValue);
  // document.getElementById('input-field').value = '';
  document.getElementById('showAllButton').style.display = 'none';
}

const loadApiResult = inputValue => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showResults(data))
}

// showing search result 
const showResults = phones => {
  document.getElementById('spinner').style.display = 'none';
  // input error handiling if api not found
  if (phones.status === false) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('result-field').innerHTML = '';
  }
  else {
    const resultContainer = document.getElementById('result-field');
    let phonesAmount = phones.data;
    if (phones.data.length > 20) {
      phonesAmount = phones.data.slice(0, 20);
      showButton();
    }
    resultContainer.innerHTML = "";
    document.getElementById('detail-field').innerHTML = '';
    document.getElementById('error').style.display = 'none';
    for (const phone of phonesAmount) {
      const div = document.createElement('div');
      div.classList.add('col-lg-4')
      div.innerHTML = `
              <div class="card pt-2 px-3" style="width: 18rem;">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">${phone.brand}</p>
                      <button class="btn btn-outline-success" type="submit" onclick="detailButton('${phone.slug}')">Details</button>
                  </div>
              </div>
          `
      resultContainer.appendChild(div);
    }
  }
}

// detail button added 
const detailButton = id => {
  document.getElementById('spinner').style.display = 'block';
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data))
}

// detail result showed 
const showDetails = detail => {
  const detailContainer = document.getElementById('detail-field');
  const div = document.createElement('div');
  let releaseMassage = detail.data.releaseDate;
  if (releaseMassage === '') {
    releaseMassage = "No Release date found"
  }
  detailContainer.innerHTML = "";
  document.getElementById('spinner').style.display = 'none';
  if (detail.data.others != undefined) {
    // when others data is present 
    div.innerHTML = `
      <div class="card my-3 py-3 border-success rounded-3">
        <div class="row g-0">
          <div class="col-lg-4 d-flex flex-column justify-content-center align-items-center">
            <img src="${detail.data.image}" class="rounded-start mt-4" alt="...">
            <div>
              <h5 class="fw-bolder text-center">${detail.data.name}</h5>
              <p class="fw-bolder text-center">${detail.data.brand}</p>
              <p class="text-center">${releaseMassage}</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <p class="card-text fw-bolder">Main Features</p>
              <p class="card-text"><span class="fw-bolder">Chipset :</span> ${detail.data.mainFeatures.chipSet}</p>
              <p class="card-text"><span class="fw-bolder">Display :</span> ${detail.data.mainFeatures.displaySize}</p>
              <p class="card-text"><span class="fw-bolder">Memory :</span> ${detail.data.mainFeatures.memory}</p>
              <p class="card-text"><span class="fw-bolder">Sensors :</span> ${detail.data.mainFeatures.sensors}</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <p class="card-text fw-bolder">Others</p>
              <p class="card-text"><span class="fw-bolder">Bluetooth :</span> ${detail.data.others.Bluetooth}</p>
              <p class="card-text"><span class="fw-bolder">GPS :</span> ${detail.data.others.GPS}</p>
              <p class="card-text"><span class="fw-bolder">NFC :</span> ${detail.data.others.NFC}</p>
              <p class="card-text"><span class="fw-bolder">USB :</span> ${detail.data.others.USB}</p>
              <p class="card-text"><span class="fw-bolder">WLAN :</span> ${detail.data.others.WLAN}</p>
            </div>
          </div>
        </div>
      </div>
        `
  }
  else {
    // when others data is not present 
    div.innerHTML = `
    <div class="card my-3 py-3 border-success rounded-3">
      <div class="row g-0">
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <img src="${detail.data.image}" class="rounded-start" alt="...">
          <div>
            <h5 class="text-center fw-bolder">${detail.data.name}</h5>
            <p class="text-center fw-bolder">${detail.data.brand}</p>
            <p class="text-center">${releaseMassage}</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-body">
            <h5 class="card-text fw-bolder">${detail.data.name}</h5>
            <p class="card-text fw-bolder">${detail.data.brand}</p>
            <p class="card-text fw-bolder">${releaseMassage}</p>
            <p class="card-text fw-bolder">Main Features</p>
            <p class="card-text "><span class="fw-bolder">Chipset :</span> ${detail.data.mainFeatures.chipSet}</p>
            <p class="card-text "><span class="fw-bolder">Display :</span> ${detail.data.mainFeatures.displaySize}</p>
            <p class="card-text "><span class="fw-bolder">Memory :</span> ${detail.data.mainFeatures.memory}</p>
            <p class="card-text "><span class="fw-bolder">Sensors :</span> ${detail.data.mainFeatures.sensors}</p>
          </div>
        </div>
      </div>
    </div>
    `
  }
  detailContainer.appendChild(div);
}

// show all section 
const showButton = () => {
  document.getElementById('showAllButton').style.display = 'block';
}

const showAll = () => {
  const inputValue = document.getElementById('input-field').value;
  document.getElementById('input-field').value = '';
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showAllResult(data))
}

const showAllResult = allData => {
  document.getElementById('showAllButton').style.display = 'none';
  const resultContainer = document.getElementById('result-field');
  resultContainer.innerHTML = "";
  document.getElementById('detail-field').innerHTML = '';
  document.getElementById('error').style.display = 'none'
  for (const phone of allData.data) {
    const div = document.createElement('div');
    div.classList.add('col-lg-3')
    div.innerHTML = `
            <div class="card pt-2 px-3" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn btn-outline-success" type="submit" onclick="detailButton('${phone.slug}')">Details</button>
                </div>
            </div>
        `
    resultContainer.appendChild(div);
  }
}