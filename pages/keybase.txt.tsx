import React from 'react'

const proof = `==================================================================
https://keybase.io/pablopunk
--------------------------------------------------------------------

I hereby claim:

  * I am an admin of https://pablo.pink
  * I am pablopunk (https://keybase.io/pablopunk) on keybase.
  * I have a public key with fingerprint D80E 9150 BD4B 93A0 69DD  B170 9049 A674 89DD 9AEB

To do so, I am signing this object:

{
  "body": {
    "key": {
      "eldest_kid": "0120746d781f986b686594c8489172844bdfb731cbe56b9da706322c3ce24d42fe820a",
      "fingerprint": "d80e9150bd4b93a069ddb1709049a67489dd9aeb",
      "host": "keybase.io",
      "key_id": "9049a67489dd9aeb",
      "kid": "0101fa4848f4b43dd0fed720dcc9836342c67460f86b9d0e874586350253160e748a0a",
      "uid": "85c0ad90a7d942212a380f4d37947119",
      "username": "pablopunk"
    },
    "service": {
      "hostname": "pablo.pink",
      "protocol": "https:"
    },
    "type": "web_service_binding",
    "version": 1
  },
  "ctime": 1577108622,
  "expire_in": 157680000,
  "prev": "10cc051cea6877560f7a491f6949a31a3b67fd29799e1dea08b094a4686de28a",
  "seqno": 51,
  "tag": "signature"
}

which yields the signature:

-----BEGIN PGP MESSAGE-----
Version: Keybase OpenPGP v2.1.3
Comment: https://keybase.io/crypto

yMNyAnicbVJ9UFRVHF1k+RRZCTKaamKekaIL3vf93gISFgKBZeVUMxjLe+/eB4+P
fa/dBSTCRmomoNSEZCFJyJksGGgJDTQkkC8dGfnKydQcZpwRwYqYgMnSsLdMzvRH
958798w555577m9wjbch0Ouj1OPOyuuf/Ow1ctZVaMg0DB4oxUQVlmCWUiwPrWwo
HyKH05qnQMyCAZwALMVAlsNlnmNEhmNonpI4iuNxluAoSoSyyJK4JCKaEXkosIAh
CUIiJURQkCJkxBFAwMyYrNiykV2zKzanbgs5gHicBiKkRJ4UAMNDKOIs4AHFCwyr
u0PIC0jUhTmqw6PQw4mCA8Uoqo7pB+tKvP/hP8gNcFmg9JwyJVIkhEBGkCUAlCSe
IxmSIiRdxgCZ86QGiGMpmmNIGhA0iTMA6ZbCSu7CFTuOloAAeSCwkKcIAicEkgMy
BUmWp1gc5z1EB7LbhAKkszVBzFe1QlseVmbGdLhIkZCnWc9T/kuJ0RSdY8Y0u+pU
JTVfx3OcTs1h8eicJZqHWIxE678WVlGxQb1GXVGE7A5FtWEWXGdKTsXjidMsiwOO
IQgzhvZoih1ZFdsKzHBAX557UJFuiQNJAjQuIYHhWJbWS2AFisdlhtfLJHGBFBlW
hgTP8jzCIRIAJwKeEij97yEiOE8rDvSmTcUsNK7nFLJ1T4eSbROchXaElfWf3W00
eAUafH1WeebLEBiw9sHUJQWblreOXnbenZZ7Z+230K6bC3Xv3F7MvxzkWhr0D9n/
48bHL24Ocze/UbX3A/czQl3UQI7v08dcRfPf4REN215zr+uIizcJ4Uf4voZvu7Wu
zTVndv9kX91zsSuiC29OvpdlNg4EudW2M6GNzdXj748tr//eePPP01nGyeeHrZvS
Ruf85lYvnPjjxkz1p0O3d5n8/OxDi4YD1ZMJy7SlrOF1/7r+byZz+2Lbju7pnmhv
TQ4IqZsOfjbl9/DW5XaVT57IOPJYS9y5pobQw3uZK2E7E9LiW9Jf2WDcFpu+pXPq
RKJvZby7stj1nnj8atOTnx1NPr+zZW425+WstXfCB+a3jh2bSWppTqplI0cSLuwb
y+wwbk98dbgnMqJ8+Kp/f8i5cs3xFnSmDvT+3Tcx3nl/44x5tOBQcoUhLwMT+2J7
nlvlZQIGYbq+I7d5+usPR6WSRzrr2dy3Zw7W9G7JvlVdXRoQ3fLL/ZP5h4IaXwh6
selh79/297RGEv4PnUyZQ+Hr6/+60dM9e6F4w3iZES8L9kmP2uQbN7Lm42g3XhVq
pCoG0u6dmhx2ae+6Ly25atuvXUq1eRXFTi3dKfMvP3y3PXFdSG3V6QXty8KA8xNp
T3UGMweD1Zc+3xcTYG4rqM18wsdUM2Wa32H56lrbYmOcd9v1ye2/RtaYM4Z+MDRY
pwxhJacqoq/seHTii6iUfwBXKryT
=dcVM
-----END PGP MESSAGE-----

And finally, I am proving ownership of this host by posting or
appending to this document.

View my publicly-auditable identity here: https://keybase.io/pablopunk

==================================================================
`

export default class extends React.Component {
  static getInitialProps({ res }) {
    if (res) {
      res.setHeader('Content-Type', 'text/plain')
      res.write(proof)
      res.end()
    }

    return {}
  }
}
