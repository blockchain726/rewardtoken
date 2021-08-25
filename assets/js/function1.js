let web3 = new web3js.myweb3(window.ethereum);
let account = '';

async function getAccount() {
    var eth = document.getElementById('writecontractiframe').eth
    if(typeof eth ==undefined){
        alert("eth undefil")
    }
    var account = ''
    if( window.ethereum) {
        account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    return account[0]
}
async function getClaim() {
    const chainId = await web3.eth.getChainId();
    if (chainId !=56) {
        alert("Please connect on NetWork Binance Smart Chain");
        return
    }
    let contract = new web3.eth.Contract(sttabi,sttaddr);
    console.log(contract)
    try {
        showLoading();
        await contract.methods.Rewards()
        .send({from: account})
        .on('receipt' , 
        function (receipt){
            if(receipt.status) {
                endLoading()
                alert('claim success')
            }
        })
    }
    catch (error) {
        endLoading()
        alert("claim failed")
    }
}
function showLoading() {
    document.getElementById('loadingmsg').style.display = 'block';
    document.getElementById('loadingover').style.display = 'block';
}
function endLoading() {
    document.getElementById('loadingmsg').style.display = 'none';
    document.getElementById('loadingover').style.display = 'none';
}

async function onInit() {
    const chainId = await web3.eth.getChainId();
    if (chainId !=56) {
        $('#paidvalue').html("Please connect on NetWork Binance Smart Chain");
        return
    }

    let contract = new web3.eth.Contract(sttabi,sttaddr);
    console.log(contract)
    contract.methods.symbol().call().then(function (symbol) {
        console.log(symbol)
		$('#title').html( "Claim your " + symbol + " token");
    });
    contract.methods.totalPayouts().call().then(function (payouts) {
        console.log(payouts)
		var inEth = web3.utils.fromWei(payouts, 'ether');
		$('#paidvalue').html(inEth);
    });
    // account = "0x7899Be819e8888eaaCFea906C7C033DA9DFB2088"
    account = await getAccount()
    contract.methods.getDividents(account).call().then(function (divident) {
		var inEth = web3.utils.fromWei(divident, 'ether');
		$('#availablevalue').html(inEth);
    });
}

