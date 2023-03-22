

const loadSymbolButton = document.getElementById('loadSymbolButton');
const exchangeButton = document.getElementById('exchangeButton');

loadSymbolButton.addEventListener('click',()=>{
    loadSymbols()
})
exchangeButton.addEventListener('click',()=>{
    exchangeCurrency()
})

function loadSymbols() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let symbols = JSON.parse(xhr.responseText).symbols;
            let options = ""
            for(let symbol in symbols) {
                options += "<option value='"+symbol+"'>" + symbols[symbol] + " - ( "+symbol+" )</option>"
            }
            document.getElementById("currencySymbols").innerHTML = options;
            
        }
    };
    
    xhr.open('GET', 'simple.txt', true);
    xhr.send();

}
function exchangeCurrency() {
    let symbol =document.getElementById("currencySymbols").value;
    let amount =document.getElementById("amount").value;
    console.log(symbol)
    if(!symbol || symbol == 0){
        alert("Please select a currency")
    }else if(!amount){
        alert("Please enter a valid amount")
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbol}&base=USD`, true);
    xhr.setRequestHeader("apikey", "q268Obl5gpJdEIS7ZRNgzGetyW0JzQWA");
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let symbols = JSON.parse(xhr.responseText);            
            document.getElementById("exchangedAmount").value = (amount * symbols.rates[symbol]).toFixed(2);
            
        }
    };
    
    xhr.send();

}

