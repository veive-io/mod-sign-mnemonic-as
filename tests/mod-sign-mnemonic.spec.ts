import { LocalKoinos } from "@roamin/local-koinos";
import { Contract, Signer, Transaction, utils, Provider } from "koilib";
import path from "path";
import { randomBytes } from "crypto";
import { beforeAll, afterAll, it, expect } from "@jest/globals";
import * as dotenv from "dotenv";
import * as modAbi from "../build/modsignmnemonic-abi.json";

dotenv.config();

jest.setTimeout(600000);

const localKoinos = new LocalKoinos();
const provider = localKoinos.getProvider() as unknown as Provider;

const modSign = new Signer({
    privateKey: randomBytes(32).toString("hex"),
    provider
});

const modContract = new Contract({
    id: modSign.getAddress(),
    abi: modAbi,
    provider
}).functions;

const account1Sign = new Signer({
    privateKey: randomBytes(32).toString("hex"),
    provider
});

const account2Sign = new Signer({
    privateKey: randomBytes(32).toString("hex"),
    provider
});

const tokenSign = new Signer({
    privateKey: randomBytes(32).toString("hex"),
    provider
});

const tokenContract = new Contract({
    id: tokenSign.getAddress(),
    abi: utils.tokenAbi,
    provider
}).functions;

beforeAll(async () => {
    // start local-koinos node
    await localKoinos.startNode();
    await localKoinos.startBlockProduction();

    // deploy mod contract
    await localKoinos.deployContract(
        modSign.getPrivateKey("wif"),
        path.join(__dirname, "../build/release/ModSignMnemonic.wasm"),
        modAbi
    );
});

afterAll(() => {
    // stop local-koinos node
    localKoinos.stopNode();
});

it("validate signature", async () => {
    // prepare operation
    const { operation: transfer } = await tokenContract['transfer']({
        from: account1Sign.address,
        to: account2Sign.address,
        value: "1",
    }, { onlyOperation: true });

    const tx1 = new Transaction({
        signer: account1Sign,
        provider
    });

    await tx1.pushOperation(transfer);
    await tx1.sign();

    const args = {
        sender: account1Sign.address,
        signature: tx1.transaction.signatures[0],
        tx_id: tx1.transaction.id
    };

    const { operation: validate_signature } = await modContract['is_valid_signature'](
        args, 
        { onlyOperation: true }
    );

    const tx2 = new Transaction({
        signer: account1Sign,
        provider
    });

    await tx2.pushOperation(validate_signature);

    const receipt = await tx2.send();

    await tx2.wait();

    expect(receipt.logs[0]).toStrictEqual(`[mod-sign-mnemonic] valid signature found`);
});