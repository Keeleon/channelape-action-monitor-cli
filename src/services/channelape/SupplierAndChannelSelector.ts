import { Channel, Business } from 'channelape-sdk';
import Supplier from 'channelape-sdk/dist/suppliers/model/Supplier';
import * as inquirer from 'inquirer';

export default class SupplierAndChannelSelector {
  public static getQuestion(suppliers: Supplier[], channels: Channel[], businesses: Business[]): inquirer.Question {
    const suppliersAndChannels: (Supplier | Channel)[] = suppliers.concat(channels);
    suppliersAndChannels.sort((a, b) => {
      return a.businessId < b.businessId ? 1 : 0;
    });
    return {
      name: 'suppliersAndChannels',
      message: 'Choose each supplier and channel you wish to monitor',
      type: 'checkbox',
      choices: this.getInquirerSupplierAndChannelChoices(suppliersAndChannels, businesses)
    };
  }

  private static getInquirerSupplierAndChannelChoices(
    suppliersAndChannels: (Supplier | Channel)[],
    businesses: Business[]
  ): { name: string, value: (Supplier | Channel) }[] {
    const choices: { name: string, value: (Supplier | Channel) }[] = [];
    let lastBusinessId = '';
    suppliersAndChannels.forEach((supplierOrChannel) => {
      const currentBusinessId = supplierOrChannel.businessId;
      if (lastBusinessId !== currentBusinessId) {
        const business = businesses.find(b => b.id === currentBusinessId);
        const businessName = business === undefined ? 'Unknown Business' : business.name;
        choices.push(new inquirer.Separator(businessName) as any);
      }
      choices.push({
        name: `${supplierOrChannel.name} <${supplierOrChannel.id}>`,
        value: supplierOrChannel
      });
      lastBusinessId = currentBusinessId;
    });
    return choices;
  }
}
