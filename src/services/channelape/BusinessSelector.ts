import { ChannelApeClient, Business } from 'channelape-sdk';
import * as inquirer from 'inquirer';

export default class BusinessSelector {
  public static getQuestion(channelApeClient: ChannelApeClient): Promise<inquirer.Question> {
    return channelApeClient.sessions().get(channelApeClient.SessionId)
      .then((session) => {
         return channelApeClient.businesses().get({ userId: session.userId });
      })
      .then((businesses) => {
        return this.getInquirerBusinessQuestion(businesses);
      }) as any;
  }

  private static getInquirerBusinessQuestion(businesses: Business[]): inquirer.Question {
    return {
      name: 'businesses',
      message: 'Choose each business you which to monitor',
      type: 'checkbox',
      choices: this.getInquirerBusinessChoices(businesses)
    };
  }

  private static getInquirerBusinessChoices(businesses: Business[]): { name: string, value: Business }[] {
    return businesses.map((b) => {
      return {
        name: `${b.name} <${b.id}>`,
        value: b
      }
    });
  }
}
