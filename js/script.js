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

const showResults = data => {

}