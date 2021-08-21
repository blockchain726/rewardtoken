let web3 = new web3js.myweb3(window.ethereum);
let account = '';
let min_val = 0;
let max_val = 5;
let _owner
async function connectWallet() {
    if ( window.ethereum == undefined) {
        Swal.fire(
            'Connect Alert',
            'Please install Metamask',
            'error'
        )
        $(body).html("Please install Metamask. try again")
        return ;
    }else {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
         window.ethereum.on('accountsChanged', function (accounts) {
            account = accounts[0];
            console.log(accounts[0])
        });
    }
}
async function getAccount() {
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
    await contract.methods.Rewards();
}
