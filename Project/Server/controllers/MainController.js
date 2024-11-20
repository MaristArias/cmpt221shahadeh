let apiData = {
  source: {
    id: "wired",
    name: "Wired",
  },
  author: "Andy Greenberg",
  title:
    "Meet ZachXBT, the Masked Vigilante Tracking Down Billions in Crypto Scams and Thefts",
  description:
    "He just untangled a $243 million bitcoin theft, what may be the biggest-ever crypto heist to target a single victim. And he has never shown his face.",
  url: "https://www.wired.com/story/meet-zachxbt-243-million-crypto-theft/",
  urlToImage:
    "https://media.wired.com/photos/671803d2124551b4eaed68ad/191:100/w_1280,c_limit/security_zachxbt_crypto_vigilante.jpg",
  publishedAt: "2024-10-24T09:00:00Z",
  content:
    "As ZachXBT has pursued that career as a crypto vigilante, he has also kept his mask firmly in place. Online, he appears only as his avatar, a kind of platypus cartoon figure in a detective's trench c… [+3865 chars]",
};

exports.getData = function (req, res) {
  return apiData;
};
