import * as inquirer from 'inquirer';

export default class EnvironmentSelector {
  public static get Question(): inquirer.Question {
    return {
      name: 'sessionId',
      type: 'input',
      message: 'Input your sessionId / API Key'
    };
  }
}
