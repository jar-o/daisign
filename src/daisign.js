const Web3 = require('web3');
const ethers = require("ethers");
const ecdsa = require('../aztec-crypto-js/secp256k1/ecdsa');
const utils = require('ethereumjs-util');

const provider = new Web3.providers.HttpProvider(Web3.givenProvider);
const web3 = new Web3(provider);

const daisign = {};

daisign.generatePermitValues = (
    privateKey, name, version, chainId, contractAddress,
    spender, nonce, expiry, allowed
) => {
    let holder = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    let DOMAIN_SEP = web3.utils.soliditySha3(web3.eth.abi.encodeParameters(
            ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
            [
                web3.utils.soliditySha3("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                web3.utils.soliditySha3({type: 'bytes', value: web3.utils.toHex(name)}),
                web3.utils.soliditySha3({type: 'bytes', value: web3.utils.toHex(version.charCodeAt(0))}),
                chainId,
                contractAddress
            ]
        ));
    let digest = web3.utils.soliditySha3(ethers.utils.solidityPack(
            ['bytes', 'bytes32', 'bytes32'],
            [
                '0x1901',
                DOMAIN_SEP,
                web3.utils.soliditySha3(web3.eth.abi.encodeParameters(
                    ['bytes32', 'address', 'address', 'uint8', 'uint256', 'bool'],
                    [
                        // PERMIT_TYPEHASH https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F#code
                        '0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb',
                        holder,
                        spender,
                        nonce,
                        expiry,
                        allowed
                    ]
                ))
            ]
        ));
    let vals = ecdsa.signMessage(digest, privateKey)
    return {
        account: holder,
        r: vals[1],
        s: vals[2],
        v: web3.utils.hexToNumber(vals[0]),
    };
};

module.exports = daisign;
