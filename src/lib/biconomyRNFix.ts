import {
  concat,
  concatHex,
  createPublicClient,
  createWalletClient,
  custom,
  domainSeparator,
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  erc20Abi,
  getAddress,
  getContract,
  getTypesForEIP712Domain,
  hexToBytes,
  keccak256,
  pad,
  parseAbi,
  parseAbiParameters,
  publicActions,
  toBytes,
  toHex,
  zeroAddress,
  zeroHash,
} from "viem";
import BOOSTRAP from "./abi/boostrap.json";
import FACTORY from "./abi/factory.json";
import { type Prettify, stringify } from "viem";
import { EntrypointAbi } from "./abi/entrypoint";
import {
  entryPoint07Address,
  getUserOperationHash,
  toSmartAccount,
} from "viem/account-abstraction";
import { signTypedData, toAccount } from "viem/accounts";
import { getAction } from "viem/utils";
import { COMPOSABILITY_MODULE_ABI } from "./abi/composability";

const NEXUS_ACCOUNT_FACTORY_ADDRESS =
  "0x000000001D1D5004a02bAfAb9de2D6CE5b7B13de";
const NEXUS_BOOTSTRAP_ADDRESS = "0x00000000D3254452a909E4eeD47455Af7E27C289";
const DUMMY_SIGNATURE =
  "0x81d4b4981670cb18f99f0b4a66446df1bf5b204d24cfcb659bf38ba27a4359b5711649ec2423c5e1247245eba2964679b6a1dbb85c992ae40b9b00c6935b02ff1b";
const ENTRY_POINT_ADDRESS: any = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const ENTRYPOINT_SIMULATIONS_any: any =
  "0x74Cb5e4eE81b86e70f9045036a1C5477de69eE87";

export const CALLTYPE_SINGLE: any = "0x00"; // 1 byte
export const CALLTYPE_BATCH: any = "0x01"; // 1 byte
export const EXECTYPE_DEFAULT: any = "0x00"; // 1 byte
export const EXECTYPE_TRY: any = "0x01"; // 1 byte
export const EXECTYPE_DELEGATE: any = "0xFF"; // 1 byte
export const MODE_DEFAULT: any = "0x00000000"; // 4 bytes
export const UNUSED: any = "0x00000000"; // 4 bytes
export const MODE_PAYLOAD: any =
  "0x00000000000000000000000000000000000000000000"; // 22 bytes

const EXECUTE_SINGLE = concat([
  CALLTYPE_SINGLE,
  EXECTYPE_DEFAULT,
  MODE_DEFAULT,
  UNUSED,
  MODE_PAYLOAD,
]);

export const EXECUTE_BATCH = concat([
  CALLTYPE_BATCH,
  EXECTYPE_DEFAULT,
  MODE_DEFAULT,
  UNUSED,
  MODE_PAYLOAD,
]);

export const PARENT_TYPEHASH =
  "TypedDataSign(Contents contents,string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)Contents(bytes32 stuff)";

const index = BigInt(0);

const toInitData = (mod: any) => {
  const module = mod.module || mod.address;
  const data = mod.initData || mod.data;
  if (!module || !data) {
    throw new Error("Module or data is missing");
  }
  return { module, data };
};

const getInitData = (params: any) =>
  encodeAbiParameters(
    [
      { name: "bootstrap", type: "address" },
      { name: "initData", type: "bytes" },
    ],
    [
      params.bootStrapAddress,
      encodeFunctionData({
        abi: BOOSTRAP.abi,
        functionName: "initNexusWithDefaultValidatorAndOtherModulesNoRegistry",
        args: [
          params.defaultValidator.data,
          params.validators,
          params.executors,
          params.hook,
          params.fallbacks,
          params.prevalidationHooks,
        ],
      }),
    ],
  );

const toValidator = (parameters: any) => {
  const {
    deInitData = "0x",
    type = "validator",
    signer,
    data = "0x",
    module,
    ...rest
  } = parameters;
  return {
    deInitData,
    data,
    module,
    address: module,
    signer,
    type,
    getStubSignature: async () => DUMMY_SIGNATURE,
    signUserOpHash: async (userOpHash: any) =>
      await signer.signMessage({ message: { raw: userOpHash } }),
    signMessage: async (message: any) => await signer.signMessage({ message }),
    ...rest,
  };
};

const toDefaultModule = (parameters: any) =>
  toValidator({
    initData: parameters.signer.address,
    data: parameters.signer.address,
    deInitData: "0x",
    ...parameters,
    address: zeroAddress,
    module: zeroAddress,
    type: "validator",
    getStubSignature: async () => DUMMY_SIGNATURE,
  });

const toEmptyHook = () => ({
  module: zeroAddress,
  data: zeroHash,
});

