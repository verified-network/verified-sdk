// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Kyc.json';
import { contractAddress } from '../../contractAddress/index';
import { SetStatus, GetStatus, KycUpdate, SetFile, SetFATCA, SetCRS, SetPhotoID, SetVideoID, SetAddress } from '../../models/kyc';

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
    UPDATEKYCRECORD = 'updateKycRecord'
}

export default class KYCContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    /**
     * An issuer can ‘accept’ or ‘reject’ KYC using the setKYC API.
     * @param (address _client, bool _status) 
     * @returns 
     */
    public setStatus(_clientAddress: string, _status: boolean, options?: { gasLimit, gasPrice }): any {
        return this.callContract(FUNCTIONS.SETSTATUS, _clientAddress, _status, options)
    }

    /**
     * The issuer as well as the investor can fetch the investor’s KYC status using the getKYC API.
     * @param (address _client) 
     * @returns bool
     * Note : KYC status needs to be ‘true’ for the investor to carry out any further operations in the Dapp.
     */
    public getStatus(_clientAddress: string, options?: { gasPrice, gasLimit }): any {
        return this.callContract(FUNCTIONS.GETSTATUS, params, options)
    }

    /**
     * If an issuer accepts or rejects the investor’s KYC, the transaction will trigger an event on the
     * blockchain that should be filtered using etherjs and displayed to the investor.
     * @param (address indexed client, bool status)
     * @returns bool
     * The investor facing Dapp should filter the event with the investor’s address mapped to ‘client’ in the event below.
     */
    public kycUpdate(params: KycUpdate, options?: { gasPrice, gasLimit }): any {
        return this.callContract(FUNCTIONS.KYCUPDATE, params, options)
    }

    /**
     * The investor can fill up its KYC using an API. This API call needs to be preceded by uploading the KYC documents 
     * (eg, photo ID, video ID, etc) to IPFS and using the IPFS urls in the API. Instead of uploading to IPFS, 
     * we may also plug in a third party KYC management system, so please check before implementing. 
     * @param (client: string, file: string, address: string, photoId: string, videoId: string, fatca: string, crs: string) 
     * @returns 
     */
    public async updateKycRecord(client: string, file: string, address: string, photoId: string, videoId: string, fatca: string, crs: string, options?: { gasPrice, gasLimit }): void {
        const setFile = this.setFile(client, file,)
        const setAddress = this.setAddress(client, address)
        const setPhotoID = this.setPhotoID(client, photoId)
        const setVideoID = this.setVideoID(client, videoId)
        const setFATCA = this.setFATCA(client, fatca)
        const setCR = this.setCRS(client, crs)
        const response = await Promise.allSettled([setFile, setAddress, setPhotoID, setVideoID, setFATCA, setCR])
        return response
    }

    private async setFile(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETFILE, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }

    private async setFATCA(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETFATCA, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }

    private async setCRS(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETCRS, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }

    private async setPhotoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETPHOTOID, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }

    private async setVideoID(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETVIDEOID, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }

    private async setAddress(_clientAddress: string, _file: string, options?: { gasPrice, gasLimit }): void {
        return this.callContract(FUNCTIONS.SETADDRESS, _clientAddress, this.sanitiseInput('Byte32', _file), options)
    }
}