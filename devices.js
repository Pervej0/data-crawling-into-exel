const fs = require("fs");
const XLSX = require("xlsx");
let allData = [];

const devicesCount = () => {
  for (let i = 1; i < 440; i++) {
    const ConvertNum = String(i);
    const url = `https://efdmsapi.nbr.gov.bd/efdms/services/api/inventory/devices?page=${ConvertNum}&&size=50`;
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6YW1hbiIsImlhdCI6MTcyMzcxMzQ2MCwiZXhwIjoxNzIzNzk5ODYwfQ.yBCgBXDG7ey8kjpgpMLxLas1PWTB45d3sdWj100Uxp-MNV7c5Ro8YzOV8tHVJ6K9oLlXq-lyZ5xebn7QA1lxQQ";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        allData.push(data.content);
        console.log(data.content.length, i);
        // console.log(data.content);
        // console.log(i);
      })
      .catch((error) => console.error("Error:", error));
  }

  setTimeout(() => {
    // const jsonString = JSON.stringify(allData, null, 2);
    // fs.writeFile("data.json", jsonString, (err) => {
    //   if (err) {
    //     console.error("Error writing JSON to file", err);
    //   } else {
    //     console.log("JSON file has been created successfully.");
    //   }
    // });

    if (allData.length > 0) {
      const flattenedData = allData.flat();

      // Convert the flattened array to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Export the Excel file
      XLSX.writeFile(workbook, "nested_data.xlsx");
    }
    // console.log(allData);
  }, 20000);
};

devicesCount();
