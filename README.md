# daisign
Web3 based signing utility for dai.permit() - EIP-2612

You can use this utility to create the `r`, `s`, and `v` values needed to pass to `dai.permit()`. Usage:

```
Generate r, s, v values for dai.permit()

Options:
      --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
      --pk, --private-key       Private key        [string] [required] [default:
           "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"]
  -n, --name                    Name of token
                                 [string] [required] [default: "Dai Stablecoin"]
      --cv, --contract-version  version of contract
                                              [string] [required] [default: "1"]
      --id, --chain-id          Chain ID     [string] [required] [default: "99"]
  -c, --contract-address        Address of the contract      [string] [required]
      --sa, --spender-address   Address that is given permission
                                                             [string] [required]
      --nc, --nonce             Nonce to prevent replay
                                                [number] [required] [default: 0]
  -e, --expiry                  Expiration of permission
                                                [number] [required] [default: 0]
  -a, --allowed                 Allow permission
                                            [boolean] [required] [default: true]

```

For example, to generate the values for a specific spender for a limited time, do something like

```
export DAISIGN_PK='<YOUR PRIVATE KEY>'
node src/cli.js \
	--contract-address 0x6B175474E89094C44Da98b954EedeAC495271d0F \
  --spender-address 0xdd2d5d3f7f1b35b7a0601d6a00dbb7d44af58479 \
  --expiry 604414800

{
  account: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
  r: '0xca00c6442299a9796ee3eaab5509e8dc5fb6ff9ce3ec540aaaa250e86c8c1d1a',
  s: '0x00cbde07fb4c72690b31e716018d2e2d423cfb39b030e012dcfe2f22bdb81647',
  v: 27
}
```

