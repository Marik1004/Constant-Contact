function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Constant Contact API Connector')
    .addItem('Open Sidebar', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Page')
    .setTitle('Constant Contact API')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

function fetchConstantContactAccountInfoData(url, authToken) {
  var headers = { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json', 'Accept': 'application/json'};

  var options = {
    'method': 'GET',
    'muteHttpExceptions': true, 
    'headers': headers,
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clearContents();

    sheet.getRange('B3:K3').clear(); // Clear headers if there are any
    var headers = ["Organization Name", "Time Zone", "First Name", "Last Name", "Email", "Phone", "Country Code", "State Code", "Organization Addresses", "website"];
    sheet.getRange('B3:K3').setValues([headers]);
    
    // Extract data
    var organizationName = responseData.organization_name || "";
    var timeZone = responseData.time_zone || "";
    var firstName = responseData.first_name || "";
    var lastName = responseData.last_name || "";
    var email = responseData.email || "";
    var phone = responseData.phone || "";
    var countryCode = responseData.country_code || "";
    var stateCode = responseData.state_code || "";
    var website = responseData.website || "";
    
    // Extract organization addresses
    var addresses = responseData.organization_addresses || [];
    var addressText = "";
    for (var i = 0; i < addresses.length; i++) {
      var addressObj = addresses[i];
      var city = addressObj.city || "";
      var addressLine = addressObj.line1 || "";
      var postalCode = addressObj.postal_code || "";
      var countryCode = addressObj.country_code || "";
      var stateCode = addressObj.state_code || "";
      
      // Concatenate address components into a single string
      addressText += city + ", " + addressLine + ", " + postalCode + ", " + countryCode + ", " + stateCode + "\n";
    }
    
    // Write data to the sheet starting from B2
    var rowData = [organizationName, timeZone, firstName, lastName, email, phone, countryCode, stateCode, addressText, website];
    sheet.getRange('B4:K4').setValues([rowData]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(2, headers.length); // Start auto-resize from column B
    return { error: false, message: "Request successful.", data: responseData };
  } catch(e) {
    return { error: true, message: "Error making API request: " + e.toString() };
  }
}

function fetchConstantContactContactsData(url, authToken) {
  var headers = { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json', 'Accept': 'application/json'};

  var options = {
    'method': 'GET',
    'muteHttpExceptions': true, 
    'headers': headers,
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clearContents();

    // Clear existing data in the sheet
    sheet.getRange('B3:Z').clearContent();

    // Write headers
    var headers = ["Status", "Fax", "Confirmed", "Source", "Prefix Name", "Middle Name", "Last Name", "Job Title", "Company Name", "Home Phone", "Work Phone", "Cell Phone", "Created Date", "Modified Date"];
    sheet.getRange('B3:O3').setValues([headers]);

    // Write data
    var data = [];
    
    for (var i = 0; i < responseData.results.length; i++) {
      var element = responseData.results[i];

      data.push([
        element.status ?? "",
        element.fax ?? "",
        element.confirmed ?? "",
        element.source ?? "",
        element.prefix_name ?? "",
        element.middle_name ?? "",
        element.last_name ?? "",
        element.job_title ?? "",
        element.company_name ?? "",
        element.home_phone ?? "",
        element.work_phone ?? "",
        element.cell_phone ?? "",
        element.created_date ?? "",
        element.modified_dat ?? ""
      ]);
    }

    var numRows = data.length;
    var numCols = headers.length;

    sheet.getRange(4, 2, numRows, numCols).setValues(data);
    return { error: false, message: "Request successful.", data: responseData };
  } catch(e) {
    return { error: true, message: "Error making API request: " + e.toString() };
  }
}

function fetchConstantContactContactListsData(url, authToken) {
  var headers = { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json', 'Accept': 'application/json'};

  var options = {
    'method': 'GET',
    'muteHttpExceptions': true, 
    'headers': headers,
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clearContents();

    // Clear existing data in the sheet
    sheet.getRange('B3:G').clearContent();

    // Write headers
    var headers = ["Id", "Name", "Status", "Created Date", "Modified Date", "Contact Count"];
    sheet.getRange('B3:G3').setValues([headers]);

    var data = [];
    
    for (var i = 0; i < responseData.length; i++) {
      var element = responseData[i];

      data.push([
        element.id ?? "",
        element.name ?? "",
        element.status ?? "",
        element.created_date ?? "",
        element.modified_date ?? "",
        element.contact_count ?? "",        
      ]);
    }

    var numRows = data.length;
    var numCols = headers.length;

    sheet.getRange(4, 2, numRows, numCols).setValues(data);
    return { error: false, message: "Request successful.", data: responseData };
  } catch(e) {
    return { error: true, message: "Error making API request: " + e.toString() };
  }
}

function fetchConstantContactCampaignsData(url, authToken) {
  var headers = { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json', 'Accept': 'application/json'};

  var options = {
    'method': 'GET',
    'muteHttpExceptions': true, 
    'headers': headers,
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clearContents();

    // Clear existing data in the sheet
    sheet.getRange('B3:E').clearContent();

    // Write headers
    var headers = ["Id", "Name", "Status", "Modified Date"];
    sheet.getRange('B3:E3').setValues([headers]);

    var data = [];
    
    for (var i = 0; i < responseData.length; i++) {
      var element = responseData[i];

      data.push([
        element.id ?? "",
        element.name ?? "",
        element.status ?? "",
        element.modified_date ?? "",
      ]);
    }

    var numRows = data.length;
    var numCols = headers.length;

    sheet.getRange(4, 2, numRows, numCols).setValues(data);
    return { error: false, message: "Request successful.", data: responseData };
  } catch(e) {
    return { error: true, message: "Error making API request: " + e.toString() };
  }
}

function saveUserAction() {
    var scriptProperties = PropertiesService.getScriptProperties();
    var userActionTimestamps = scriptProperties.getProperty('userActionTimestamps') || '[]';
    var timestamps = JSON.parse(userActionTimestamps);

    // Check if a timestamp already exists
    var existingTimestamp = timestamps.pop();

    // Add the updated or new timestamp
    timestamps.push(existingTimestamp || new Date().toISOString());

    // Save the updated timestamps
    scriptProperties.setProperty('userActionTimestamps', JSON.stringify(timestamps));
}

function parseCellRef(cellRef) {
  var cellRegex = /^([A-Z]+)(\d+)$/;
  var match = cellRef.match(cellRegex);
  if (match) {
    var col = match[1];
    var row = parseInt(match[2], 10);
    return [row, colToNumber(col)];
  } else {
    // Default to starting from A1 if cellRef is invalid
    return [1, 1];
  }
}

function colToNumber(col) {
  var number = 0;
  for (var i = 0; i < col.length; i++) {
    number = number * 26 + col.charCodeAt(i) - 64;
  }
  return number;
}