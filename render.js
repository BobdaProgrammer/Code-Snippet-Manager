import { deserializeArray } from "./CodeSnippets/renderer.js";

document.addEventListener("DOMContentLoaded", function () {
    snippets = localStorage.getItem("snippets") || "[]";
    snippets = deserializeArray(snippets);
    console.log(snippets);
});
