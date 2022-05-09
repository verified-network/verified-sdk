"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Products_json_1 = require("../../abi/securities/Products.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["REGISTERPRODUCT"] = "recordProduct";
    FUNCTIONS["CLIENTPRODUCT"] = "getProductsForClient";
    FUNCTIONS["CLIENTISSUE"] = "getIssuesForClient";
    FUNCTIONS["COUNTRYPRODUCT"] = "getProductsForCountry";
    FUNCTIONS["COUNTRYISSUE"] = "getIssuesForCountry";
    FUNCTIONS["GETPRODUCTS"] = "getProducts";
    FUNCTIONS["GETPRODUCT"] = "getProduct";
    FUNCTIONS["REGISTERCERTIFICATE"] = "registerCertificate";
    FUNCTIONS["GETCERTIFICATE"] = "getCertificate";
    FUNCTIONS["CONFIRMPRODUCT"] = "confirmProduct";
    FUNCTIONS["GETISSUE"] = "getIssue";
    FUNCTIONS["GETISSUERNAME"] = "getIssuerName";
    FUNCTIONS["GETISSUERADDRESS"] = "getIssuerAddress";
    FUNCTIONS["GETPLATFORMS"] = "getPlatforms";
    FUNCTIONS["GETPRODUCTREFERENCE"] = "getProductReference";
    FUNCTIONS["SETSIGNER"] = "setSigner";
})(FUNCTIONS || (FUNCTIONS = {}));
class ProductContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = Products_json_1.networks[chainId].address;
        super(address, JSON.stringify(Products_json_1.abi), signer);
        this.contractAddress = address;
    }
    async setSigner(_signer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _signer);
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
    }
    async recordProduct(_productCategory, _issuerName, _issuerAddress, _issuerCountry, _issuerSignatoryEmail, _arrangerName, _arrangerAddress, _arrangerCountry, _arrangerSignatoryEmail, _registrationDocuments, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _productCategory);
        await this.validateInput(index_1.DATATYPES.STRING, _issuerName);
        await this.validateInput(index_1.DATATYPES.STRING, _issuerAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _issuerCountry);
        await this.validateInput(index_1.DATATYPES.STRING, _issuerSignatoryEmail);
        await this.validateInput(index_1.DATATYPES.STRING, _arrangerName);
        await this.validateInput(index_1.DATATYPES.STRING, _arrangerAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _arrangerCountry);
        await this.validateInput(index_1.DATATYPES.STRING, _arrangerSignatoryEmail);
        await this.validateInput(index_1.DATATYPES.STRING, _registrationDocuments);
        return this.callContract(FUNCTIONS.REGISTERPRODUCT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _productCategory), this.sanitiseInput(index_1.DATATYPES.BYTE32, _issuerName), this.sanitiseInput(index_1.DATATYPES.BYTE32, _issuerAddress), this.sanitiseInput(index_1.DATATYPES.BYTE32, _issuerCountry), this.sanitiseInput(index_1.DATATYPES.BYTE32, _issuerSignatoryEmail), this.sanitiseInput(index_1.DATATYPES.BYTE32, _arrangerName), this.sanitiseInput(index_1.DATATYPES.BYTE32, _arrangerAddress), this.sanitiseInput(index_1.DATATYPES.BYTE32, _arrangerCountry), this.sanitiseInput(index_1.DATATYPES.BYTE32, _arrangerSignatoryEmail), _registrationDocuments, options);
    }
    async getProductsForClient() {
        return this.callContract(FUNCTIONS.CLIENTPRODUCT);
    }
    async getIssuesForClient() {
        return this.callContract(FUNCTIONS.CLIENTISSUE);
    }
    async getProductsForCountry(_country, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        return this.callContract(FUNCTIONS.COUNTRYPRODUCT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), options);
    }
    async getIssuesForCountry(_country, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        return this.callContract(FUNCTIONS.COUNTRYISSUE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), options);
    }
    async getProducts() {
        return this.callContract(FUNCTIONS.GETPRODUCTS);
    }
    async getProduct(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETPRODUCT, _ref, options);
    }
    async registerCertificate(_ref, _issuerCertificate, _arrangerCertificate, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        await this.validateInput(index_1.DATATYPES.STRING, _issuerCertificate);
        await this.validateInput(index_1.DATATYPES.STRING, _arrangerCertificate);
        return this.callContract(FUNCTIONS.REGISTERCERTIFICATE, _ref, _issuerCertificate, _arrangerCertificate, options);
    }
    async getCertificate(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETCERTIFICATE, _ref, options);
    }
    async confirmProduct(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.CONFIRMPRODUCT, _ref, options);
    }
    async getIssue(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETISSUE, _ref, options);
    }
    async getIssuerName(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETISSUERNAME, _ref, options);
    }
    async getIssuerAddress(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETISSUERADDRESS, _ref, options);
    }
    async getPlatforms() {
        return this.callContract(FUNCTIONS.GETPLATFORMS);
    }
    async getProductReference(_issue, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issue);
        return this.callContract(FUNCTIONS.GETPRODUCTREFERENCE, _issue, options);
    }
}
exports.default = ProductContract;
