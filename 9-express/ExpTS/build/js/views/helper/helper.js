"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProfs = listProfs;
exports.listTech = listTech;
function listProfs(list) {
    return `<ul>${list.map(prof => `<li> ${prof.nome} - ${prof.sala} </li>`).join("")}</ul>`;
}
function listTech(list) {
    return `<ul>${(list.filter((tech) => tech.poweredByNodejs)).map(tech => `<li> ${tech.name} - ${tech.type} </li>`).join("")}</ul>`;
}
