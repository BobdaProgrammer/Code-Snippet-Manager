function deserializeArray(str) {
  if (!str) return [];
  return JSON.parse(str);
}

let snippets = [];
function Copy(num) {
    navigator.clipboard.writeText(snippets[num][2]);
}
document.addEventListener("DOMContentLoaded", function () {
    let snippetsStr = localStorage.getItem("snippets") || "[]";
    snippets = deserializeArray(snippetsStr);
    console.log(snippets);
    for (let i = 0; i < snippets.length; i++){
        console.log(snippets[i]);
        project = document.createElement("div");
        console.log(`(onclick = "Copy('${snippets[i][2]}');")`);
        project.innerHTML = `<div class="project">
            <span class="title" id="title">${snippets[i][0]}</span>
            <span class="tags" id="tags">${snippets[i][1]}</span>
            <button class="copy" onclick="Copy('${i}');" id="copy"><span class="copyrect" style="margin-right: .125em; position: relative; top: -.25em; left: -.125em">
                ▯<span style="position: absolute; top: .25em; left: .25em">▯</span>
              </span></button>
              <button class="edit" id="edit">✏️</button>
        </div>`;
        document.getElementById("projects").appendChild(project);
    }
});

