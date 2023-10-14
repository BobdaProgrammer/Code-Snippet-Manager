function deserializeArray(str) {
  if (!str) return [];
  return JSON.parse(str);
}

function serializeArray(arr) {
  return JSON.stringify(arr);
}

let editnum = 0

    function HideIt() {
      document.getElementById("rename").style.display = "none";
      snippets[editnum][2] = document.getElementById("renameBox").value;
      editnum = 0;
      localStorage.setItem("snippets", serializeArray(snippets));
          showSuccessTick(700);
    }


    function ShowIt(num) {
      document.getElementById("rename").style.display = "";
      document.getElementById("renameBox").value = snippets[num][2];
      editnum = num;
}

function showSuccessTick(time) {
  var tick = document.getElementById("successTick");
  tick.style.display = "block";
  setTimeout(function () {
    tick.style.display = "none";
  }, time);
}

    
function DeleteItem(num) {
  snippets.splice(num, 1);
  localStorage.setItem("snippets", serializeArray(snippets));
  location.reload();
}

let snippets = [];
function Copy(num) {
  navigator.clipboard.writeText(snippets[num][2]);
      showSuccessTick(700);
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("rename").style.display = "none";
    let snippetsStr = localStorage.getItem("snippets") || "[]";
    snippets = deserializeArray(snippetsStr);
    console.log(snippets);
    for (let i = 0; i < snippets.length; i++){
        console.log(snippets[i]);
        project = document.createElement("div");
        project.innerHTML = `<div class="project">
            <span class="title" id="title">${snippets[i][0]}</span>
            <span class="tags" id="tags">${snippets[i][1]}</span>
            <button class="copy" onclick="Copy('${i}');" id="copy"><span class="copyrect" style="margin-right: .125em; position: relative; top: -.25em; left: -.125em">
                ▯<span style="position: absolute; top: .25em; left: .25em">▯</span>
              </span></button>
              <button class="edit" id="edit" onclick="ShowIt(${i});">✏️</button>
              <button class="edit" id="cross" onclick="DeleteItem(${i});">X</button>
        </div>`;
        document.getElementById("projects").appendChild(project);
    }
});

