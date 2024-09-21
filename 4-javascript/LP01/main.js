const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

function poundsToStones(pounds) {
    return Math.round(pounds / 14);
}

function fToC(f) {
    return Math.round((f - 32) / 1.8);
}

const storyText = ":insertT:, :insertX: sneaked into :insertY: to :insertM:, when he was seen by Bob, the builder, who wasn't about to let it happen.\
    During the fight, :insertX: :insertZ:, shocking everyone.";

const insertT = [
    "At dawn",
    "At noon",
    "At dusk",
    "In the dead of the night"
]

const insertX = [
    "Frodo Baggins",
    "Ronaldinho",
    "Harry Potter",
    "Sponge Bob Square Pants"
]

const insertY = [
    "the Great Hall, in Hogwarts",
    "the Krusty Krab, in Bikini Bottom",
    "Rio de Janeiro, in Brasil",
    "Mount Doom, in Mordor",
    "a sauna at :temp: fahrenheit"
]

const insertM = [
    "hang out with random people",
    "destroy the last Horcrux",
    "burn the One Ring",
    "eat one too many Krabby Patties",
    "steal a :weight: pounds gold football"
]

const insertZ = [
    "spontaneously combusted",
    "saw a Basilisk through a mirror",
    "was bitten by Gollum",
    "scored a Goal",
    "was chased by a gorilla dressed as Patrick Star",
    "was hit by the Pumpkin-Head Jinx",
    "was arrested for trying to get into Paraguai with fake passports"
]

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
    const tItem = randomValueFromArray(insertT);
    const mItem = randomValueFromArray(insertM);
    const randTemp = Math.floor(Math.random() * 120 + 60);
    const randWeight = Math.floor(Math.random() * 201 + 100);

    newStory = newStory.replaceAll(":insertX:", xItem);
    newStory = newStory.replaceAll(":insertY:", yItem);
    newStory = newStory.replaceAll(":insertZ:", zItem);
    newStory = newStory.replaceAll(":insertT:", tItem);
    newStory = newStory.replaceAll(":insertM:", mItem);
    newStory = newStory.replaceAll(":temp:", randTemp);
    newStory = newStory.replaceAll(":weight:", randWeight);

  if(customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replaceAll("Bob, the builder", name);
  }

  if(document.getElementById("uk").checked) {
        const weight = poundsToStones(randWeight) + " stones";
        const temperature = fToC(randTemp) + " centigrade";
        newStory = newStory.replaceAll(`${randTemp} fahrenheit`, temperature);
        newStory = newStory.replaceAll(`${randWeight} pounds`, weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

