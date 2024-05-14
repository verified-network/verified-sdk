import { ethers } from "ethers";
export declare class Provider extends ethers.providers.JsonRpcProvider {
    constructor(url?: string, network?: string | number);
    static defaultProvider(network: string | number): ethers.providers.BaseProvider;
    static infuraProvider(network: string | number, key: string): ethers.providers.InfuraProvider;
    static alchemyProvider(network: string | number, key: string): ethers.providers.AlchemyProvider;
}
