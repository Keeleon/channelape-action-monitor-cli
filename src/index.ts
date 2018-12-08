import { ChannelApeClient, LogLevel, ActionsQueryRequest } from 'channelape-sdk';
import * as inquirer from 'inquirer';

import EnvironmentSelector from './services/channelape/EnvironmentSelector';
import SessionIdSelector from './services/channelape/SessionIdSelector';
import BusinessSelector from './services/channelape/BusinessSelector';

let channelApeClient: ChannelApeClient;

inquirer.prompt([
  EnvironmentSelector.Question,
  SessionIdSelector.Question
]).then((answers) => {
  channelApeClient = new ChannelApeClient({
    endpoint: answers.endpoint,
    sessionId: answers.sessionId,
    logLevel: LogLevel.INFO
  });
  return BusinessSelector.getQuestion(channelApeClient)
    .then((question) => {
      return inquirer.prompt([question]);
    });
}).then((answers) => {
  console.log(JSON.stringify(answers));
  
  const actionsQueryRequest: ActionsQueryRequest = {
    businessId: 
  }
  channelApeClient.actions().get({

  });
});
