import batchRequest from "batch-request-js";
import convertToJson from "./utils/convertToJson.js";
import "dotenv/config";
import convertToExcel from "./utils/convertToExcel.js";
import dateFormatter from "./utils/dateFormatter.js";

const dsnCount = async (devicesId) => {
  // let DNS_URL = `${process.env.URL}//18648382`;
  const token = process.env.TOK;
  const request = (customerId) =>
    fetch(`${process.env.URL}/services/api/inventory/devices/${customerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

  const { error, data } = await batchRequest(devicesId, request, {
    batchSize: 500,
    delay: 1000,
  });

  // convertToJson(data, "devicesInfo");
  const dsnLists = data.map((item) => {
    return {
      id: item.id,
      version: item.version,
      deviceNumber: item.deviceNumber,
      androidId: item.androidId,
      deviceTypeId: item.deviceTypeId,
      model: item.model,
      brand: item.brand,
      manufacturer: item.manufacturer,
      maxInvoiceChunk: item.maxInvoiceChunk,
      minInvoiceLevel: item.minInvoiceLevel,
      isActivated: item.isActivated,
      isInitiated: item.isInitiated,
      isLocked: item.isLocked,
      store: item.store,
      bin: item.bin,
    };
  });
  const today = dateFormatter();
  convertToExcel(dsnLists, `devices-${today}`);
};

export default dsnCount;
