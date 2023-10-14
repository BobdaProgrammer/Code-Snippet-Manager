function deserializeArray(str) {
  if (!str) return [];
  return JSON.parse(str);
}

let snippets = [];
function Copy(code) {
    navigator.clipboard.writeText(code);
}
document.addEventListener("DOMContentLoaded", function () {
    let snippetsStr = localStorage.getItem("snippets") || "[]";
    snippets = deserializeArray(snippetsStr);
    console.log(snippets);
    for (let i = 0; i < snippets.length; i++){
        console.log(snippets[i]);
        project = createElement("div");
        project.innerHTML = `
        <div class="project">
            <span class="title" id="title">${snippets[i][0]}</span>
            <p class="tags" id="tags">${snippets[i][1]}</p>
            <button class="copy" onclick="Copy(${snippets[i][2]});" id="copy"><span class="copyrect" style="margin-right: .125em; position: relative; top: -.25em; left: -.125em">
                ▯<span style="position: absolute; top: .25em; left: .25em">▯</span>
              </span></button>
              <button class="edit" id="edit">✏️</button>
        </div>`;
        document.getElementById("projects").appendChild(project);
    }
});

