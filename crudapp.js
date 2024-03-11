// this is some stater info or state for the user to see to give some indication of the list being formed.

const gearList = [
  {
    id: 0,
    text: "Mask",
    checked: undefined,
  },
  {
    id: 1,
    text: "Jersey/Pants",
    checked: undefined,
  },
  {
    id: 2,
    text: "Cleats",
    checked: undefined,
  },
];

console.log(gearList);
// When I 1st started I didnt realize how complicated I was making it and started to make a buncg of classes, later to realize some of the mess I got into//
class Gear {
  constructor(name) {
    this.name = name;
  }
}
// this is using the id from the html of the gear-container and then is used in the rendering function below
const gearContainer = $("#gear-container");
// this function is used anytime some text is added into the text box, it will add the text to the list and give it the 2 buttons to like or delete from the list.
function renderGear() {
  gearContainer.empty();
  for (const gear of gearList) {
    const div = $("<div/>");
    div.text(gear.text);

    const checkButton = $("<button/>");
    checkButton.text("👍");
    if (gear.checked) {
      checkButton.addClass("btn btn-primary");
    } else {
      checkButton.addClass("btn btn-outline-success");
    }
    checkButton.on("click", () => toggleCheckGear(gear.id));
    div.append(checkButton);

    gearContainer.append(div);
    const button = $("<button/>");
    button.text("✔️");
    button.addClass("btn btn-outline-danger");
    button.on("click", () => deleteGear(gear.id));
    div.append(button);
  }
}
// this is executing the function
$(renderGear);
// when following the slides from class this was a super simple way to create IDs for gear item
let nextGear = 3;
const gearbox = $("#gearbox");

function sendGear() {
  const newGear = {
    id: nextGear++,
    text: gearbox.val(), // I really enjoy the short cuts offered and know they will continue to be less thought the more that I use them.
    checked: undefined,
  };
  gearList.push(newGear);
  gearbox.val("");
  renderGear();
}
function deleteGear(idToDelete) {
  const index = gearList.findIndex((gear) => gear.id === idToDelete);
  gearList.splice(index, 1);
  renderGear();
}

function toggleCheckGear(idToToggle) {
  const index = gearList.findIndex((gear) => gear.id === idToToggle);
  const gear = gearList[index];
  gear.checked = !gear.checked;
  renderGear();
}
// I made a couple attempts based off of class, the slides and videos to connect to an API, I didnt have much success, my goal way to have an example gear list load for the user to utilize and use, even when it seemed like I was making progress I was never successful with it.
class gearService {
  static url = "http://localhost:3005/";

  static getAllGear() {
    return $.get(this.url);
  }

  static getGear(id) {
    return $.get(this.url + `/${id}`);
  }
  static createGear(gear) {
    return $.post(this.url, gear);
  }

  static updateGear(gear) {
    return $.ajax({
      url: this.url + `/${gear._id}`,
      dataType: "json",
      data: JSON.stringify(gear),
      contentType: "application/json",
      type: "PUT",
    });
  }

  static deleteGear(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: "DELETE",
    });
  }
}

class gearManager {
  static gear;

  static getAllGear() {
    gearService.getAllGear().then((gearitems) => this.render(gearitems));
  }

  static render(gearitems) {
    this.gearitems = gearitems;
    $("#gear-container").empty();
    for (let gear of gearitems) {
      $("#gear-container").prepend(``);
    }
  }
}
// This was the attempt that was demoed in class to use the fetch method, however still no luck with the UI to connect
async function fetchAllGearAndRender() {
  const response = await fetch("http://localhost:3005/");
  const data = await response.json();
}

fetchAllGearAndRender();
