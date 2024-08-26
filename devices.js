import dsnCount from "./dsn.js";
import convertToExel from "./utils/convertToExcel.js";
import convertToJson from "./utils/convertToJson.js";
import batchRequest from "batch-request-js";
import "dotenv/config";
let allData = [];
// let allDevicesId = [];

const devicesCount = async () => {
  let url = `${process.env.URL}/services/api/inventory/devices?page=1&&size=10`;
  const token = process.env.TOK;
  let totalPages = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.totalPages;
    })
    .catch((error) => console.error("Error:", error));

  // Batch Request
  const records = Array(totalPages)
    .fill(0)
    .map((zero, i) => i);

  const request = (pageNumber) =>
    fetch(
      `${process.env.URL}/services/api/inventory/devices?page=${pageNumber}&&size=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());

  const { error, data } = await batchRequest(records, request, {
    batchSize: 500,
    delay: 1000,
  });
  const devicesId = data
    .map((cnt) => cnt.content.map((item) => item.id))
    .flat();
  dsnCount(devicesId);
};

devicesCount();

// batch query for dsn retrieving
// let breakMoment = 21000 / 50;
// let stage = 0;
// for (let i = 0; i < 21000; i++) {
//   console.log(i);
//   if (breakMoment === i) {
//     stage++;
//     console.log("=========== Stage ===========", stage, breakMoment);
//     breakMoment += breakMoment;
//   }
// }

// setTimeout(() => {
//   breakMoment += breakMoment;
//   console.log("======== STAGE ========: ", stage++);
// }, 20000);
