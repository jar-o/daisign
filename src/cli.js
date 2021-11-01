const yargs = require("yargs");
const daisign = require('./daisign')

const defaultpk = process.env.DAISIGN_PK || '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709';

const options = yargs
    .usage('Generate r, s, v values for dai.permit()')
    .option('pk',  //TODO env probably
     {  
         alias: 'private-key',
         describe: 'Private key',
         type: 'string',
         demandOption: true,
         default: defaultpk
     }
    )
    .option('n', 
    {
        alias: 'name',
        describe: 'Name of token',
        type: 'string',
        demandOption: true,
        default: 'Dai Stablecoin'
    })
    .option('cv', 
    {
        alias: 'contract-version',
        describe: 'version of contract',
        type: 'string',
        demandOption: true,
        default: '1'
    })
    .option('id', 
    {
        alias: 'chain-id',
        describe: 'Chain ID',
        type: 'string',
        demandOption: true,
        default: '99'
    })
    .option('c', 
    {
        alias: 'contract-address',
        describe: 'Address of the contract',
        type: 'string',
        demandOption: true
    })
    .option('sa', 
    {
        alias: 'spender-address',
        describe: 'Address that is given permission',
        type: 'string',
        demandOption: true
    })
    .option('nc', 
    {
        alias: 'nonce',
        describe: 'Nonce to prevent replay',
        type: 'number',
        demandOption: true,
        default: 0,
    })
    .option('e', 
    {
        alias: 'expiry',
        describe: 'Expiration of permission',
        type: 'number',
        demandOption: true,
        default: 0,
    })
    .option('a', 
    {
        alias: 'allowed',
        describe: 'Allow permission',
        type: 'boolean',
        demandOption: true,
        default: true,
    })
    .argv;

let permitvals = daisign.generatePermitValues(
    options.pk,
    options.n,
    options.cv,
    options.id,
    options.c,
    options.sa,
    options.nc,
    options.e,
    options.a
);
console.log(permitvals);

