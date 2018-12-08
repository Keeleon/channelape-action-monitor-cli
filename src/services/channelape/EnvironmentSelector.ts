import * as inquirer from 'inquirer';

import ChannelApeEnvironment from '../channelape/models/ChannelApeEnvironment';

export default class EnvironmentSelector {
  public static get Question(): inquirer.Question {
    return {
      name: 'endpoint',
      message: 'Which API?',
      type: 'list',
      choices: [
        ChannelApeEnvironment.STAGING,
        ChannelApeEnvironment.PRODUCTION
      ],
      default: ChannelApeEnvironment.PRODUCTION
    };
  }
}
