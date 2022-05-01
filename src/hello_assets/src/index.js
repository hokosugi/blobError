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
  console.log("blobからtextのtest::::" + test);
  loader.style.visibility = "visible";
  button.setAttribute("disabled", true);
  document.getElementById("name").setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const result = await hello.get_blob(blob);
  console.log("バックエンドからのresult::::" + result);
  const greeting = await hello.greet(name);

  loader.style.visibility = "hidden";
  button.removeAttribute("disabled");
  document.getElementById("name").removeAttribute("disabled");
  document.getElementById("greeting").innerText = greeting;

  return false;
});
