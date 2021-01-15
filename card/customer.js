// (c) Kallol Borah, 2020
// Customer processing functions

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


// 1. Get T&C
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/termsAndConditions",
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


// 2. onboard customer
var data = JSON.stringify({
    "firstName": "John",
    "middleName": "Paul",
    "lastName": "Smith",
    "preferredName": "John",
    "dateOfBirth": "1992-12-18",
    "gender": "Male",
    "designation": null, 
    "employeeId": null, 
    "nationality": "US",
    "email": "John@xyz.com",
    "countryCode": "US",
    "mobile": "4435544567‬",
    "deliveryAddress1": "1600 Amphitheatre Parkway",
    "deliveryAddress2": "Mountain View",
    "deliveryCity": "CA",
    "deliveryLandmark": "CA",
    "deliveryState": "CAD",
    "deliveryZipCode": "94043",
    "billingAddress1": "1600 Amphitheatre Parkway",
    "billingAddress2": "Mountain View",
    "billingCity": "CA",
    "billingLandmark": "CA",
    "billingState": "CAD",
    "billingZipCode": "94043",
    "correspondenceAddress1": "1600 Amphitheatre Parkway",
    "correspondenceAddress2": "Mountain View",
    "correspondenceCity": "CA",
    "correspondenceLandmark": "CA",
    "correspondenceState": "CAD",
    "correspondenceZipCode": "94043"
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-api-key", "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j");
  xhr.setRequestHeader("x-request-id", "123e4567-e89b-12d3-a456-426655440000");
  xhr.setRequestHeader("x-client-name", "client1");
  
  xhr.send(data);


// 3. Accept T&C 
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/termsAndConditions",
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


// 4. Upload KYC documents
var settings = {
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/uploadDocuments",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "content-type": "application/json",
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-client-name": "client1",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000"
    },
    "data": JSON.stringify({"identificationDoc":[{"identificationType":"SelfieWithId","identificationDocument":[{"fileName":"selfie","fileType":"image/jpeg","document":"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"}]},{"identificationType":"Passport","identificationValue":"12345","identificationIssuingAuthority":"Govt of Singapore","identificationIssuingDate":"05/05/2006","identificationDocExpiry":"04/05/2026","identificationDocHolderName":"Tom Ling","identificationDocIssuanceCountry":"Singapore","identificationDocument":[{"fileName":"passport-front","fileType":"image/jpeg","document":"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"},{"fileName":"passport-back","fileType":"image/jpeg","document":"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"}]},{"identificationType":"UtilityBill","identificationIssuingAuthority":"XYZ Power Co","identificationIssuingDate":"01/06/2020","identificationDocHolderName":"Tom Ling","identificationDocIssuanceCountry":"Singapore","identificationDocReferenceNumber":"6543227","identificationDocument":[{"fileName":"utilityBill","fileType":"image/png","document":"iVBORw0KGgoAAAANSUhEUgAAATMAAACkCAMAAADMkjkjAAAAflBMVEX///8AAACrq6v8/PwEBAT5+fnX19ff39/y8vLDw8PJycnp6env7+/i4uKdnZ2YmJi8vLxnZ2cNDQ2zs7M4ODjS0tKBgYFMTEyRkZEbGxtSUlKlpaUvLy9bW1vOzs6GhoZ1dXU/Pz8gICBra2tycnJXV1coKCg0NDRFRUUqKipY9PBqAAAGg0lEQVR4nO2di3aiMBRFiUkAAQVFFHxRa5///4OTgHYUFYJcSCl3r5k1yynCySG5eaeGgSAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiBNoZTqlvAELWpW8YPyzaglovbSFrUiOhR/ebVmSrm/Je3w2Z5nu5YkbwNFydzJJDAGrcBVMK1QFtRihf0KLZXIxG8DruZYlq7JElyEIKj2jF5fohheHQL8fuXtVmP1QCmKp7B3EsOqkPgKD/euXy3lnoLkFNozQnYRNRRiWQEvZgRWy0zBs2R8XTz3lV8SV8NFYMZkSGLLSV23zlrclIC6tqgOD5zE1yXCX1XrNMFUMnmjeew92XzJQsnkBUbLCafyqS75upJL19uqJhI1fDjPhGk+leHpKcuMvA5zDjBqpKCscJYbILKMd+mRRxJeVQ9QOIkifkyyiqhhq2iTELD3aFWJGRdq10C2UCosi2C0yTRuHYg2pKg7XKgWIyMvVZJCQtLLa0RssKokwsWP1HuirryBZn9CsIxmVmS0DSGHC8/oqwyC5V9xQYTJTLY/JRcCkdXWojqBsG1doUmE88vCKMIbCculGQDN76yBcbRB+3Yic8RAWW1a/iRpQGi7lmlZ1sS1Y/HQaVlSKN0DCJM3CBsH/qIyKqMzCFHpk97EFfP5+dpkLpKzLH393jfIu3yNZCLBxxAmC4Buu2j/mMVO5SV3qpvHHQGRSHfRVFGWqLUN7Vauz/BWAKWAkVezpHJa336lrCNgbUEkzVqxTHSWReN41lyffKubxxnt6/Y724cGcx9ixEqWfuOpdr+KbQbdwQTcVdaJEh0UeuWe+HSnqDG7KOP0nfDQVEpeYaYt+XVO05HMq5UoME8jO7vjRdylBreTO+/ksiNAz2NqEx9CiPSsvI4B8IyvAJTmvny/hZPi7Uf3rt4XdXhO/EVgBpIZeaMATf9S1wx7AdQeylmno73l2lxmOOpu7t77I/DkT7ntuZYzimdJ8SZPyxC3eG/VrwxOLeCBSEnyvZDcL21yREv88PMjgR7AFp5tvfbnJkU+DkB1X72B+6awkk9NH261Gsxy6KmDB6u8ztVwT5atHuAO02PbYLor2mFk14VfEi66nvBzn1p4cqakPiI3v/0F0xiJOwhmP8AM8+lFdHztTtfztDLN3i2sswrghKU7xY0RsYW33AEo0niEQz9xp4YZcKO2Gqmcz4L2zEh0J7kpq64XdFJRC/S8taGwSAnas3HfPTM7t8xwe24Z0bHW+qvfGW3XZR/gDOwqq85JdXi20Z3qZoxa3VXwgD5XAkL5WEc+M3UnvBktbvB4TM/HNroY1L7B053qBrDOe045tu6ENwM9qw96Vh8tnvU5nhFNdcBEd6qb0XUXPcPRneoGsOrV4K0Q6k54M0IdnrWwV7FLOp4NyDn2uL9JlPZFwtN8wbRWEl1dp2R7eJ+9LGN/EwbjvWlGUeSMg3A0jZfH98+L5WSsg0x5uRyCfa5ny3gqZTn7KDIF0V5K2/hC2u6Q6Gls2NXrw7lnjkfp7gCzBFeB+WK3nAamW70Km8Ju1FGkxiM9M4h3P7mgpTy3TkOzuGjxRiOF2wTWCW6QZguYGdiaIna61dcy7GxVVJdkK9SpO06hj8J4CdxTzulTBqrmZ+eE/MeanjebNM5vh9i8ecRfxfI/SJPAlhfJ1PzjNv0nzxHRC2m0oHg3zu81DLL9OqI14PpPG0aWVn46wVA8+w/fvP6v/NSQ1yaxynk4fxORSbwpqVVC5ZWpawynUN4gi5Zdc2nu0W1lE3TPiA5KWS275GOsW+1vYapUKoVnMe92qfWvhXPD/FbwjCROYV/xgBEu8LfqcplvtEfLTojsMy3rSknPYnTrChmkyraFMjnn0fEOiN9ONqrlPKg+s/8MsFTegRrRg73VTOWAvkHCS6aZtSxK/P1kpjzYERTI9gjygE0hpGWfSg/zGjiyG1nsfTKF8wwHjTx4pDDVzMiBo2elUHnkyXXjVsviup4xvQ5pG916fj+U06sj0KrOzEQy9peeDWdqqRk/dSeTx7mhaQpQ98cy8uwB60PjYlzIN9AzJSj15rlnbLhzcvXxc898zGSq0PMeF5Xf04OcSbGjWReabXIx0bMaUHke0RrnMuuQnUdU+nsDkCLUoB/zds4N/7OIQpkedYvoH2b572ZA7oGzJk+AlSaCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCDJ5/UdRYdQblPlcAAAAASUVORK5CYII="}]}]}),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 5. Wait for compliance callback  
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://<customerHost:Port>/callback/compliance?customerHashId={{customerHashId}}",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 6. Get compliance status for customer
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
          "x-api-key":  "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-request-id":  "123e4567-e89b-12d3-a456-426655440000",
          "x-client-name":  "client1"
    },
    "processData": false,
  }
  
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 7. Upload RFI if compliance status is still 'in process'
var settings = {
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/uploadRfiDocument",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": ["application/json"],
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1"
    },
    "data": ({"identificationDoc":[{"identificationType":"SelfieWithId","identificationValue":"","identificationDocument":[{"fileName":"selfie","fileType":"image/jpeg","document":"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"}]},{"identificationType":"Passport","identificationValue":"12345","identificationIssuingAuthority":"Govt of Singapore","identificationIssuingDate":"05/05/2006","identificationDocExpiry":"04/05/2026","identificationDocHolderName":"Tom Ling","identificationDocReferenceNumber":"","identificationDocIssuanceCountry":"Singapore","identificationDocument":[{"fileName":"passport-front","fileType":"image/jpeg","document":"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"},{"fileName":"passport-back","fileType":"image/jpeg","document":"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"}]},{"identificationType":"UtilityBill","identificationValue":"","identificationIssuingAuthority":"XYZ Power Co","identificationIssuingDate":"01/06/2020","identificationDocHolderName":"Tom Ling","identificationDocIssuanceCountry":"Singapore","identificationDocReferenceNumber":"6543227","identificationDocument":[{"fileName":"utilityBill","fileType":"image/png","document":"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"}]}]}),
  };
  
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// 8. Upload RFI documents 
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/updateCustomer",
    "method": "POST",
    "headers": {
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1",
      "cache-control": "no-cache"
    },
    "data": "{\n  \"billingAddress1\": \"1600 Amphitheatre Parkway\",\n  \"billingAddress2\": \"Mountain View\",\n  \"billingCity\": \"CA\",\n  \"billingLandmark\": \"\",\n  \"billingState\": \"CA\",\n  \"billingZipCode\": \"54321\",\n  \"correspondenceAddress1\": \"1600 Amphitheatre Parkway\",\n  \"correspondenceAddress2\": \"Mountain View\",\n  \"correspondenceCity\": \"CA\",\n  \"correspondenceLandmark\": \"\",\n  \"correspondenceState\": \"CA\",\n  \"correspondenceZipCode\": \"54321\",\n  \"countryCode\": \"CAD\",\n  \"deliveryAddress1\": \"\",\n  \"deliveryAddress2\": \"Mountain View\",\n  \"deliveryCity\": \"CA\",\n  \"deliveryLandmark\": \"\",\n  \"deliveryState\": \"CA\",\n  \"deliveryZipCode\": \"54321\",\n  \"email\": \"nayan@gmail.com\",\n  \"mobile\": \"987654321\"\n,\n  \"employeeId\": \null\n}\n"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  }); 


  // 9. Update customer record
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}/updateCustomer",
    "method": "POST",
    "headers": {
      "x-api-key": "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
      "x-request-id": "123e4567-e89b-12d3-a456-426655440000",
      "x-client-name": "client1",
      "cache-control": "no-cache"
    },
    "data": "{\n  \"billingAddress1\": \"1600 Amphitheatre Parkway\",\n  \"billingAddress2\": \"Mountain View\",\n  \"billingCity\": \"CA\",\n  \"billingLandmark\": \"\",\n  \"billingState\": \"CA\",\n  \"billingZipCode\": \"54321\",\n  \"correspondenceAddress1\": \"1600 Amphitheatre Parkway\",\n  \"correspondenceAddress2\": \"Mountain View\",\n  \"correspondenceCity\": \"CA\",\n  \"correspondenceLandmark\": \"\",\n  \"correspondenceState\": \"CA\",\n  \"correspondenceZipCode\": \"54321\",\n  \"countryCode\": \"CAD\",\n  \"deliveryAddress1\": \"\",\n  \"deliveryAddress2\": \"Mountain View\",\n  \"deliveryCity\": \"CA\",\n  \"deliveryLandmark\": \"\",\n  \"deliveryState\": \"CA\",\n  \"deliveryZipCode\": \"54321\",\n  \"email\": \"nayan@gmail.com\",\n  \"mobile\": \"987654321\"\n,\n  \"employeeId\": \null\n}\n"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


  // 10. List all customers
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apisandbox.spend.nium.com/api/v1/client/{{clientHashId}}/customer/{{customerHashId}}",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
          "x-api-key":  "0mZpIhaLVM1qd8IJhCfgjGJDsY7b5pdr00j",
          "x-request-id":  "123e4567-e89b-12d3-a456-426655440000",
          "x-client-name":  "client1"
    },
    "processData": false,
  }
  
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });