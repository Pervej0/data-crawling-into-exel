const fs = require("fs");
const XLSX = require("xlsx");
const devicesCount = require("./devices");
require("dotenv").config();
let allId = [];

const dsnCount = () => {
  let DNS_URL = `${process.env.URL}/services/api/inventory/devices/18648382`;
  const token = process.env.TOK;
  console.log(token, DNS_URL, "ccc");
  // for (let i = 1; i < 2; i++) {
  //   const ConvertNum = String(i);
  fetch(DNS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   allData.push(data);
      console.log(data);
      // console.log(data.content);
      // console.log(i);
    })
    .catch((error) => console.error("Error:", error));
  // }

  //   setTimeout(() => {
  //     // json formatted data
  //     const jsonString = JSON.stringify(allData, null, 2);
  //     fs.writeFile("small-data.json", jsonString, (err) => {
  //       if (err) {
  //         console.error("Error writing JSON to file", err);
  //       } else {
  //         console.log("JSON file has been created successfully.");
  //       }
  //     });

  // convert to excel
  // if (allData.length > 0) {
  //   const flattenedData = allData.flat();

  //   // Convert the flattened array to a worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(flattenedData);

  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //   // Export the Excel file
  //   XLSX.writeFile(workbook, "nested_data.xlsx");
  // }
  //   }, 20000);
};

// dsnCount();
