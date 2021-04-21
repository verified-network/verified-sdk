// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Kyc.json';
import { contractAddress } from '../../contractAddress/index';
import { DATATYPES } from "../index";

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
    UPDATEKYCRECORD = 'updateKycRecord',
    GETFILE = 'getFile',
    GETFATCA = 'getFATCA',
    GETCRS = 'getCRS',
    GETPHOTOID = 'getPhotoID',
    GETVIDEOID = 'getVideoID',
    GETADDRESS = 'getAddress',
}

export default class KYCContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * An issuer can ‘accept’ or ‘reject’ KYC using the setKYC API.
     * @param (address _client, bool _status) 
     * @returns 
     */
    public async setStatus(_clientAddress: string, _status: boolean, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.BOOLEAN, _status)
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
     * @param (client: string, file: string, address: string, photoId: string, videoId: string, fatca: string, crs: string) 
     * @returns 
     */
    public async updateKycRecord(_clientAddress: string, _file: string, address: string, photoId: string, videoId: string, fatca: string, crs: string, options?: { gasPrice, gasLimit }): void {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.STRING, _file)
        await this.validateInput(DATATYPES.STRING, address)
        await this.validateInput(DATATYPES.STRING, photoId)
        await this.validateInput(DATATYPES.STRING, videoId)
        await this.validateInput(DATATYPES.STRING, fatca)
        await this.validateInput(DATATYPES.STRING, crs)

        const setFile = this.setFile(_clientAddress, _file,)
        const setAddress = this.setAddress(_clientAddress, address)
        const setPhotoID = this.setPhotoID(_clientAddress, photoId)
        const setVideoID = this.setVideoID(_clientAddress, videoId)
        const setFATCA = this.setFATCA(_clientAddress, fatca)
        const setCR = this.setCRS(_clientAddress, crs)
        const response = await Promise.allSettled([setFile, setAddress, setPhotoID, setVideoID, setFATCA, setCR])
        return response
    }

    public async setFile(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETFILE, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setFATCA(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETFATCA, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setCRS(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETCRS, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setPhotoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETPHOTOID, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setVideoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETVIDEOID, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
    }

    public async setAddress(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETADDRESS, _clientAddress, this.sanitiseInput(DATATYPES.BYTE32, _file), options)
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
}