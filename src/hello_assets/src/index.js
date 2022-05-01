import { hello } from "../../declarations/hello";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("greeting").innerText = "";
  const loader = document.getElementById("loader");

  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();
  const blob = new Blob([name], {type: 'text/html'});

  // text/html以外の型で試す
  // var uint8Array = new Uint8Array([1, 2, 3]);
  // const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
  console.log("blob" + typeof(blob));
  function readAsText(b) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = () => { reject(reader.error); };
      reader.readAsText(b);
    });
  };
  const test = await readAsText(blob);
  console.log("test::::" + test);
  loader.style.visibility = "visible";
  button.setAttribute("disabled", true);
  document.getElementById("name").setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const result = await hello.get_blob(blob);
  console.log("result::::" + result);
  const greeting = await hello.greet(name);

  loader.style.visibility = "hidden";
  button.removeAttribute("disabled");
  document.getElementById("name").removeAttribute("disabled");
  document.getElementById("greeting").innerText = greeting;

  return false;
});
// document.getElementById("mintNftBtn").addEventListener("click", async () => {
//   const name = document.getElementById("name").value.toString();
//   console.log(name);
//   const blob = Blob([name], {type: 'text/html'});
//   console.log(typeof(blob));
//   function readAsText(b) {
//     return new Promise((resolve, reject) => {
//       let reader = new FileReader();
//       reader.onload = () => { resolve(reader.result); };
//       reader.onerror = () => { reject(reader.error); };
//       reader.readAsText(b);
//     });
//   };
//   const name = await readAsText(blob);
//   document.getElementById("mintNft").innerText = name;
  

//   // const mintRequest = {
//   //   to : "aaaaa-aa",  // ローカルprincipal
//   //   metadata : blob   // 文字列バイナリ
//   // };
//   // // Interact with dfinity_nft actor, calling the mintNFT method
//   // const mintedNft = await dfinity_nft.mintNFT(mintRequest);  
//   // mintedNft<Nat32>
//   // console.log(mintedNft);
  
//   // todo: mintNFTはバイナリ？そうならstreamから画像に、若しくはmintNFTから直接canvasに
//   const result = await dfinity_nft.get(blob);
//   console.log(readAsText(result));
// });