export const computeNexusAccount = async (
  chain: any,
  transport: any,
  signer: any,
) => {
  const publicClient = createPublicClient({ chain, transport });

  const defaultValidator = toDefaultModule({ signer });
  const validators: any[] = [];
  const executors: any[] = [];
  const hook = toEmptyHook();
  const fallbacks: any[] = [];
  const registryAddress = zeroAddress;
  const factoryAddress = NEXUS_ACCOUNT_FACTORY_ADDRESS;
  const bootStrapAddress = NEXUS_BOOTSTRAP_ADDRESS;
  const prevalidationHooks: any[] = [];

  const initData = getInitData({
    defaultValidator: toInitData(defaultValidator),
    validators: validators.map(toInitData),
    executors: executors.map(toInitData),
    hook: toInitData(hook),
    fallbacks: fallbacks.map(toInitData),
    registryAddress,
    bootStrapAddress,
    prevalidationHooks,
  });

  const salt = pad(toHex(index), { size: 32 });
  const nexusAccount: any = await publicClient.readContract({
    address: factoryAddress,
    abi: FACTORY.abi,
    functionName: "computeAccountAddress",
    args: [initData, salt],
  });
  if (nexusAccount?.toLowerCase() !== zeroAddress?.toLowerCase()) {
    return nexusAccount;
  }
  return;
};

const computeNexusAddress = async ({
  chain,
  transport,
  index,
  initData,
  factoryAddress = NEXUS_ACCOUNT_FACTORY_ADDRESS,
}: {
  chain: any;
  transport: any;
  index: any;
  initData: any;
  factoryAddress?: any;
}) => {
  const publicClient = createPublicClient({ chain, transport });

  const salt = pad(toHex(index), { size: 32 });

  const address = await publicClient.readContract({
    address: factoryAddress,
    abi: FACTORY.abi,
    functionName: "computeAccountAddress",
    args: [initData, salt],
  });

  if (!address || address === zeroAddress) {
    throw new Error("Failed to compute Nexus account address");
  }

  return address;
};

const buildInitCode = ({
  factoryAddress = NEXUS_ACCOUNT_FACTORY_ADDRESS,
  factoryData,
}: {
  factoryAddress?: any;
  factoryData: any;
}) => {
  return concatHex([factoryAddress, factoryData]);
};

const sanitizeUrl = (value: string) => {
  return value.replace(/https?:\/\/[^\s]+/g, "");
};

class NonceManager {
  private static instance: NonceManager;
  private isNonceKeyBeingCalculated = new Map<string, boolean>();

  private constructor() {}

  public static getInstance(): NonceManager {
    if (!NonceManager.instance) {
      NonceManager.instance = new NonceManager();
    }
    return NonceManager.instance;
  }

  private buildNonceStoreKey(accountAddress: any, chainId: number) {
    return `${accountAddress.toLowerCase()}::${chainId}`;
  }

