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
export function getTermsConditions(reqId, callback){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/termsAndConditions';
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

// 2. onboard customer
export function addCustomer(reqId, callback, firstName, middleName, lastName, preferredName, dateOfBirth, gender, designation, employeeId, nationality, email, countryCode, mobile, deliveryAddress1, deliveryAddress2, deliveryCity, deliveryLandmark, deliveryState, deliveryZipCode, billingAddress1, billingAddress2, billingCity, billingLandmark, billingState, billingZipCode, correspondenceAddress1, correspondenceAddress2, correspondenceCity, correspondenceLandmark, correspondenceState, correspondenceZipCode){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer';
  var type = "POST";
  var formData = JSON.stringify({
    "firstName": firstName,
    "middleName": middleName,
    "lastName": lastName,
    "preferredName": preferredName,
    "dateOfBirth": dateOfBirth,
    "gender": gender,
    "designation": designation, 
    "employeeId": employeeId, 
    "nationality": nationality,
    "email": email,
    "countryCode": countryCode,
    "mobile": mobile,
    "deliveryAddress1": deliveryAddress1,
    "deliveryAddress2": deliveryAddress2,
    "deliveryCity": deliveryCity,
    "deliveryLandmark": deliveryLandmark,
    "deliveryState": deliveryState,
    "deliveryZipCode": deliveryZipCode,
    "billingAddress1": billingAddress1,
    "billingAddress2": billingAddress2,
    "billingCity": billingCity,
    "billingLandmark": billingLandmark,
    "billingState": billingState,
    "billingZipCode": billingZipCode,
    "correspondenceAddress1": correspondenceAddress1,
    "correspondenceAddress2": correspondenceAddress2,
    "correspondenceCity": correspondenceCity,
    "correspondenceLandmark": correspondenceLandmark,
    "correspondenceState": correspondenceState,
    "correspondenceZipCode": correspondenceZipCode
  });
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 3. Accept T&C 
export function acceptTermsConditions(customerHashId, reqId, callback, success, name, versionId){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/termsAndConditions';
  var type = "POST";
  var formData = '{' + '"success":' + success +
                 ',' + '"name":' + name + 
                 ',' + '"versionId":' + versionId + 
                 '}';
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 4. Upload KYC documents
export function uploadKyc(customerHashId, reqId, callback, identificationType, identificationValue, identificationIssuingAuthority, identificationIssuingDate, identificationDocExpiry, identificationDocHolderName, identificationDocIssuanceCountry, identificationDocReferenceNumber, fileName, fileType, document){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/uploadDocuments';
  var type = "POST";
  var formData = JSON.stringify({
    "identificationDoc":[{"identificationType":identificationType,
                          "identificationValue":identificationValue,
                          "identificationIssuingAuthority":identificationIssuingAuthority,
                          "identificationIssuingDate":identificationIssuingDate,
                          "identificationDocExpiry":identificationDocExpiry,
                          "identificationDocHolderName":identificationDocHolderName,
                          "identificationDocIssuanceCountry":identificationDocIssuanceCountry,
                          "identificationDocReferenceNumber":identificationDocReferenceNumber,
                          "identificationDocument":[{"fileName":fileName,
                                                  "fileType":fileType,
                                                  "document":document}]}
                        ]}),
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 5. Check compliance  
export function checkCompliance(customerHashId, reqId, callback){
  var url = process.env.CARD_URL+'/callback/compliance?customerHashId='+customerHashId;
  var type = "POST";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
} 

// 6. Get compliance status for customer
export function getComplianceStatus(customerHashId, reqId, callback){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId;
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

// 7. Upload RFI if compliance status is still 'in process'
export function uploadRfiDocs(customerHashId, reqId, callback, identificationType, identificationValue, identificationIssuingAuthority, identificationIssuingDate, identificationDocExpiry, identificationDocHolderName, identificationDocIssuanceCountry, identificationDocReferenceNumber, fileName, fileType, document){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/uploadRfiDocument';
  var type = "POST";
  var formData = JSON.stringify({
    "identificationDoc":[{"identificationType":identificationType,
                          "identificationValue":identificationValue,
                          "identificationIssuingAuthority":identificationIssuingAuthority,
                          "identificationIssuingDate":identificationIssuingDate,
                          "identificationDocExpiry":identificationDocExpiry,
                          "identificationDocHolderName":identificationDocHolderName,
                          "identificationDocIssuanceCountry":identificationDocIssuanceCountry,
                          "identificationDocReferenceNumber":identificationDocReferenceNumber,
                          "identificationDocument":[{"fileName":fileName,
                                                  "fileType":fileType,
                                                  "document":document}]}
                        ]}),
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}

// 8. Get customer details
export function getCustomerDetails(customerHashId, reqId, callback){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId;
  var type = "POST";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

// 9. Update customer record
export function updateCustomer(customerHashId, reqId, callback, employeeId, email, mobile, deliveryAddress1, deliveryAddress2, deliveryCity, deliveryLandmark, deliveryState, deliveryZipCode, billingAddress1, billingAddress2, billingCity, billingLandmark, billingState, billingZipCode, correspondenceAddress1, correspondenceAddress2, correspondenceCity, correspondenceLandmark, correspondenceState, correspondenceZipCode){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customer/'+customerHashId+'/updateCustomer';
  var type = "POST";
  var formData = JSON.stringify({
    "employeeId": employeeId, 
    "email": email,
    "mobile": mobile,
    "deliveryAddress1": deliveryAddress1,
    "deliveryAddress2": deliveryAddress2,
    "deliveryCity": deliveryCity,
    "deliveryLandmark": deliveryLandmark,
    "deliveryState": deliveryState,
    "deliveryZipCode": deliveryZipCode,
    "billingAddress1": billingAddress1,
    "billingAddress2": billingAddress2,
    "billingCity": billingCity,
    "billingLandmark": billingLandmark,
    "billingState": billingState,
    "billingZipCode": billingZipCode,
    "correspondenceAddress1": correspondenceAddress1,
    "correspondenceAddress2": correspondenceAddress2,
    "correspondenceCity": correspondenceCity,
    "correspondenceLandmark": correspondenceLandmark,
    "correspondenceState": correspondenceState,
    "correspondenceZipCode": correspondenceZipCode
  });
  var params = new ajaxParams(url, type, formData, reqId, callback);
  generalAjax(params);
}  

// 10. List all customers
export function listCustomers(reqId, callback, order, page, size){
  var url = process.env.CARD_URL+'/client/'+process.env.CLIENT_HASH_ID+'/customers?order='+order+'&page='+page+'&size='+size;
  var type = "GET";
  var params = new ajaxParams(url, type, '', reqId, callback);
  generalAjax(params);
}

  