import dsnCount from "./dsn.js";
import convertToExel from "./utils/convertToExel.js";
import convertToJson from "./utils/convertToJson.js";
import batchRequest from "batch-request-js";
import "dotenv/config";
let allData = [];
let devicesId = [];
let allDevicesId = [];

const devicesCount = () => {
  let url;
  const token = process.env.TOK;
  console.log(token, process.env.URL, "ccc");
  for (let i = 1; i < 440; i++) {
    const ConvertNum = String(i);
    url = `${process.env.URL}/services/api/inventory/devices?page=${ConvertNum}&&size=50`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(i);
        // allData.push(data.content);

        // For DSN
        devicesId = data.content.map((item) => item.id);
        devicesId.map((id) => allDevicesId.push(id));
      })
      .catch((error) => console.error("Error:", error));
  }
  // if (allData.length < 1) {
  //   return;
  // }
  return setTimeout(() => {
    // exports.allDevicesId = allDevicesId;
    // json formatted data
    // convertToJson(allData, devices);
    // convert to excel
    // convertToExel(allData);

    // Get DSN Data

    dsnCount(allDevicesId);
  }, 20000);
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
