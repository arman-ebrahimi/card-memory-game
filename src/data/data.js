
export const icons = [
    {code: "fas fa-anchor", id: 0},
    {code: "fas fa-ambulance", id: 1},
    {code: "fas fa-apple-alt", id: 2},
    {code: "fas fa-balance-scale", id: 3},
    {code: "fas fa-baseball-ball", id: 4},
    {code: "fas fa-bell", id: 5},
    {code: "fas fa-chess-queen", id: 6},
    {code: "fab fa-chrome", id: 7},
];

let allIcons = icons.concat(icons);
export const shuffledArray = shuffleArray(allIcons);

function shuffleArray(allIcons){
    let i, j, x;
    for(i = allIcons.length - 1; i > 0; i--){
        j = Math.floor(Math.random() * (i + 1));
        x = allIcons[i];
        allIcons[i] = allIcons[j];
        allIcons[j] = x;
    }
    console.log(allIcons)
    return allIcons;
}

