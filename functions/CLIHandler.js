const readline = require("readline");

class CLIHandler {
  #userInput;
  #rl;

  constructor() {
    this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.#userInput = [];
  }

  #question(query) {
    return new Promise((resolve, reject) => {
      this.#rl.question(query, (answer) => {
        if (answer === "error") {
          reject(new Error("An error occurred with the input"));
        } else {
          resolve(answer);
        }
      });
    });
  }

  async startCLI() {
    const n = await this.#question(
      "**How many models do you need?**" + "\n > "
    );

    for (let i = 0; i < Number.parseInt(n); i++) {
      const input = await this.#question(`Model ${i + 1}:` + "\n > ");
      this.#userInput.push(input);
    }

    this.#rl.close();
  }

  getUserInput() {
    return this.#userInput;
  }
}

module.exports = CLIHandler;
