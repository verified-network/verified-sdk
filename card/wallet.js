// (c) Kallol Borah, 2020
// Wallet functions


// 1. Fund a customer wallet using 'prefund' funding channel
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/fund",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
          "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
          "x-client-name": "client1"
    },
    "processData": false,
    "data": "{\r\n    \"fundingChannel\": \"bank_transfer\",\r\n    \"amount\": 500,\r\n    \"pocketName\": DEFAULT,\r\n    \"sourceCurrencyCode\": \"SGD\",\r\n    \"destinationCurrencyCode\": \"SGD\"\r\n}",
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 2. Get customer wallet balance
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}",
    "method": "GET",
    "headers": {
          "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
          "x-client-name": "client1"
    }
  }
  
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 3. Get all transactions for customer wallet
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/transactions?page=0&size=1&startDate=2020-03-01&endDate=2020-03-18",
    "method": "GET",
    "headers": {
          "x-api-key":  "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-client-name":  "client1"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 4. Convert one currency to another in the same wallet
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/transfer",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
          "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
          "x-client-name": "client1"
    },
    "processData": false,
    "data": "{\n  \"amount\": 10,\n  \"destinationCurrency\": \"USD\",\n  \"sourceCurrency\": \"INR\"\n}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 5. Transfers money from one wallet to another wallet within customers of the same client
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/p2pTransfer",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\n\t\"destinationWalletHashId\":\"70f1b765-9206-4771-8968-eaa035687114\",\n\t\"amount\":\1\,\n\t\"currencyCode\":\"SGD\"\n}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 6. Get card limits on customer wallet
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/limits",
    "method": "GET",
    "headers": {
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1",
      "Content-Type": "application/json"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  
  
// 7. Withdraw funds from customer wallet
var settings = {
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/wallet/{{walletHashId}}/refund",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": ["application/json", "text/plain"],
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1"
    },
    "data": "{\n  \"amount\": 10,\n  \"comments\": \"An instruction/message to support personnel\",\n  \"currencyCode\": \"SGD\",\n  \"pocketName\": \"MEAL\",\n  \"refundMode\": \"CASH\"\n}",
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


  // 8. Delete customer wallet
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/fundingInstruments/{{fundingInstrumentId}}",
    "method": "DELETE",
    "headers": {
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1",
      "Content-Type": "application/json"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });



