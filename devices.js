const fs = require("fs");
const XLSX = require("xlsx");
require("dotenv").config();
let allData = [];

const devicesCount = () => {
  let url;
  const token = process.env.TOK;
  console.log(token, process.env.URL, "ccc");
  for (let i = 1; i < 2; i++) {
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
        allData.push(data);
        console.log(data.content, i);
        // console.log(data.content);
        // console.log(i);
      })
      .catch((error) => console.error("Error:", error));
  }
  if (allData.length < 1) {
    return;
  }
  setTimeout(() => {
    // json formatted data
    const jsonString = JSON.stringify(allData, null, 2);
    fs.writeFile("small-data.json", jsonString, (err) => {
      if (err) {
        console.error("Error writing JSON to file", err);
      } else {
        console.log("JSON file has been created successfully.");
      }
    });

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
  }, 20000);
};

devicesCount();
