// const currencyNames = {
//     USD: '달러',
//     KRW: '원',
//     EUR: '유로',
//     JPY: '엔',
//     CNY: '위안'
// };

// function convertCurrency() {
//     const amount = parseFloat(document.getElementById('amount').value);
//     const fromCurrency = document.getElementById('fromCurrency').value;
//     const toCurrency = document.getElementById('toCurrency').value;

//     if (!amount || fromCurrency === toCurrency) {
//         document.getElementById('result').innerText = "올바른 금액을 입력하세요.";
//         return;
//     }

//     const apiKey = 'testAPI111';
//     const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.result === 'success') {
//                 const rate = data.conversion_rates[toCurrency];
//                 const convertedAmount = amount * rate;
//                 const fromCurrencyName = currencyNames[fromCurrency];
//                 const toCurrencyName = currencyNames[toCurrency];

//                 document.getElementById('result').innerText =
//                     `${amount} ${fromCurrencyName}는 ${convertedAmount.toFixed(2)} ${toCurrencyName}입니다.`;
//             } else {
//                 document.getElementById('result').innerText = "환율 정보를 가져오는 데 실패했습니다.";
//             }
//         })
//         .catch(error => {
//             document.getElementById('result').innerText = "오류가 발생했습니다: " + error.message;
//         });
// }
////////////////////////

const currencyNames = {
    USD: '달러',
    KRW: '원',
    EUR: '유로',
    JPY: '엔',
    CNY: '위안'
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || fromCurrency === toCurrency) {
        document.getElementById('result').innerText = "올바른 금액을 입력하세요.";
        return;
    }

    // [수정된 부분] API 키와 원래 주소를 지웠습니다!
    // 대신 우리가 만든 '비밀 요원(getRates)'에게 요청을 보냅니다.
    // ?from=USD 처럼 뒤에 기준 통화를 붙여서 보냅니다.
    const url = `/.netlify/functions/get-rates?from=${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 비밀 요원이 오류를 보냈는지 확인
            if (data.error) {
                throw new Error(data.error);
            }

            if (data.result === 'success') {
                const rate = data.conversion_rates[toCurrency];
                const convertedAmount = amount * rate;
                const fromCurrencyName = currencyNames[fromCurrency];
                const toCurrencyName = currencyNames[toCurrency];

                document.getElementById('result').innerText =
                    `${amount} ${fromCurrencyName}는 ${convertedAmount.toFixed(2)} ${toCurrencyName}입니다.`;
            } else {
                document.getElementById('result').innerText = "환율 정보를 가져오는 데 실패했습니다.";
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = "오류가 발생했습니다: " + error.message;
        });
}