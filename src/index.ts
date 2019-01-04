import { ChannelApeClient, Business, LogLevel, Channel, ActionsQueryRequest } from 'channelape-sdk';
import Supplier from 'channelape-sdk/dist/suppliers/model/Supplier';
import * as inquirer from 'inquirer';

import EnvironmentSelector from './services/channelape/EnvironmentSelector';
import SessionIdSelector from './services/channelape/SessionIdSelector';
import BusinessSelector from './services/channelape/BusinessSelector';
import SupplierAndChannelSelector from './services/channelape/SupplierAndChannelSelector';

let channelApeClient: ChannelApeClient;

inquirer.prompt([
  EnvironmentSelector.Question,
  SessionIdSelector.Question
]).then((answers) => {
  channelApeClient = new ChannelApeClient({
    endpoint: answers.endpoint,
    sessionId: answers.sessionId,
    logLevel: LogLevel.ERROR
  });
  return BusinessSelector.getQuestion(channelApeClient)
    .then((question) => {
      return inquirer.prompt([question]);
    });
}).then(async (answers) => {
  let suppliers: Supplier[] = [];
  let channels: Channel[] = [];
  for (let i = 0; i < answers.businesses.length; i += 1) {
    const business = answers.businesses[i] as Business;
    const thisBusinessesSuppliers = await channelApeClient.suppliers().get({
      businessId: business.id
    });
    suppliers = suppliers.concat(thisBusinessesSuppliers);

    const thisBusinessesChannels = await channelApeClient.channels().get({
      businessId: business.id
    });
    channels = channels.concat(thisBusinessesChannels);
  }
  inquirer.prompt(SupplierAndChannelSelector.getQuestion(suppliers, channels, answers.businesses))
    .then((answers) => {
      startMonitors(answers.suppliersAndChannels);
    });
});

async function startMonitors(suppliersAndChannels: (Supplier | Channel)[]): Promise<any> {
  suppliersAndChannels.forEach((supplierOrChannel) => {
    console.log(supplierOrChannel.name);
  });
}