  public async getDefaultNonceKey(
    accountAddress: any,
    chainId: number,
  ): Promise<bigint> {
    const storeKey = this.buildNonceStoreKey(accountAddress, chainId);

    while (this.isNonceKeyBeingCalculated.get(storeKey)) {
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    this.isNonceKeyBeingCalculated.set(storeKey, true);
    const key = BigInt(Date.now());

    await new Promise((resolve) => setTimeout(resolve, 1));
    this.isNonceKeyBeingCalculated.set(storeKey, false);

    return key;
  }

  public async getNonceWithKey(
    client: any,
    accountAddress: any,
    parameters: any,
  ) {
    const TIMESTAMP_ADJUSTMENT = BigInt(16777215);

    const { key: key_, validationMode, moduleAddress } = parameters;

    try {
      const adjustedKey = BigInt(key_) % TIMESTAMP_ADJUSTMENT;
      const key: any = concat([
        toHex(adjustedKey, { size: 3 }),
        validationMode,
        moduleAddress,
      ]);

      const entryPointContract: any = getContract({
        address: ENTRY_POINT_ADDRESS,
        abi: EntrypointAbi,
        client,
      });

      const nonce = await entryPointContract.read.getNonce([
        accountAddress,
        BigInt(key),
      ]);

      return { nonceKey: BigInt(key), nonce };
    } catch (error) {
      const errorMessage = (error as Error).message ?? "RPC issue";
      throw new Error(
        `Failed to fetch nonce due to the error: ${sanitizeUrl(errorMessage)}`,
      );
    }
  }
}

const getDefaultNonceKey = async (
  accountAddress: any,
  chainId: number,
): Promise<bigint> => {
  const manager = NonceManager.getInstance();
  return manager.getDefaultNonceKey(accountAddress, chainId);
};

const getNonceWithKeyUtil = async (
  client: any,
  accountAddress: any,
  parameters: any,
) => {
  const manager = NonceManager.getInstance();
  return manager.getNonceWithKey(client, accountAddress, parameters);
};

const buildNexusRuntime = ({
  chain,
  transport,
  signer,
  index,
  factoryAddress = NEXUS_ACCOUNT_FACTORY_ADDRESS,
  factoryData,
  initData,
  defaultValidator,
  meeConfig,
  walletClient,
}: {
  chain: any;
  transport: any;
  signer: any;
  index: any;
  factoryAddress?: any;
  factoryData: any;
  initData: any;
  defaultValidator: any;
  meeConfig: any;
  walletClient: any;
}) => {
  const publicClient = createPublicClient({ chain, transport });
  let cachedAddress: any;
  let module = defaultValidator;

  // Lazy counterfactual address
  const getAddress = async (): Promise<string> => {
    if (cachedAddress) return cachedAddress;

    cachedAddress = await computeNexusAddress({
      chain,
      transport,
      index,
      initData,
      factoryAddress,
    });

    return cachedAddress;
  };

  // Init code for deployment / bundlers
  const getInitCode = (): any => concatHex([factoryAddress, factoryData]);

  // Module management
  const setModule = (newModule: typeof module) => {
    module = newModule;
  };
  const getModule = (): typeof module => module;

  // Nonce with key
  const getNonceWithKey = async (
    accountAddress: string,
    params?: {
      key?: bigint;
      validationMode?: "0x00" | "0x01" | "0x02";
      moduleAddress?: string;
    },
  ) => {
    const key =
      params?.key ?? (await getDefaultNonceKey(accountAddress, chain.id));
    const moduleAddress = params?.moduleAddress ?? module.module;
    const validationMode = params?.validationMode ?? "0x00";

    return getNonceWithKeyUtil(publicClient, accountAddress, {
      key,
      validationMode,
      moduleAddress,
    });
  };

  // User operation hash
  const getUserOpHash = (userOp: any): any => {
    return getUserOperationHash({
      chainId: chain.id,
      entryPointAddress: entryPoint07Address,
      entryPointVersion: "0.7",
      userOperation: userOp,
    });
  };

  const toDelegation = async (params?: any) => {
    const {
      authorization: authorization_,
      multiChain,
      delegatedContract,
      chainId,
    } = params || {};

    const contractAddress =
      delegatedContract || meeConfig.implementationAddress;

    const authorization: any =
      authorization_ ||
      (await walletClient.signAuthorization({
        contractAddress,
        chainId: multiChain ? 0 : chainId,
      }));

    const eip7702Auth: any = {
      chainId: `0x${authorization.chainId.toString(16)}` as any,
      address: authorization.address as any,
      nonce: `0x${authorization.nonce.toString(16)}` as any,
      r: authorization.r as any,
      s: authorization.s as any,
      yParity: `0x${authorization.yParity!.toString(16)}` as any,
    };

    return eip7702Auth;
  };

  const isDelegated = async () => {
    const code = await publicClient.getCode({ address: signer.address });
    return (
      !!code &&
      code
        ?.toLowerCase()
        .includes(meeConfig.implementationAddress.substring(2).toLowerCase())
    );
  };

  const unDelegate = async (params?: any) => {
    const { authorization } = params || {};

    const deAuthorization: any =
      authorization ||
      (await walletClient.signAuthorization({
        address: zeroAddress,
        executor: "self",
      }));

    return await walletClient.sendTransaction({
      to: signer.address,
      data: "0xdeadbeef",
      type: "eip7702",
      authorizationList: [deAuthorization],
    });
  };

  return {
    getAddress,
    getInitCode,
    publicClient,
    signer,
    module,
    setModule,
    getModule,
    getNonceWithKey,
    getUserOpHash,
    isDelegated,
    toDelegation,
    unDelegate,
  };
};

const encodeExecuteBatch = async (calls: any[], mode: any = EXECUTE_BATCH) => {
  const executionAbiParams: any = {
    type: "tuple[]",
    components: [
      { name: "target", type: "address" },
      { name: "value", type: "uint256" },
      { name: "callData", type: "bytes" },
    ],
  };
  const executions = calls.map((tx) => ({
    target: tx.to,
    callData: tx.data ?? "0x",
    value: BigInt(tx.value ?? BigInt(0)),
  }));

  const executionCalldataPrep = encodeAbiParameters(
    [executionAbiParams],
    [executions],
  );
  return encodeFunctionData({
    abi: parseAbi([
      "function execute(bytes32 mode, bytes calldata executionCalldata) external",
    ]),
    functionName: "execute",
    args: [mode, executionCalldataPrep],
  });
};

const encodeExecute = async (call: any, mode: any = EXECUTE_SINGLE) => {
  const executionCalldata = encodePacked(
    ["address", "uint256", "bytes"],
    [
      call.to as any,
      BigInt(call.value ?? BigInt(0)),
      (call.data ?? "0x") as any,
    ],
  );

  return encodeFunctionData({
    abi: parseAbi([
      "function execute(bytes32 mode, bytes calldata executionCalldata) external",
    ]),
    functionName: "execute",
    args: [mode, executionCalldata],
  });
};

const encodeExecuteComposable = async (calls: any[]) => {
  const composableCalls: any[] = calls.map((call) => {
    return {
      to: call.to,
      value: call.value ?? BigInt(0),
      functionSig: call.functionSig,
      inputParams: call.inputParams,
      outputParams: call.outputParams,
    };
  });

  return encodeFunctionData({
    abi: COMPOSABILITY_MODULE_ABI,
    functionName: "executeComposable",
    args: [composableCalls],
  });
};

const signMessage = async (message: any, module: any): Promise<any> => {
  const tempSignature = await module.signMessage(message);
  return encodePacked(["address", "bytes"], [module.module, tempSignature]);
};

const signUserOperation = async (
  userOpHash: any,
  module: { module: string; signUserOpHash: (hash: any) => Promise<any> },
): Promise<any> => {
  return module.signUserOpHash(userOpHash);
};

const toSigner = async ({
  signer,
  address,
}: {
  signer: any;
  address?: any;
}) => {
  if (!signer) {
    throw new Error("Signer is required");
  }

  if ("provider" in signer) {
    const wallet = signer as any;
    const address = await wallet.getAddress();
    return toAccount({
      address: getAddress(address),
      async signMessage({ message }) {
        if (typeof message === "string") {
          return await wallet.signMessage(message);
        }
        if (typeof message?.raw === "string") {
          return await wallet.signMessage(hexToBytes(message.raw));
        }
        return await wallet.signMessage(message.raw);
      },
      async signTransaction(_) {
        throw new Error("Not supported");
      },
      async signTypedData(typedData) {
        return wallet.signTypedData(
          typedData.domain,
          typedData.types,
          typedData.message,
        );
      },
    });
  }

  if ("type" in signer && signer.type === "local") {
    return signer as any;
  }

  let walletClient: any = undefined;

  if ("request" in signer) {
    if (!address) {
      try {
        [address] = await (signer as any).request({
          method: "eth_requestAccounts",
        });
      } catch {
        [address] = await (signer as any).request({
          method: "eth_accounts",
        });
      }
    }

    if (!address) {
      // For TS to be happy
      throw new Error("address is required");
    }
    walletClient = createWalletClient({
      account: address,
      transport: custom(signer as any),
    });
  }

  if (!walletClient) {
    walletClient = signer as any;
  }

  const addressFromWalletClient: any =
    walletClient?.account?.address ?? (await walletClient?.getAddresses())?.[0];

  if (!addressFromWalletClient) {
    throw new Error("address not found in wallet client");
  }

  return toAccount({
    address: addressFromWalletClient,
    async signMessage({ message }) {
      return walletClient.signMessage({ message });
    },
    async signTypedData(typedData) {
      return getAction(
        walletClient,
        signTypedData,
        "signTypedData",
      )(typedData as any);
    },
    async signTransaction(_) {
      throw new Error("Not supported");
    },
  });
};

const toWalletClient = ({
  unresolvedSigner,
  resolvedSigner,
  chain,
  transport,
}: any) => {
  const browserSigner = unresolvedSigner?.transport?.key === "custom";
  return createWalletClient(
    browserSigner
      ? {
          account: resolvedSigner.address,
          chain,
          // @ts-ignore
          transport: custom(window?.ethereum),
        }
      : {
          account: resolvedSigner,
          chain,
          transport,
        },
  ).extend(publicActions) as any;
};

const prepareValidators = async (
  signer: any,
  meeConfig: any,
  customValidators?: any[],
) => {
  return [];
};

const prepareExecutors = (meeConfig: any, customExecutors?: any[]) => {
  let executors: any[] = [];

  executors = customExecutors || [];

  return executors;
};

const prepareFallbacks = (meeConfig: any, customFallbacks?: any[]) => {
  let fallbacks: any[] = [];

  fallbacks = customFallbacks || [];

  return fallbacks;
};

const getInitDataNoRegistry = (params: any) => {
  try {
    return encodeAbiParameters(
      [
        { name: "bootstrap", type: "address" },
        { name: "bootstrapData", type: "bytes" },
      ],
      [
        params.bootStrapAddress,
        encodeFunctionData({
          abi: BOOSTRAP?.abi,
          functionName:
            "initNexusWithDefaultValidatorAndOtherModulesNoRegistry",
          args: [
            params.defaultValidator.data,
            params.validators,
            params.executors,
            params.hook,
            params.fallbacks,
            params.prevalidationHooks,
          ],
        }),
      ],
    );
  } catch (err) {
    console.error("getInitDataNoRegistry failed with error: ", err);
  }
};

const getFactoryData = (parameters: any) => {
  const { index, initData } = parameters;

  const salt = pad(toHex(index), { size: 32 });

  return encodeFunctionData({
    abi: parseAbi([
      "function createAccount(bytes initData, bytes32 salt) external returns (address)",
    ]),
    functionName: "createAccount",
    args: [initData, salt],
  });
};

const prepareFactoryData = (
  meeConfig: any,
  initDataParams: any,
): { initData: any; factoryData: any } => {
  let factoryData: any = "0x";
  let initData: any = "0x";

  initData =
    initDataParams.customInitData ||
    getInitDataNoRegistry({
      defaultValidator: initDataParams.defaultValidator,
      prevalidationHooks: initDataParams.prevalidationHooks,
      validators: initDataParams.validators,
      executors: initDataParams.executors,
      hook: initDataParams.hook,
      fallbacks: initDataParams.fallbacks,
      bootStrapAddress: meeConfig.bootStrapAddress,
    });

  factoryData = getFactoryData({
    initData,
    index: initDataParams.accountIndex,
  });

  return { initData, factoryData };
};

const getAccountDomainStructFields = async (
  publicClient: any,
  accountAddress: any,
) => {
  const accountDomainStructFields = (await publicClient.readContract({
    address: accountAddress,
    abi: parseAbi([
      "function eip712Domain() public view returns (bytes1 fields, string memory name, string memory version, uint256 chainId, address verifyingContract, bytes32 salt, uint256[] memory extensions)",
    ]),
    functionName: "eip712Domain",
  })) as any;

  const [, name, version, chainId, verifyingContract, salt] =
    accountDomainStructFields;

  const params = parseAbiParameters([
    "bytes32",
    "bytes32",
    "uint256",
    "address",
    "bytes32",
  ]);

  return encodeAbiParameters(params, [
    keccak256(toBytes(name)),
    keccak256(toBytes(version)),
    chainId,
    verifyingContract,
    salt,
  ]);
};

const eip712WrapHash = (typedHash: any, appDomainSeparator: any): any =>
  keccak256(concat(["0x1901", appDomainSeparator, typedHash]));

const typeToString = (typeDef: any) => {
  return Object.entries(typeDef).map(([key, fields]) => {
    const fieldArray = Array.isArray(fields) ? fields : [];
    const fieldStrings = fieldArray
      .map((field: any) => `${field.type} ${field.name}`)
      .join(",");
    return `${key}(${fieldStrings})`;
  });
};

export const createNexusAccount = async ({
  chain,
  transport,
  _signer,
  index = BigInt(0),
  customValidators,
  customExecutors,
  customHook,
  customFallbacks,
  customPrevalidationHooks,
  customInitData,
  meeConfig,
}: {
  chain: any;
  transport: any;
  _signer: any;
  index?: bigint;
  customValidators?: any;
  customExecutors?: any;
  customHook?: any;
  customFallbacks?: any;
  customPrevalidationHooks?: any;
  customInitData?: any;
  meeConfig: any;
}) => {
  const publicClient = createPublicClient({ chain, transport });

  const addressesToDeploymentSet = new Set([
    meeConfig.bootStrapAddress,
    meeConfig.defaultValidatorAddress,
    meeConfig.validatorAddress,
    meeConfig.factoryAddress,
    meeConfig.implementationAddress,
  ]);

  if (meeConfig.moduleRegistry) {
    addressesToDeploymentSet.add(meeConfig.moduleRegistry.registryAddress);
  }

  if (meeConfig.composableModuleAddress) {
    addressesToDeploymentSet.add(meeConfig.composableModuleAddress);
  }

  // Filtering zero address because sometimes the default validator is zeroAddress which needs to be excluded
  const addressesToDeploymentCheck = [...addressesToDeploymentSet].filter(
    (address) => address !== zeroAddress,
  );

  await Promise.all(
    addressesToDeploymentCheck.map(async (address) => {
      // Checks if the MEE contracts are deployed or not
      // This ensures the MEE version suite is supported or not for the chain
      const bytecode = await publicClient.getCode({
        address,
      });

      if (!bytecode || bytecode === "0x") {
        console.debug(
          `MEE version (${meeConfig.version}) is not supported for the ${chain.name} chain. Contract address (${address}) is not deployed`,
        );

        throw new Error(
          `MEE version (${meeConfig.version}) is not supported for the ${chain.name} chain.`,
        );
      }
    }),
  );

  const signer = await toSigner({ signer: _signer });

  const walletClient = toWalletClient({
    unresolvedSigner: _signer,
    resolvedSigner: signer,
    chain,
    transport,
  });

  // Prepare validator modules
  const validators: any[] = await prepareValidators(
    signer,
    meeConfig,
    customValidators,
  );

  const defaultValidator = toDefaultModule({ signer });

  // For 1.2.x accounts, no explicit validators will be added. So default validator will be used
  let module = validators[0] || defaultValidator;

  // Prepare executor modules
  const executors = prepareExecutors(meeConfig, customExecutors);

  // Prepare hook module
  const hook = customHook || toEmptyHook();

  // Prepare fallback modules
  const fallbacks = prepareFallbacks(meeConfig, customFallbacks);

  // Generate the initialization data for the account using the initNexus function
  const prevalidationHooks = customPrevalidationHooks || [];

  // prepare factory data
  const { initData, factoryData } = prepareFactoryData(meeConfig, {
    accountIndex: index,
    defaultValidator: toInitData(defaultValidator),
    prevalidationHooks,
    validators: validators.map(toInitData),
    executors: executors.map(toInitData),
    hook: toInitData(hook),
    fallbacks: fallbacks.map(toInitData),
    customInitData,
  });

  let accountId;
  if (meeConfig?.implementationAddress) {
    accountId = (await publicClient.readContract({
      address: meeConfig.implementationAddress,
      abi: parseAbi(["function accountId() public view returns (string)"]),
      functionName: "accountId",
      args: [],
    })) as any;
  }

  const runtime = buildNexusRuntime({
    chain,
    transport,
    signer,
    index,
    factoryAddress: NEXUS_ACCOUNT_FACTORY_ADDRESS,
    factoryData,
    initData,
    defaultValidator,
    meeConfig,
    walletClient,
  });

  const getNonce = async (parameters?: {
    key?: bigint;
    validationMode?: "0x00" | "0x01" | "0x02";
    moduleAddress?: any;
  }) => {
    const accountAddress = await runtime.getAddress();

    const { nonce } = await runtime.getNonceWithKey(accountAddress, parameters);
    return nonce;
  };

  const signTypedData = async (parameters: any) => {
    const { message, primaryType, types: _types, domain } = parameters;

    if (!domain) throw new Error("Missing domain");
    if (!message) throw new Error("Missing message");

    const types = {
      EIP712Domain: getTypesForEIP712Domain({ domain }),
      ..._types,
    };

    // @ts-ignore: Comes from nexus parent typehash
    const messageStuff: Hex = message.stuff;

    // @ts-ignore
    validateTypedData({
      domain,
      message,
      primaryType,
      types,
    });

    const appDomainSeparator = domainSeparator({ domain });
    const accountDomainStructFields = await getAccountDomainStructFields(
      publicClient,
      await runtime.getAddress(),
    );

    const parentStructHash = keccak256(
      encodePacked(
        ["bytes", "bytes"],
        [
          encodeAbiParameters(parseAbiParameters(["bytes32, bytes32"]), [
            keccak256(toBytes(PARENT_TYPEHASH)),
            messageStuff,
          ]),
          accountDomainStructFields,
        ],
      ),
    );

    const wrappedTypedHash = eip712WrapHash(
      parentStructHash,
      appDomainSeparator,
    );

    let signature = await module.signMessage({
      raw: toBytes(wrappedTypedHash),
    });
    const contentsType = toBytes(typeToString(types as any)[1]);

    const signatureData = concatHex([
      signature,
      appDomainSeparator,
      messageStuff,
      toHex(contentsType),
      toHex(contentsType.length, { size: 2 }),
    ]);

    signature = encodePacked(
      ["address", "bytes"],
      [module.module, signatureData],
    );

    return signature;
  };

  return toSmartAccount({
    client: publicClient,
    entryPoint: {
      abi: EntrypointAbi,
      address: ENTRY_POINT_ADDRESS,
      version: "0.7",
    },
    getAddress: runtime.getAddress as any,
    encodeCalls: (calls: any) => {
      return calls.length === 1
        ? encodeExecute(calls[0], runtime.module)
        : encodeExecuteBatch(calls, runtime.module);
    },
    getFactoryArgs: async () => ({
      factory: meeConfig.factoryAddress,
      factoryData,
    }),
    getStubSignature: async () => module.getStubSignature(),
    /**
     * @description Signs a message
     * @param params - The parameters for signing
     * @param params.message - The message to sign
     * @returns The signature
     */
    async signMessage({ message }: { message: any }) {
      const tempSignature = await module.signMessage(message);
      return encodePacked(["address", "bytes"], [module.module, tempSignature]);
    },
    signTypedData,
    signUserOperation: async (
      parameters: any & {
        chainId?: number | undefined;
      },
    ) => {
      const { chainId = publicClient.chain.id, ...userOpWithoutSender } =
        parameters;
      const address = await runtime.getAddress();

      const userOperation = {
        ...userOpWithoutSender,
        sender: address,
      };

      const hash = getUserOperationHash({
        chainId,
        entryPointAddress: entryPoint07Address,
        entryPointVersion: "0.7",
        userOperation,
      });
      return await module.signUserOpHash(hash);
    },
    getNonce,

    extend: {
      entryPointAddress: entryPoint07Address,
      accountId,
      encodeExecute,
      encodeExecuteBatch,
      encodeExecuteComposable,
      factoryData,
      registryAddress: meeConfig.moduleRegistry?.registryAddress || zeroAddress,
      walletClient,
      version: meeConfig,
      isDelegated: runtime.isDelegated,
      toDelegation: runtime.toDelegation,
      unDelegate: runtime.unDelegate,
      getAddress: runtime.getAddress,
      getInitCode: runtime.getInitCode,
      getNonceWithKey: runtime.getNonceWithKey,
      getUserOpHash: runtime.getUserOpHash,
      setModule: runtime.setModule,
      getModule: runtime.getModule,
      factoryAddress: NEXUS_ACCOUNT_FACTORY_ADDRESS,
      signer: runtime.signer,
      publicClient: runtime.publicClient,
      chain,
      module: runtime.module,
    },
  });
};

const buildChainConfigurations = (chains: any[], transports: any[]) => {
  if (chains.length !== transports.length) {
    throw new Error("chains and transports length mismatch");
  }

  return chains.map((chain, i) => ({
    chain,
    transport: transports[i],
  }));
};

export const buildDefaultInstructions = async (
  baseParams: any,
  instructions: any,
) => {
  const { currentInstructions = [] } = baseParams;
  return [
    ...currentInstructions,
    ...(Array.isArray(instructions) ? instructions : [instructions]),
  ];
};

const buildDecorator = async (baseParams: any, parameters: any) => {
  const { type, data } = parameters;

  switch (type) {
    // case "intent": {
    //   return buildIntent(baseParams, data)
    // }
    case "default": {
      return buildDefaultInstructions(baseParams, data);
    }
    // case "transferFrom": {
    //   return buildTransferFrom(baseParams, data)
    // }
    // case "transfer": {
    //   return buildTransfer(baseParams, data)
    // }
    // case "approve": {
    //   return buildApprove(baseParams, data)
    // }
    // case "withdrawal": {
    //   return buildWithdrawal(baseParams, data)
    // }
    // case "batch": {
    //   return buildBatch(baseParams, data)
    // }
    // case "multichain": {
    //   return buildMultichainInstructions(baseParams, data)
    // }
    default: {
      throw new Error(`Unknown build action type: ${type}`);
    }
  }
};

const getUnifiedERC20BalanceDecorator = async (parameters: any) => {
  const { mcToken, account: account_ } = parameters;

  const relevantTokensByChain = Array.from(mcToken.deployments).filter(
    ([chainId]: any) =>
      account_.deployments.some(
        (account: any) => account.client.chain?.id === chainId,
      ),
  );

  const balances = await Promise.all(
    relevantTokensByChain.map(async ([chainId, address]: any) => {
      const { publicClient, address: accountAddress } = account_.deploymentOn(
        chainId,
        true,
      );

      const tokenContract: any = getContract({
        abi: erc20Abi,
        address,
        client: publicClient,
      });
      const [balance, decimals] = await Promise.all([
        tokenContract.read.balanceOf([accountAddress]),
        tokenContract.read.decimals(),
      ]);

      return {
        balance,
        decimals,
        chainId,
      };
    }),
  );

  return {
    ...balances
      .map((balance) => {
        return {
          balance: balance.balance,
          decimals: balance.decimals,
        };
      })
      .reduce((curr, acc) => {
        if (curr.decimals !== acc.decimals) {
          throw Error(`
          Error while trying to fetch a unified ERC20 balance. The addresses provided
          in the mapping don't have the same number of decimals across all chains. 
          The function can't fetch a unified balance for token mappings with differing 
          decimals.
        `);
        }
        return {
          balance: curr.balance + acc.balance,
          decimals: curr.decimals,
        };
      }),
    breakdown: balances,
    mcToken,
  };
};

const waitForTransactionReceipts = async (parameters: any) => {
  const receipts = await Promise.all(
    parameters.account.deployments.map(({ publicClient }: any, i: any) =>
      publicClient.waitForTransactionReceipt({
        hash: parameters.hashes[i],
        confirmations: 5,
      }),
    ),
  );
  const failure = receipts.find((receipt: any) => receipt.status !== "success");
  return { receipts, status: failure ? failure.status : "success" };
};

const isDelegatedDecorator = async (parameters: any) =>
  (
    await Promise.all(
      parameters.account.deployments.map(({ isDelegated }: any) =>
        isDelegated(),
      ),
    )
  ).every(Boolean);

export const unDelegateDecorator = async (parameters: any) => {
  const hashes = await Promise.all(
    parameters.account.deployments.map(({ unDelegate }: any) => unDelegate()),
  );
  return await waitForTransactionReceipts({
    account: parameters.account,
    hashes,
  });
};

export const waitForTransactionReceiptsDecorator = async (parameters: any) => {
  const receipts = await Promise.all(
    parameters.account.deployments.map(({ publicClient }: any, i: any) =>
      publicClient.waitForTransactionReceipt({
        hash: parameters.hashes[i],
        confirmations: 5,
      }),
    ),
  );
  const failure = receipts.find((receipt) => receipt.status !== "success");
  return { receipts, status: failure ? failure.status : "success" };
};

export const createMultiChainNexusAccount = async (
  params: any,
): Promise<any> => {
  const {
    signer: unresolvedSigner,
    chains,
    transports,
    ...accountParameters
  } = params;

  if (!chains?.length) {
    throw new Error("No chains provided");
  }

  const chainConfigurations = buildChainConfigurations(chains, transports);

  if (chainConfigurations.length === 0) {
    throw new Error("No chain configuration provided");
  }

  const meeConfig = {
    version: "2.0.0",
    accountId: "biconomy.nexus.1.2.0",
    factoryAddress: "0x000000001D1D5004a02bAfAb9de2D6CE5b7B13de", // Nexus Account Factory Address
    bootStrapAddress: "0x00000000D3254452a909E4eeD47455Af7E27C289",
    implementationAddress: "0x000000004F43C49e93C970E84001853a70923B03",
    validatorAddress: "0x00000000d12897DDAdC2044614A9677B191A2d95", // K1 MEE Validator Address
    defaultValidatorAddress: zeroAddress,
    ethForwarderAddress: "0x000000Afe527A978Ecb761008Af475cfF04132a1",
  };

  // 🔁 Create one Nexus account per chain
  const deployments = await Promise.all(
    chainConfigurations.map(async ({ chain, transport }) =>
      createNexusAccount({
        chain,
        transport,
        _signer: unresolvedSigner,
        meeConfig,
        ...accountParameters,
      }),
    ),
  );

  /* -------------------------------------------------- */
  /* Deployment helpers                                  */
  /* -------------------------------------------------- */

  function deploymentOn(chainId: number, strictMode?: boolean) {
    const deployment = deployments.find(
      (dep) => dep.publicClient.chain?.id === chainId,
    );

    if (!deployment && strictMode) {
      throw new Error(`Deployment not found for chainId: ${chainId}`);
    }

    return deployment;
  }

  function addressOn(chainId: number, strictMode?: true) {
    return deploymentOn(chainId, strictMode)?.address;
  }

  /* -------------------------------------------------- */
  /* Base multichain account                              */
  /* -------------------------------------------------- */

  const baseAccount = {
    signer: deployments[0].signer, // resolved signer
    deployments,
    deploymentOn,
    addressOn,
  };

  // /* -------------------------------------------------- */
  // /* Decorators (SDK parity)                              */
  // /* -------------------------------------------------- */

  const getUnifiedERC20Balance = (mcToken: any) =>
    getUnifiedERC20BalanceDecorator({
      mcToken,
      account: baseAccount,
    });

  const build = (params: any, currentInstructions?: any[]) =>
    buildDecorator(
      {
        currentInstructions,
        accountAddress: baseAccount.signer.address,
      },
      params,
    );

  // const buildComposable = (
  //   params: any,
  //   currentInstructions?: any[]
  // ) =>
  //   buildComposableDecorator(
  //     {
  //       currentInstructions,
  //       accountAddress: baseAccount.signer.address
  //     },
  //     params
  //   )

  // const buildBridgeInstructions = (
  //   params: any
  // ) =>
  //   buildBridgeInstructionsDecorator({
  //     ...params
  //   })

  // const queryBridge = (params: any) =>
  //   queryBridgeDecorator({ ...params })

  const isDelegated = (parameters?: any) =>
    isDelegatedDecorator({
      ...parameters,
      account: baseAccount,
    });

  const unDelegate = (parameters?: any) =>
    unDelegateDecorator({
      ...parameters,
      account: baseAccount,
    });

  const waitForTransactionReceipts = (parameters: any) =>
    waitForTransactionReceiptsDecorator({
      ...parameters,
      account: baseAccount,
    });

  // const read = <T>(params: any) =>
  //   multichainRead(baseAccount, params) as Promise<
  //    any
  //   >

  /* -------------------------------------------------- */
  /* Delegation (chainId = 0 semantics)                   */
  /* -------------------------------------------------- */

  const toDelegation = async () =>
    await deployments[0].extend.toDelegation({ multiChain: true });

  /* -------------------------------------------------- */
  /* Final multichain account                             */
  /* -------------------------------------------------- */

  return {
    ...baseAccount,
    getUnifiedERC20Balance,
    build,
    // buildComposable,
    // buildBridgeInstructions,
    // queryBridge,
    isDelegated,
    unDelegate,
    waitForTransactionReceipts,
    // read,
    toDelegation,
  };
};
