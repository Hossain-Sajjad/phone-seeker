const searchButton = () => {
    const inputValue = document.getElementById('input-field').value;
    loadApiResult(inputValue);
}

const loadApiResult = inputValue => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResults(data))
}

const showResults = phones => {
    console.log(phones)
    const resultContainer = document.getElementById('result-field');
    for (const phone of phones.data) {
        const div = document.createElement('div');
        div.classList.add('col-lg-4')
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
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

const detailButton = id => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

const showDetails = detail => {
    console.log(detail)
    const detailContainer = document.getElementById('detail-field');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${detail.data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${detail.data.name}</h5>
                <p class="card-text">${detail.data.brand}</p>
                <p class="card-text">${detail.data.releaseDate}</p>
            </div>
        </div>
    `
    detailContainer.appendChild(div);
}