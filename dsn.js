import batchRequest from "batch-request-js";
import "dotenv/config";
import convertToExcel from "./utils/convertToExcel.js";
import dateFormatter from "./utils/dateFormatter.js";

const dsnCount = async (devicesId) => {
  const token = process.env.TOK;
  const request = (id) =>
    fetch(`${process.env.URL}/services/api/inventory/devices/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

  const { error, data } = await batchRequest(devicesId, request, {
    batchSize: 500,
    delay: 2000,
  });

  const dsnLists = data.map((item) => {
    return {
      id: item.id,
      version: item.version,
      deviceNumber: item.deviceNumber,
      androidId: item.androidId,
      deviceTypeId: item.deviceTypeId,
      manufacturer: item.manufacturer,
      maxInvoiceChunk: item.maxInvoiceChunk,
      minInvoiceLevel: item.minInvoiceLevel,
      isActivated: item.isActivated,
      isInitiated: item.isInitiated,
      isLocked: item.isLocked,
      bin: item.bin,
      outletName: item.outlet.outletNameEn || outletNameBn,
      outLetAddress: item.outlet.addressLine1 || item.outlet.addressLine2,
      outletContact: item.outlet.mobile || item.outlet.phone,
      officeName: item.office.officeNameEn || item.office.officeNameBn,
    };
  });

  const today = dateFormatter();
  await convertToExcel(dsnLists, `devices-${today}`);
  // await convertToJson(dsnLists, `devices-${today}`);
};

export default dsnCount;
