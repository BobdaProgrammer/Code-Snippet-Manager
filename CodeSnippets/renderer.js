const {ipcRenderer} = require('electron')
const dropContainer = document.getElementById('drop-container');

dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

    



dropContainer.addEventListener('dragenter', () => {
    console.log('File is in the Drop Space');
    document.getElementById("drop-container").style.boxShadow = "0 0 30px rgb(255,0,106)";
    document.getElementById("drop-container").style.backgroundColor = "rgb(213, 6, 113)";
});

dropContainer.addEventListener('dragleave', () => {
    console.log('File has left the Drop Space');
    document.getElementById("drop-container").style.boxShadow = "";
    document.getElementById("drop-container").style.backgroundColor = "";
});

dropContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("drop-container").style.boxShadow = "";
    document.getElementById("drop-container").style.backgroundColor = "";
    let pathArr = [];
    for (const f of event.dataTransfer.files) {
        console.log('File Path of dragged files: ', f.path)
        pathArr.push(f.path);
    }
    console.log(pathArr);
    ipcRenderer.sendSync('dropped-file', pathArr);
});
ipcRenderer.on('data', (event, data) => {
    // 'data' contains the variable sent from main.js
    console.log(data); // You can use the data in your renderer process
    document.getElementById("text").value += data;
  });
  
let bundles = [];

function addBundle(title, filePaths) {
    let bundle = {
        title: title,
        files: filePaths
    };
    bundles.push(bundle);
    ipcRenderer.sendSync('new-bundle', bundle);
    console.log(bundles);
}

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let pathArr = [];
    for (const f of event.dataTransfer.files) {
        console.log('File Path of dragged files: ', f.path)
        pathArr.push(f.path);
    }
    console.log(pathArr);
    addBundle('My Bundle', pathArr);
});
// add the code snippet to the list
function CodeSnippet() {
    // find all the text needed
    var title = document.getElementById("title").value;
    var tags = document.getElementById("tags").value;
    var code = document.getElementById("text").value;
    
    // grab the already stored snippets and parse it as JSON
    var snippets = JSON.parse(localStorage.getItem("snippets")) || [];

    // store the current snippet as an array
    var snippet = [title, tags, code];
    
    // add the current snippet to the existing snippets 
    snippets.push(snippet);
    
    // set it back to local storage after converting to JSON
    localStorage.setItem("snippets", JSON.stringify(snippets));
    
    console.log(snippets);
    console.log(localStorage.getItem("snippets"));
}
