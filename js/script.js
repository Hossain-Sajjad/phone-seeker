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
                    <button class="btn btn-outline-success" type="submit" onclick="">Details</button>
                </div>
            </div>
        `
        resultContainer.appendChild(div);
    }
}