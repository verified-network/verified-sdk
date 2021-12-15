// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/securities/Products.json';

enum FUNCTIONS {
    REGISTERPRODUCT = 'recordProduct',
    CLIENTPRODUCT = 'getProductsForClient',
    CLIENTISSUE = 'getIssuesForClient',
    COUNTRYPRODUCT = 'getProductsForCountry',
    COUNTRYISSUE = 'getIssuesForCountry',
    GETPRODUCTS = 'getProducts',
    GETPRODUCT = 'getProduct',
    REGISTERCERTIFICATE = 'registerCertificate',
    GETCERTIFICATE = 'getCertificate',
    CONFIRMPRODUCT = 'confirmProduct',
    GETISSUE = 'getIssue',
    GETISSUERNAME = 'getIssuerName',
    GETISSUERADDRESS = 'getIssuerAddress'
}

export default class ProductContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async recordProduct( _productCategory: string,
                                _issuerName: string,
                                _issuerAddress: string,
                                _issuerCountry: string,
                                _issuerSignatoryEmail: string,
                                _arrangerName: string,
                                _arrangerAddress: string,
                                _arrangerCountry: string,
                                _arrangerSignatoryEmail: string,
                                _registrationDocuments: string,
                                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _productCategory)
        await this.validateInput(DATATYPES.STRING, _issuerName)
        await this.validateInput(DATATYPES.STRING, _issuerAddress)
        await this.validateInput(DATATYPES.STRING, _issuerCountry)
        await this.validateInput(DATATYPES.STRING, _issuerSignatoryEmail)
        await this.validateInput(DATATYPES.STRING, _arrangerName)
        await this.validateInput(DATATYPES.STRING, _arrangerAddress)
        await this.validateInput(DATATYPES.STRING, _arrangerCountry)
        await this.validateInput(DATATYPES.STRING, _arrangerSignatoryEmail)
        await this.validateInput(DATATYPES.STRING, _registrationDocuments)
        return this.callContract(FUNCTIONS.REGISTERPRODUCT, this.sanitiseInput(DATATYPES.BYTE32, _productCategory), 
                                                    this.sanitiseInput(DATATYPES.BYTE32, _issuerName), 
                                                    this.sanitiseInput(DATATYPES.BYTE32, _issuerAddress),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _issuerCountry),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _issuerSignatoryEmail),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _arrangerName),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _arrangerAddress),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _arrangerCountry),
                                                    this.sanitiseInput(DATATYPES.BYTE32, _arrangerSignatoryEmail),
                                                    _registrationDocuments, 
                                options)
    }

    public async getProductsForClient(){
        return this.callContract(FUNCTIONS.CLIENTPRODUCT)
    }

    public async getIssuesForClient(){
        return this.callContract(FUNCTIONS.CLIENTISSUE)
    }

    public async getProductsForCountry(_country: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _country)
        return this.callContract(FUNCTIONS.COUNTRYPRODUCT, this.sanitiseInput(DATATYPES.BYTE32, _country), options)
    }

    public async getIssuesForCountry(_country: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _country)
        return this.callContract(FUNCTIONS.COUNTRYISSUE, this.sanitiseInput(DATATYPES.BYTE32, _country), options)
    }

    public async getProducts(){
        return this.callContract(FUNCTIONS.GETPRODUCTS)
    }

    public async getProduct(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETPRODUCT, _ref, options)
    }

    public async registerCertificate(_ref: string, _issuerCertificate: string, _arrangerCertificate: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        await this.validateInput(DATATYPES.STRING, _issuerCertificate)
        await this.validateInput(DATATYPES.STRING, _arrangerCertificate)
        return this.callContract(FUNCTIONS.REGISTERCERTIFICATE, _ref, _issuerCertificate, _arrangerCertificate, options)
    }

    public async getCertificate(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETCERTIFICATE, _ref, options)
    }

    public async confirmProduct(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.CONFIRMPRODUCT, _ref, options)
    }

    public async getIssue(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETISSUE, _ref, options)
    }

    public async getIssuerName(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETISSUERNAME, _ref, options)
    }

    public async getIssuerAddress(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETISSUERADDRESS, _ref, options)
    }

}