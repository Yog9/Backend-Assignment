//import fs library
const fs = require("fs");

//print data
function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

// checks if the command is tail command of linux
function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];
  if (command == "tail") {
    tail(userInputArray.slice(1));
  } else process.stdout.write("Typed command is not accurate");
}

const tail = fullPath => {
  const fileName = fullPath[1];
  const N = fullPath[0];
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    var text = data.toString("utf8");
    var slicedText = text
      .split("\n")
      .slice(-N)
      .join("\n");
    var bufferText = Buffer.from(slicedText, "utf8");
    done(bufferText);
  });
};
process.stdout.write("prompt > ");

// This is triggers after a user types in a line
process.stdin.on("data", userInput => {
  userInput = userInput.toString().trim();
  evaluateCmd(userInput);
});
