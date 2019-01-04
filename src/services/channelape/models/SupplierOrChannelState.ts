import { Channel, Action } from 'channelape-sdk';
import Supplier from 'channelape-sdk/dist/suppliers/model/Supplier';

export default interface SupplierOrChannelState {
  supplierOrChannel: (Supplier | Channel);
  lastAction: Action;
}
