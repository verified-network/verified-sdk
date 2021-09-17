// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Kyc.json';


enum FUNCTIONS {
    GETSTATUS = 'getStatus',
    SETSTATUS = 'setStatus',
    KYCUPDATE = 'KycUpdate',
    SETFILE = 'setFile',
    SETFATCA = 'setFATCA',
    SETCRS = 'setCRS',
    SETPHOTOID = 'setPhotoID',
    SETVIDEOID = 'setVideoID',
    SETADDRESS = 'setAddress',
    SETKYC = 'setKyc',
    GETFILE = 'getFile',
    GETFATCA = 'getFATCA',
    GETCRS = 'getCRS',
    GETPHOTOID = 'getPhotoID',
    GETVIDEOID = 'getVideoID',
    GETADDRESS = 'getAddress',
    GETKYC = 'getKyc',
    SETCOUNTRY = 'setCountry',
    GETCOUNTRY = 'getCountry'
}

export default class KYCContract extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * An issuer can ‘accept’ or ‘reject’ KYC using the setKYC API.
     * @param (address _client, bool _status) 
     * @returns 
     */
    public async setStatus(_clientAddress: string, _status: string, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.NUMBER, _status)
        return this.callContract(FUNCTIONS.SETSTATUS, _clientAddress, _status, options)
    }

    /**
     * The issuer as well as the investor can fetch the investor’s KYC status using the getKYC API.
     * @param (address _client) 
     * @returns bool
     * Note : KYC status needs to be ‘true’ for the investor to carry out any further operations in the Dapp.
     */
    public async getStatus(_clientAddress: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        return this.callContract(FUNCTIONS.GETSTATUS, _clientAddress, options)
    }

    /**
     * If an issuer accepts or rejects the investor’s KYC, the transaction will trigger an event on the
     * blockchain that should be filtered using etherjs and displayed to the investor.
     * @param (address indexed client, bool status)
     * @returns bool
     * The investor facing Dapp should filter the event with the investor’s address mapped to ‘client’ in the event below.
     */
    public kycUpdate(callback: any): object {
        this.getEvent(FUNCTIONS.KYCUPDATE, callback)
    }

    /**
     * The investor can fill up its KYC using an API. This API call needs to be preceded by uploading the KYC documents 
     * (eg, photo ID, video ID, etc) to IPFS and using the IPFS urls in the API. Instead of uploading to IPFS, 
     * we may also plug in a third party KYC management system, so please check before implementing. 
     * @param {address _client,bytes32 _file, bytes32 _fatca,bytes32 _crs, bytes32 _photoId,bytes32 _videoId, bytes32 _address} 
     * @returns 
     */
    public async setKyc(_clientAddress: string, _file: string, _fatca: string, _crs: string, _photoId: string, _videoId: string, _address: string, _country: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        await this.validateInput(DATATYPES.STRING, _address)
        await this.validateInput(DATATYPES.STRING, _photoId)
        await this.validateInput(DATATYPES.STRING, _videoId)
        await this.validateInput(DATATYPES.STRING, _fatca)
        await this.validateInput(DATATYPES.STRING, _crs)
        await this.validateInput(DATATYPES.STRING, _country)
        return this.callContract(FUNCTIONS.SETKYC, _clientAddress, _file, _fatca, _crs, _photoId, _videoId, _address, _country, options)
    }

    public async setCountry(_clientAddress: string, _country: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _country)
        return this.callContract(FUNCTIONS.SETCOUNTRY, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _country), options)
    } 

    public async setFile(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETFILE, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    } 

    public async setFATCA(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETFATCA, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setCRS(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETCRS, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setPhotoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETPHOTOID, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setVideoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETVIDEOID, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setAddress(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        return this.callContract(FUNCTIONS.SETADDRESS, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    /**
      * Get KYC details [callable by client or its manager or KYCAML submanager
      * @param (address _client) 
      * @returns (bytes32, bytes32, bytes32, bytes32, bytes32, bytes32)Returns KYC_file, fatca_declaration, crs_declaration, photo_id, video_id, address_proof
      */
    public async getKyc(_client: string, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _client)
        return this.callContract(FUNCTIONS.GETKYC, _client, options)
    } 

    public async getFile(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETFILE, _clientAddress, options)
    }

    public async getFATCA(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETFATCA, _clientAddress, options)
    }

    public async getCRS(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETCRS, _clientAddress, options)
    }

    public async getPhotoID(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETPHOTOID, _clientAddress, options)
    }

    public async getVideoID(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETVIDEOID, _clientAddress, options)
    }

    public async getAddress(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETADDRESS, _clientAddress, options)
    }       
    
    public async getCountry(_clientAddress: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.GETCOUNTRY, _clientAddress, options)
    }

}