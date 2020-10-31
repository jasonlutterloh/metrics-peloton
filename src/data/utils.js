export const CSVtoJSON = csv => {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      // Fixes issue with quoted strings in CSV
      let filteredLine = lines[i].replace(/"[^"]+"/g, function(quotedString) { 
          quotedString = quotedString.replace(/,/g, '');
          quotedString = quotedString.replace(/"/g, '');
            return quotedString;
        });
      let currentline = filteredLine.split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  };