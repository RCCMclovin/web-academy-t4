import { Prof, Tech } from './helper.types';

export function listProfs(list: Prof[]) {
  return `<ul>${list.map((prof) => `<li> ${prof.nome} - ${prof.sala} </li>`).join('')}</ul>`;
}

export function listTech(list: Tech[]) {
  return `<ul>${list
    .filter((tech) => tech.poweredByNodejs)
    .map((tech) => `<li> ${tech.name} - ${tech.type} </li>`)
    .join('')}</ul>`;
}
