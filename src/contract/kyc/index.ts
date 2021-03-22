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
     * @param {address _client, bool _status} 
     * @returns 
     */
    public setStatus(params: SetStatus): any {
        return this.callContract(FUNCTIONS.SETSTATUS, params)
    }

    /**
     * The issuer as well as the investor can fetch the investor’s KYC status using the getKYC API.
     * @param {address _client} 
     * @returns {bool}
     * Note : KYC status needs to be ‘true’ for the investor to carry out any further operations in the Dapp.
     */
    public getStatus(params: GetStatus): any {
        return this.callContract(FUNCTIONS.GETSTATUS, params)
    }

    /**
     * If an issuer accepts or rejects the investor’s KYC, the transaction will trigger an event on the
     * blockchain that should be filtered using etherjs and displayed to the investor.
     * @param {address indexed client, bool status}
     * @returns {bool}
     * The investor facing Dapp should filter the event with the investor’s address mapped to ‘client’ in the event below.
     */
    public kycUpdate(params: KycUpdate): any {
        return this.callContract(FUNCTIONS.KYCUPDATE, params)
    }

    /**
     * The investor can fill up its KYC using an API. This API call needs to be preceded by uploading the KYC documents 
     * (eg, photo ID, video ID, etc) to IPFS and using the IPFS urls in the API. Instead of uploading to IPFS, 
     * we may also plug in a third party KYC management system, so please check before implementing. 
     * @param {client, file, address, photoId, videoId, fatca, crs} 
     * @returns 
     */
    public updateKycRecord(params: KycUpdate): VOID {
        return this.callContract(FUNCTIONS.UPDATEKYCRECORD, params)
    }

    private setFile(params: SetFile): void {
        return this.callContract(FUNCTIONS.SETFILE, params)
    }

    private setFATCA(params: SetFATCA): void {
        return this.callContract(FUNCTIONS.SETFATCA, params)
    }

    private setCRS(params: SetCRS): void {
        return this.callContract(FUNCTIONS.SETCRS, params)
    }

    private setPhotoID(params: SetPhotoID): void {
        return this.callContract(FUNCTIONS.SETPHOTOID, params)
    }

    private setVideoID(params: SetVideoID): void {
        return this.callContract(FUNCTIONS.SETVIDEOID, params)
    }

    private setAddress(params: SetAddress): void {
        return this.callContract(FUNCTIONS.SETADDRESS, params)
    }
}