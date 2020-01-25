import { permutations } from "iter-tools/es2018";

enum Color {
  Red,
  Yellow,
  Blue,
  Green
}

const Colors = ["red", "yellow", "blue", "green"];

class Player {
  constructor(
    public name: string,
    public position: number,
    public team: number,
    public color: Color
  ) {}
}

function calculateColorDistance(current: Color, desired: Color) {
  return (((desired - current) % 4) + 4) % 4;
}

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const players = [
  new Player("alexander", 1, 0, Color.Red),
  new Player("cole", 2, 0, Color.Red),
  new Player("jake", 3, 0, Color.Red),
  new Player("josh", 4, 1, Color.Blue),
  new Player("max", 5, 1, Color.Blue),
  new Player("mayfield", 6, 1, Color.Blue),
  new Player("noah", 7, 2, Color.Yellow),
  new Player("tim", 8, 2, Color.Yellow)
];

function run() {
  const teamCount =
    players.length < 6
      ? 2
      : players.length < 8
      ? 2 + Math.floor(Math.random() * 2)
      : 2 + Math.floor(Math.random() * 3);

  console.log("teamCount:", teamCount);
  shuffle(players);
  // console.log("shuffled:", players);
  for (let i = 0; i < players.length; i++) {
    players[i].team = Math.floor((i * teamCount) / players.length);
  }
  console.log("teamed:", JSON.stringify(players, null, 2));

  let bestOptions = [];

  for (const optionColors of permutations(
    [Color.Red, Color.Yellow, Color.Blue, Color.Green],
    teamCount
  )) {
    const option = { colors: optionColors, totalChanges: 0, playerChanges: 0 };
    for (const player of players) {
      const distance = calculateColorDistance(
        player.color,
        option.colors[player.team]
      );
      if (distance > 0) {
        option.totalChanges += distance;
        option.playerChanges += 1;
      }
    }
    console.log(
      option.colors.map(it => Colors[it]),
      option.totalChanges,
      option.playerChanges
    );
  }

  function recurse(availableTeams: Color[]) {
    return [];
  }
}

run();
