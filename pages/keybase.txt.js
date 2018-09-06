import React from 'react'

export default class KeybaseTxt extends React.Component {
  static getInitialProps ({ res }) {
    res.end(claim)
  }

  render () {
    return <div />
  }
}

const claim = `==================================================================
https://keybase.io/pablopunk
--------------------------------------------------------------------

I hereby claim:

  * I am an admin of https://pablo.life
  * I am pablopunk (https://keybase.io/pablopunk) on keybase.
  * I have a public key ASB0bXgfmGtoZZTISJFyhEvftzHL5WudpwYyLDziTUL-ggo

To do so, I am signing this object:

{
  "body": {
    "key": {
      "eldest_kid": "0120746d781f986b686594c8489172844bdfb731cbe56b9da706322c3ce24d42fe820a",
      "host": "keybase.io",
      "kid": "0120746d781f986b686594c8489172844bdfb731cbe56b9da706322c3ce24d42fe820a",
      "uid": "85c0ad90a7d942212a380f4d37947119",
      "username": "pablopunk"
    },
    "merkle_root": {
      "ctime": 1534243570,
      "hash": "1dc8286830c9a29fad49168d43dd223c9a1e5046db4d1f5a14601b3c0c94df052899dbd884699c8525750fcdeda21ca4ad001f08c8d5fecd5b0577cb803da1eb",
      "hash_meta": "e37eac284756a896e369b52943fa4f30a9cba272d18ba26ea762eca7565da3d2",
      "seqno": 3453217
    },
    "service": {
      "entropy": "4d+wWhnB5SOt5s/9aCDW4l6j",
      "hostname": "pablo.life",
      "protocol": "https:"
    },
    "type": "web_service_binding",
    "version": 2
  },
  "client": {
    "name": "keybase.io go client",
    "version": "2.5.0"
  },
  "ctime": 1534243602,
  "expire_in": 504576000,
  "prev": "043bdbea77496099c6b7a6937e49b25ccf7aee5025f67079614edd472351c677",
  "seqno": 27,
  "tag": "signature"
}

which yields the signature:

hKRib2R5hqhkZXRhY2hlZMOpaGFzaF90eXBlCqNrZXnEIwEgdG14H5hraGWUyEiRcoRL37cxy+VrnacGMiw84k1C/oIKp3BheWxvYWTESpcCG8QgBDvb6ndJYJnGt6aTfkmyXM967lAl9nB5YU7dRyNRxnfEIFmf5+zhJCJTW2vr0cJRvjAayTW2Iiui+0pIcYjZbZaqAgHCo3NpZ8RAwHEbrkRgicCI+CLBUNd4NvlgmmPDWqyjTV0CF69Qz1wcrR71oZyldSQAiWHNVNZhxNO9pkkySSSpJKayuiM+DahzaWdfdHlwZSCkaGFzaIKkdHlwZQildmFsdWXEIGi4HzjLFbF5lM7VoUCN9OqUmohr573kIrAmEU2YfIvPo3RhZ80CAqd2ZXJzaW9uAQ==

And finally, I am proving ownership of this host by posting or
appending to this document.

View my publicly-auditable identity here: https://keybase.io/pablopunk

==================================================================`
