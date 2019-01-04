import SupplierOrChannelState from './SupplierOrChannelState';

export default interface MonitorData {
  businessId: string;
  supplierOrChannelStates: SupplierOrChannelState[];
}
