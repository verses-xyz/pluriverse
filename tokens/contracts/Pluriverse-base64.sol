// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// // TODO: probably need this guard to protect against malicious actors.
// // import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// interface PluriversesType {
//     struct Pluriverse {
//         uint256 id;
//         string uri;
//     }
// }

// contract Pluriverse is ERC721Enumerable, Ownable {
//     mapping(uint256 => string) _tokenURIs;

//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;
//     uint256 private constant MAX_PER_ADDRESS = 5;
//     // probably need a max to just guard against using up a bunch of gas..?
//     // Or maybe we only pay up to XXX tokens total.
//     uint256 private constant MAX_PLURIVERSE = 50000;

//     uint256 public earlyAccessStartTimestamp;
//     uint256 public publicSaleStartTimestamp;

//     mapping(address => bool) public isOnEarlyAccessList;

//     // set contract name and ticker.
//     constructor() ERC721("Pluriverses", "PLURIVERSE") {}

//     // for opensea collection
//     function contractURI() public pure returns (string memory) {
//         // TODO: add your collection JSON here.
//         return "https://ipfs.io/ipfs/your-collection-ipfshash";
//     }

//     function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
//         _tokenURIs[tokenId] = _tokenURI;
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         virtual
//         override
//         returns (uint256 memory)
//     {
//         require(_exists(tokenId));
//         uint256 memory _tokenURI = _tokenURIs[tokenId];
//         return _tokenURI;
//     }

//     function getAllTokens()
//         public
//         view
//         returns (PluriversesType.Pluriverse[] memory)
//     {
//         uint256 lastestId = _tokenIds.current();
//         uint256 counter = 0;
//         PluriversesType.Pluriverse[]
//             memory res = new PluriversesType.Pluriverse[](lastestId);
//         for (uint256 i = 0; i < lastestId; i++) {
//             if (_exists(counter)) {
//                 string memory uri = tokenURI(counter);
//                 res[counter] = PluriversesType.Pluriverse(counter, uri);
//             }
//             counter++;
//         }
//         return res;
//     }

//     // TODO: dont restrict to owner
//     // TODO: base64 encode this to avoid two IPFS url links?
//     // Currently we use IPFS for both storing the animation (as a standalone file) and for storing
//     // the metadata json corresponding to each item.
//     // I haven't seen any pattern of using base64 to encode the metadata JSON outside of fully
//     // on-chain NFTS (those that use SVG in the `image` field), and there's no documentation
//     // on opensea or any of those marketplaces for guidelines on base64, so we will just have to try it out.
//     function mint(address player, string memory uri)
//         public
//         onlyOwner
//         returns (uint256)
//     {
//         // Add ensures on the constants
//         // handle meta transaction here
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();
//         _mint(player, newItemId);
//         _setTokenURI(newItemId, uri);
//         return newItemId;
//     }
// }
