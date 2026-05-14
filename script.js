function goFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const skinsContainer = document.getElementById("skinsContainer");

function showCharacters() {
  skinsContainer.innerHTML = `
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character1.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character2.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character3.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character4.png">
  `;
}

function showBackgrounds() {
  skinsContainer.innerHTML = `
    <h2 style="color:white;">No backgrounds added yet</h2>
  `;
}

function showBalls() {
  skinsContainer.innerHTML = `
    <h2 style="color:white;">No ball skins added yet</h2>
  `;
}