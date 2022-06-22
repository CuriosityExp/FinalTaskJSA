let platform = "";
let url = "";
let data = "";

const radioButtons = document.querySelectorAll('input[name="optionCheck"]');
radioButtons.forEach(radio => {
  radio.addEventListener('click', handleRadioClick);
});

function handleRadioClick(){
  if (document.getElementById("searchItem").checked) {
    document.getElementById("schItem").style.visibility = 'visible';
    document.getElementById("fWorldstate").style.visibility = "hidden";
  } else {
    document.getElementById("fWorldstate").style.visibility = "visible";
    document.getElementById("schItem").style.visibility = "hidden";
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
}

async function sortieData() {
  try {
    platform = document.getElementById("dPlatform").value;
    url = `https://api.warframestat.us/${platform}/sortie`;

    data = await fetchData(url);

    let missionType = "";
    let node = "";
    let modifier = "";

    for (i = 0; i < data.variants.length; i++) {
      //take variant from sortie data
      missionType = `${data.variants[i].missionType}`;
      node = `${data.variants[i].node}`;
      modifier = `${data.variants[i].modifier}`;
      console.log(missionType);

      //creating html element
      const nodeDiv = document.getElementById("container-main");
      let content = document.createElement("div");
      content.id = "content";

      //coloring mission type with different color
      styleMissionType(missionType, content);

      nodeDiv.appendChild(content);
      let htmlMT = document.createElement("h3");
      let htmlN = document.createElement("p");
      let htmlM = document.createElement("p");
      htmlMT.innerHTML = missionType;
      htmlN.innerHTML = node;
      htmlM.innerHTML = modifier;
      content.appendChild(htmlMT);
      content.appendChild(htmlN);
      content.appendChild(htmlM);
    }
  } catch (e) {
    console.log(e);
  }
}

document.getElementById("iButton").addEventListener("click", () => {
  if (!!document.getElementById("content") === true) {
    const content = document.getElementById("container-main");
    while (content.firstChild) {
      content.removeChild(content.lastChild);
    }
    selectWorldstate()
  } else {
    selectWorldstate();
  }
});

document.getElementById("iSButton").addEventListener("click", () => {
  if (!!document.getElementById("content") === true) {
    const content = document.getElementById("container-main");
    while (content.firstChild) {
      content.removeChild(content.lastChild);
    }
    weaponData();
  } else {
    weaponData();
  }
});

function selectWorldstate() {
  let ws = document.getElementById("dWorldstate").value;
  switch (ws) {
    case "sortie":
      sortieData();
      break;
    case "earthCycle":
      earthData();
      break;
    case "vallisCycle":
      vallisData();
      break;
    case "cambionCycle":
      cambionData();
      break;
    case "cetusCycle":
      cetusData();
      break;
    default:
      alert("Function not yet implemented");
  }
}

function styleMissionType(missionType, content) {
  // case of missionType
  switch (missionType) {
    case "Assassination":
      content.setAttribute(
        "style",
        "background: #FFE53B linear-gradient(0deg, #FFE53B 0%, #FF2525 74%)"
      );
      break;
    case "Assault":
      content.setAttribute(
        "style",
        "background: #FFFFFF linear-gradient(225deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)"
      );
      break;
    case "Capture":
      content.setAttribute(
        "style",
        "background: #FBAB7E linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
      );
      break;
    case "Defection":
      content.setAttribute(
        "style",
        "background: #FF3CAC linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)"
      );
      break;
    case "Defence":
      content.setAttribute(
        "style",
        "background: #21D4FD linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)"
      );
      break;
    case "Distrupsion":
      content.setAttribute(
        "style",
        "background: #A9C9FF linear-gradient(45deg, #A9C9FF 0%, #FFBBEC 36%, #e92323 82%)"
      );
      break;
    case "Excavation":
      content.setAttribute(
        "style",
        "background: #74EBD5; linear-gradient(121deg, #74EBD5 0%, #9FACE6 50%, #6448ff 100%)"
      );
      break;
    case "Exterminate":
      content.setAttribute(
        "style",
        "background: #FF3CAC linear-gradient(0deg, #FF3CAC 0%, #784BA0 28%, #2B86C5 63%, #ff0000 83%)"
      );
      break;
    case "Hijack":
      content.setAttribute(
        "style",
        "background: #FEE140 linear-gradient(90deg, #FEE140 0%, #FA709A 100%)"
      );
      break;
    case "Sabotage":
      content.setAttribute(
        "style",
        "background: #52ACFF linear-gradient(49deg, #52ACFF 12%, #FFE32C 50%, #ffa437 100%)"
      );
      break;
    case "Spy":
      content.setAttribute(
        "style",
        "background: #FFDEE9 linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 88%, #edb0ed 100%)"
      );
      break;
    case "Skirmish":
      content.setAttribute(
        "style",
        "background: #F4D03F linear-gradient(132deg, #F4D03F 0%, #16A085 33%, #96a2ff 66%, #ff5f5f 100%)"
      );
      break;
    case "Survival":
      content.setAttribute(
        "style",
        "background: #F4D03F linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"
      );
      break;
    case "Rescue":
      content.setAttribute(
        "style",
        "background: #0093E9 linear-gradient(160deg, #0093E9 0%, #80D0C7 50%, #bbffb4 100%)"
      );
      break;
    default:
    // code block
  }
}

function styleState(state,content,htmlC,htmlS,htmlT) {
  switch (state) {
    case "night":
      content.style.background =
        "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)";
      content.style.color = "white";
      break;
    case "day":
      content.style.background =
        "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)";
      break;
    case "cold":
      content.style.background =
        "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)";
      break;
    case "warm":
      content.style.background =
        "linear-gradient(90deg, #d53369 0%, #daae51 100%)";
      break;
    case "vome":
      content.style.background =
        "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)";
      break;
    case "fass":
      content.style.background =
        "linear-gradient(147deg, #000000 0%, #c40b0b 74%)";
      content.style.color = "white";
      break;
    default:
    //code block
  }
}

async function earthData() {
  try {
    platform = document.getElementById("dPlatform").value;
    url = `https://api.warframestat.us/${platform}/earthCycle`;
    //taking data from api
    data = await fetchData(url);

    let state = "";
    let timeLeft = "";
    //storing data to variable
    state = data.state;
    timeLeft = data.timeLeft;

    //creating html elements
    const nodeDiv = document.getElementById("container-main");
    let content = document.createElement("div");
    content.id = "content";

    let htmlC = document.createElement("h3");
    let img = document.createElement("img");
    let htmlS = document.createElement("p");
    let htmlT = document.createElement("p");
    htmlC.innerHTML = "Earth";
    img.src =
      "./docs/assets/images/earth.png";
    htmlS.innerHTML = state;
    htmlT.innerHTML = timeLeft;
    styleState(state, content, htmlC, htmlS, htmlT);
    nodeDiv.appendChild(content);
    content.appendChild(htmlC);
    content.appendChild(img);
    content.appendChild(htmlS);
    content.appendChild(htmlT);
  } catch (e) {
    console.log(e);
  }
}

async function vallisData() {
  try {
    platform = document.getElementById("dPlatform").value;
    url = `https://api.warframestat.us/${platform}/vallisCycle`;

    data = await fetchData(url);

    let state = "";
    let timeLeft = "";

    state = data.state;
    timeLeft = data.timeLeft;

    const nodeDiv = document.getElementById("container-main");
    let content = document.createElement("div");
    content.id = "content";

    let htmlC = document.createElement("h3");
    let img = document.createElement("img");
    let htmlS = document.createElement("p");
    let htmlT = document.createElement("p");
    htmlC.innerHTML = "Orb Vallis";
    img.src = "./docs/assets/images/Orb_Vallis.png";
    htmlS.innerHTML = state;
    htmlT.innerHTML = timeLeft;
    styleState(state, content, htmlC, htmlS, htmlT);
    nodeDiv.appendChild(content);
    content.appendChild(htmlC);
    content.appendChild(img);
    content.appendChild(htmlS);
    content.appendChild(htmlT);
  } catch (e) {
    console.log(e);
  }
}

async function cambionData() {
  try {
    platform = document.getElementById("dPlatform").value;
    url = `https://api.warframestat.us/${platform}/cambionCycle`;

    data = await fetchData(url);

    let state = "";
    let timeLeft = "";

    state = data.active;
    timeLeft = data.timeLeft;

    const nodeDiv = document.getElementById("container-main");
    let content = document.createElement("div");
    content.id = "content";

    let htmlC = document.createElement("h3");
    let img = document.createElement("img");
    let htmlS = document.createElement("p");
    let htmlT = document.createElement("p");
    htmlC.innerHTML = "Cambion Drift";
    img.src = "./docs/assets/images/CambionDrift.png";
    htmlS.innerHTML = state;
    htmlT.innerHTML = timeLeft;
    styleState(state, content, htmlC, htmlS, htmlT);
    nodeDiv.appendChild(content);
    content.appendChild(htmlC);
    content.appendChild(img);
    content.appendChild(htmlS);
    content.appendChild(htmlT);
  } catch (e) {
    console.log(e);
  }
}

async function cetusData() {
  try {
    platform = document.getElementById("dPlatform").value;
    url = `https://api.warframestat.us/${platform}/cetusCycle`;
    //taking data from api
    data = await fetchData(url);

    let state = "";
    let timeLeft = "";
    //storing data to variable
    state = data.state;
    timeLeft = data.timeLeft;

    //creating html elements
    const nodeDiv = document.getElementById("container-main");
    let content = document.createElement("div");
    content.id = "content";

    let htmlC = document.createElement("h3");
    let img = document.createElement("img");
    let htmlS = document.createElement("p");
    let htmlT = document.createElement("p");
    htmlC.innerHTML = "Plains of Eidolon";
    img.src = "./docs/assets/images/Plains_of_Eidolon.png";
    htmlS.innerHTML = state;
    htmlT.innerHTML = timeLeft;
    styleState(state, content, htmlC, htmlS, htmlT);
    nodeDiv.appendChild(content);
    content.appendChild(htmlC);
    content.appendChild(img);
    content.appendChild(htmlS);
    content.appendChild(htmlT);
  } catch (e) {
    console.log(e);
  }
}

async function weaponData(){
  try {
    let name = "";
    name = document.getElementById("iSearchbar").value;
    console.log(name);
    url = `https://api.warframestat.us/items/${name}`;

    //taking data from api
    data = await fetchData(url);

    let iname = "";   //string
    let cat = "";     //string
    let wtype = "";   //string
    let bt = "";      //integer
    let image = "";   //url
    let drp = "";     // array

    let chc = "";
    let loc = "";
    let typ = "";

    iname = data.name;
    cat = data.category;
    wtype = data.type;
    bt = data.buildTime / 3600;
    image = data.imageName;
    //drp = data.drops;

    //creating html element
    const nodeDiv = document.getElementById("container-main");
    let content = document.createElement("div");
    content.id = "content";
    content.style.height = "253px";

    let hName = document.createElement("h3");
    let himg = document.createElement("img");
    let hcat = document.createElement("p");
    let hwtype = document.createElement("p");
    let hbt = document.createElement("p");

    hName.innerHTML = iname;
    himg.src = `https://cdn.warframestat.us/img/${image}`;
    hcat.innerHTML = `Category: ${cat}`;
    hwtype.innerHTML = `Type: ${wtype}`;
    hbt.innerHTML = `Building time: ${bt} hour`

    nodeDiv.appendChild(content);
    content.appendChild(hName);
    content.appendChild(himg);
    content.appendChild(hcat);
    content.appendChild(hwtype);
    content.appendChild(hbt);

    //data drop ---

  }catch (e) {
    console.log(e);
  }
}
