// (c) Kallol Borah, 2021
// Wallet functions

require('dotenv').config();

// Generic AJAX function prototype
function generalAjax(params){
  $.ajax({
      async : true,
      crossDomain : true,
      url: params.url,
      method: params.reqType,
      data : params.formData,
      dataType : 'json',
      headers : {
        "content-type": "application/json",
        "x-api-key": process.env.CARD_API_KEY,
        "x-request-id": params.requestId,
        "x-client-name": process.env.CLIENT_NAME,
        "cache-control": "no-cache"
      },
      processData : false
  }).done(function( data ) {
      params.callback; 
  }).fail(function(jqXHR, textStatus){
      var string = "Verified card request failed : " + textStatus + " - " + jqXHR.responseText;
      $("#diag").html(string);
  });
}   

function ajaxParams(url, type, data, reqid, callback) {
  this.url = url;
  this.reqType = type;
  this.formData = data;
  this.callback = callback;
  this.requestId = reqid;
}

// 1. Fund a customer wallet using 'prefund' funding channel
function fundWallet(customerHashId, walletHashId, reqId, callback, channel, amount, pocketName, sourceCurrency, destinationCurrency){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/fund';
  var type = "POST";
  var formData = '{' + '"fundingChannel":' + channel +
                 ',' + '"amount":' + amount + 
                 ',' + '"pocketName":' + pocketName + 
                 ',' + '"sourceCurrencyCode":' + sourceCurrency + 
                 ',' + '"destinationCurrencyCode":' + destinationCurrency + 
                 '}';
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 2. Get customer wallet balance
function getCustomerWalletBalance(customerHashId, walletHashId, reqId, callback){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId;
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

// 3. Get all transactions for customer wallet
function getCustomerTransactions(customerHashId, walletHashId, reqId, callback, page, size, startDate, endDate){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/transactions?page='+page+'&size='+size+'&startDate='+startDate+'&endDate='+endDate;
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

// 4. Convert one currency to another in the same wallet
function convertCurrency(customerHashId, walletHashId, reqId, callback, amount, sourceCurrency, destinationCurrency){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/transfer';
  var type = "POST";
  var formData = '{' + '"amount":' + amount + 
                 ',' + '"sourceCurrency":' + sourceCurrency + 
                 ',' + '"destinationCurrency":' + destinationCurrency + 
                 '}';
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 5. Transfers money from one wallet to another wallet within customers of the same client
function p2pTransfer(customerHashId, walletHashId, reqId, callback, amount, currencyCode, destinationWalletHashId){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/p2pTransfer';
  var type = "POST";
  var formData = '{' + '"amount":' + amount + 
                 ',' + '"currencyCode":' + currencyCode + 
                 ',' + '"destinationWalletHashId":' + destinationWalletHashId + 
                 '}';
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 6. Get card limits on customer wallet
function getCustomerCardLimits(customerHashId, walletHashId, reqId, callback, page, size, startDate, endDate){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/limits';
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
} 
  
// 7. Withdraw funds from customer wallet
function withdrawFunds(customerHashId, walletHashId, reqId, callback, comments, amount, pocketName, currencyCode, refundMode){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/wallet/'+walletHashId+'/refund';
  var type = "POST";
  var formData = '{' + '"comments":' + comments +
                 ',' + '"amount":' + amount + 
                 ',' + '"pocketName":' + pocketName + 
                 ',' + '"currencyCode":' + currencyCode + 
                 ',' + '"refundMode":' + refundMode + 
                 '}';
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 8. Delete customer wallet
function getCustomerWallet(customerHashId, reqId, callback, fundingInstrumentId){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/fundingInstruments/'+fundingInstrumentId;
  var type = "DELETE";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}
  