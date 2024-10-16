let lastAgreementText = ''; // Global variable to keep track of the last agreement text
let hasUpdated = false; // Flag to track if the text area has been updated

let outboundButtonChangeableClicked = false;
let adultOnlyClicked = false;
let adultWithChildClicked = false;


document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to each button
    // document.getElementById('outboundButtonChangeable').addEventListener('click', function () {
    //     clearTextAreaIfNecessary(this);
    //     showFields('outbound');
    //     scrollToSection('outboundFields');
    // });
    
    document.getElementById('outboundButtonChangeable').addEventListener('click', function() {
        outboundButtonChangeableClicked = true;
        document.getElementById('popup').style.display = 'block'; // Assuming you want to show a popup when this button is clicked
        checkBothButtons();  // Check if both buttons have been clicked
    });
    
    document.getElementById('adultOnly').addEventListener('click', function() {
        adultOnlyClicked = true;
        document.getElementById('popup').style.display = 'none'; // Hide the popup
        checkBothButtons();  // Check if both buttons have been clicked
    });
    
    document.getElementById('adultWithChild').addEventListener('click', function() {
        adultWithChildClicked = true;
        document.getElementById('popup').style.display = 'none'; // Hide the popup
        checkBothButtons();  // Check if both buttons have been clicked
    });
    
    function checkBothButtons() {
        // If both buttons have been clicked, display the fields
        if (outboundButtonChangeableClicked && adultOnlyClicked) {
            showFields('outbound');
        } else if ( outboundButtonChangeableClicked && adultWithChildClicked) {
            showFields('child');
        }
    }
    
    // document.getElementById('returnButtonChangeable').addEventListener('click', function () {
    //     clearTextAreaIfNecessary(this);
    //     showFields('return');
    //     scrollToSection('returnFields');
    // });
    document.getElementById('flightChangeable').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('flight');
        scrollToSection('flightChangeFields');
    });
    document.getElementById('addingBaggage').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('baggage');
        scrollToSection('baggageFields');
    });
    document.getElementById('flightCancellationRefundable').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('cancellation');
        scrollToSection('cancellationFields');
    });
    document.getElementById('changeButtonNonChangeable').addEventListener('click', function() {
        setTextAreaContent('nonChangeable');
        hideInputs();
    });
    document.getElementById('cancelButtonNonRefundable').addEventListener('click', function() {
        setTextAreaContent('nonRefundable');
        hideInputs();
    });
    document.getElementById('lccFlightCancellationNonRefundable').addEventListener('click', function() {
        setTextAreaContent('lccNonRefundable');
        hideInputs();
    });
    document.getElementById('lccFlightChangeNonChangeable').addEventListener('click', function() {
        setTextAreaContent('lccNonChangeable');
        hideInputs();
    });
    document.getElementById('lccOutboundButton').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('lccOutbound');
        scrollToSection('lccOutboundChangeFields');
    });
    document.getElementById('lccReturnButton').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('lccReturn');
        scrollToSection('lccReturnChangeFields');
    });
    document.getElementById('lccFlightChangeButton').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('lccFlightChange');
    });
    document.getElementById('lccAddingBaggage').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('lccBaggage');
    });
    document.getElementById('lccFlightCancellation').addEventListener('click', function () {
        clearTextAreaIfNecessary(this);
        showFields('lccCancellation');
    });
    
    // Function to show the popup
    function showPopup() {
        document.getElementById('popup').style.display = 'block';
    }

    // Function to hide the popup
    function hidePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    // Add event listeners to the buttons to show the popup
    document.getElementById('outboundButtonChangeable').addEventListener('click', showPopup);
    document.getElementById('returnButtonChangeable').addEventListener('click', showPopup);
    document.getElementById('flightChangeable').addEventListener('click', showPopup);

    // Add event listener to the close button to hide the popup
    document.getElementById('closePopup').addEventListener('click', hidePopup);


    // Event listeners for the agreement buttons
    document.getElementById('customerAgreed').addEventListener('click', function () {
        if (!hasUpdated) {
            displayNotification('Please select a template and fill the required fields first');
        } else {
            clearTextAreaIfNecessary(this);
            setAgreementText('Customer agreed, verified, payment processed, and action taken.\n');
        }
    });
    document.getElementById('customerRejected').addEventListener('click', function () {
        if (!hasUpdated) {
            displayNotification('Please select a template and fill the required fields first');
        } else {
            clearTextAreaIfNecessary(this);
            setAgreementText('Customer rejected the terms, no further action taken.\n');
        }
    });

    // Event listener for the update text area button
    document.getElementById('updateTextArea').addEventListener('click', function() {
        updateTextArea();
        scrollToSection('textArea');
    });

    // Add input event listeners to calculate total fees and baggage cost
    document.getElementById('airlineChangePenalty').addEventListener('input', calculateTotalChangeFees);
    document.getElementById('fareDifference').addEventListener('input', calculateTotalChangeFees);
    document.getElementById('taxDifference').addEventListener('input', calculateTotalChangeFees);
    document.getElementById('airlineChangePenaltyReturn').addEventListener('input', calculateTotalChangeFeesReturn);
    document.getElementById('fareDifferenceReturn').addEventListener('input', calculateTotalChangeFeesReturn);
    document.getElementById('taxDifferenceReturn').addEventListener('input', calculateTotalChangeFeesReturn);
    document.getElementById('airlineChangePenaltyFlight').addEventListener('input', calculateTotalChangeFeesFlight);
    document.getElementById('fareDifferenceFlight').addEventListener('input', calculateTotalChangeFeesFlight);
    document.getElementById('taxDifferenceFlight').addEventListener('input', calculateTotalChangeFeesFlight);
    document.getElementById('costPerPassenger').addEventListener('input', calculateTotalBaggageCost);
    document.getElementById('numberOfPassengers').addEventListener('input', calculateTotalBaggageCost);
    document.getElementById('airlineCancellationPenalty').addEventListener('input', calculateTotalCancellationFlight);
    document.getElementById('nonRefundableTaxes').addEventListener('input', calculateTotalCancellationFlight);
    document.getElementById('lossAmount').addEventListener('input', calculateTotalCancellationFlight);
    document.getElementById('serviceFees').addEventListener('input', calculateTotalCancellationFlight);
    document.getElementById('lccCostPerPassenger').addEventListener('input', calculateTotalLCCBaggageCost);
    document.getElementById('lccNumberOfPassengers').addEventListener('input', calculateTotalLCCBaggageCost);
    document.getElementById('lccAirlineRefundAmount').addEventListener('input', calculateTotalLCCCancellationFees);
    document.getElementById('lccDiscountAmount').addEventListener('input', calculateTotalLCCCancellationFees);
    
    
    // Adult with Child Caluculation
    documemt.getElementById('number-of-adults').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('adult-change-penalty').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('adult-fare-difference').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('adult-tax').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('number-of-child').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('childChangePenalty').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('childFareDifference').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    documemt.getElementById('childTaxDifference').addEventListener('input', calculateAdultAndChildTotalChangeFees);
    

    // Add event listeners for the booking buttons
    document.getElementById('gdsBooking').addEventListener('click', function() {
        updateButtonLabels('GDS');
        document.getElementById('gdsOptions').style.display = 'block';
        document.getElementById('lccOptions').style.display = 'none';
        scrollToSection('gdsOptions');
    });

    document.getElementById('lccBooking').addEventListener('click', function() {
        updateButtonLabels('LCC');
        document.getElementById('gdsOptions').style.display = 'none';
        document.getElementById('lccOptions').style.display = 'block';
        scrollToSection('lccOptions');
    });
});

function showFields(type) {
    // Hide all field sections
    document.getElementById('outboundFields').style.display = 'none';
    document.getElementById('childFields').style.display = 'none';
    document.getElementById('returnFields').style.display = 'none';
    document.getElementById('flightChangeFields').style.display = 'none';
    document.getElementById('baggageFields').style.display = 'none';
    document.getElementById('cancellationFields').style.display = 'none';
    document.getElementById('lccOutboundChangeFields').style.display = 'none'; // Hide LCC Outbound Change Fields
    document.getElementById('lccReturnChangeFields').style.display = 'none'; // Hide LCC Outbound Change Fields
    document.getElementById('lccFlightChangeFields').style.display = 'none'; // Hide LCC Outbound Change Fields
    document.getElementById('lccBaggageFields').style.display = 'none'; // Hide LCC Outbound Change Fields
    document.getElementById('lccCancellationFields').style.display = 'none'; // Hide LCC Outbound Change Fields

    // Show the appropriate field section
    if (type === 'outbound') {
        document.getElementById('outboundFields').style.display = 'block';
    } else if (type === 'child') {
        document.getElementById('childFields').style.display = 'block';
    } else if (type === 'return') {
        document.getElementById('returnFields').style.display = 'block';
    } else if (type === 'flight') {
        document.getElementById('flightChangeFields').style.display = 'block';
    } else if (type === 'baggage') {
        document.getElementById('baggageFields').style.display = 'block';
    } else if (type === 'cancellation') {
        document.getElementById('cancellationFields').style.display = 'block';
    } else if (type === 'lccOutbound') {
        document.getElementById('lccOutboundChangeFields').style.display = 'block'; // Show LCC Outbound Change Fields
    } else if (type === 'lccReturn') {
        document.getElementById('lccReturnChangeFields').style.display = 'block'; // Show LCC Outbound Change Fields
    } else if (type === 'lccFlightChange') {
        document.getElementById('lccFlightChangeFields').style.display = 'block'; // Show LCC Outbound Change Fields
    } else if (type === 'lccBaggage') {
        document.getElementById('lccBaggageFields').style.display = 'block'; // Show LCC Outbound Change Fields
    } else if (type === 'lccCancellation') {
        document.getElementById('lccCancellationFields').style.display = 'block'; // Show LCC Outbound Change Fields
    }

    // Show the additional fields section
    document.getElementById('additionalFields').style.display = 'block';
    document.getElementById('lccAdditionalFields').style.display = 'block';
}

function hideInputs() {
    document.getElementById('additionalFields').style.display = 'none';
    document.getElementById('lccAdditionalFields').style.display = 'none';
}

// Other functions remain unchanged


function setTextAreaContent(type) {
    const textArea = document.getElementById('textArea');
    let content = '';
    if (type === 'nonChangeable') {
        content = 'Customer chatted to change his booking, advised that booking is non-changeable.\n';
    } else if (type === 'nonRefundable') {
        content = 'Customer chatted to cancel his booking, advised that his booking is non-refundable. \n';
    } else if (type === 'lccNonRefundable') {
        content = 'Customer chatted to cancel his LCC booking, advised that his booking is non-refundable. \n';
    } else if (type === 'lccNonChangeable') {
        content = 'Customer chatted to change his LCC booking, advised that his booking is non-changeable. \n';
    }
    textArea.value = content;
}

function setAgreementText(text) {
    const textArea = document.getElementById('textArea');
    
    // Remove the last agreement text if it exists
    if (lastAgreementText) {
        const currentText = textArea.value;
        textArea.value = currentText.replace(lastAgreementText, '');
    }
    
    // Add the new agreement text
    textArea.value += text;
    
    // Update the global variable with the new text
    lastAgreementText = text;
}

function copyToClipboard() {
    const textArea = document.getElementById('textArea');
    if (textArea.value.trim() === '') {
      displayNotification('No text to copy!');
    } else {
      textArea.select(); // Select the content
      document.execCommand('copy'); // Copy the selected content
      displayNotification('Copied to clipboard!'); // Display notification
    }
  }



  function clearTextarea() {
    var textArea = document.getElementById("textArea");
    if (textArea.value.trim() === '') {
      displayNotification('No text to be cleared!');
    } else {
      textArea.value = "";
      currentAgreementText = ''; // Clear the agreement text
      displayNotification('Text cleared!'); // Display notification
    }
  }

  // Function to display a notification
function displayNotification(message) {
    // Remove any existing notifications
    var existingNotification = document.getElementById('notification');
    if (existingNotification) {
      document.body.removeChild(existingNotification);
    }
  
    // Create a new notification
    var notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.top = '0';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#FFEB9C';
    notification.style.padding = '10px';
    notification.style.zIndex = '1000';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    notification.style.textAlign = 'center';
    // notification.style.fontWeight = 'bold';
    document.body.appendChild(notification);
    setTimeout(function() {
      // Remove the notification after 3 seconds
      if (notification === document.getElementById('notification')) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }

function calculateTotalChangeFees() {
    const penalty = parseFloat(document.getElementById('airlineChangePenalty').value) || 0;
    const fareDiff = parseFloat(document.getElementById('fareDifference').value) || 0;
    const taxDiff = parseFloat(document.getElementById('taxDifference').value) || 0;
    const total = penalty + fareDiff + taxDiff;
    document.getElementById('totalChangeFees').value = total.toFixed(2);
}

function calculateAdultAndChildTotalChangeFees() {
    const numAdults = parseFloat(document.getElementById('number-of-adults').value) || 0;
    const adultPenalty = parseFloat(document.getElementById('adult-change-penalty').value) || 0;
    const adultFare = parseFloat(document.getElementById('adult-fare-difference').value) || 0;
    const adultTax = parseFloat(document.getElementById('adult-tax').value) || 0;
    const numChild = parseFloat(document.getElementById('number-of-child').value) || 0;
    const childPenalty = parseFloat(document.getElementById('childChangePenalty').value) || 0;
    const childFareDiff = parseFloat(document.getElementById('childFareDifference').value) || 0;
    const childTaxDiff = parseFloat(document.getElementById('childTaxDifference').value) || 0;
    const total = ((adultPenalty + adultFare + adultTax) * numAdults ) + ((childPenalty + childFareDiff + childTaxDiff) * numChild );
    document.getElementById('total-adultAndChild-change-fees').value = total.toFixed(2);
}

function calculateTotalChangeFeesReturn() {
    const penalty = parseFloat(document.getElementById('airlineChangePenaltyReturn').value) || 0;
    const fareDiff = parseFloat(document.getElementById('fareDifferenceReturn').value) || 0;
    const taxDiff = parseFloat(document.getElementById('taxDifferenceReturn').value) || 0;
    const total = penalty + fareDiff + taxDiff;
    document.getElementById('totalChangeFeesReturn').value = total.toFixed(2);
}

function calculateTotalChangeFeesFlight() {
    const penalty = parseFloat(document.getElementById('airlineChangePenaltyFlight').value) || 0;
    const fareDiff = parseFloat(document.getElementById('fareDifferenceFlight').value) || 0;
    const taxDiff = parseFloat(document.getElementById('taxDifferenceFlight').value) || 0;
    const total = penalty + fareDiff + taxDiff;
    document.getElementById('totalChangeFeesFlight').value = total.toFixed(2);
}

function calculateTotalBaggageCost() {
    const costPerPassenger = parseFloat(document.getElementById('costPerPassenger').value) || 0;
    const numberOfPassengers = parseInt(document.getElementById('numberOfPassengers').value) || 0;
    const total = costPerPassenger * numberOfPassengers;
    document.getElementById('totalBaggageCost').value = total.toFixed(2);
}

function calculateTotalCancellationFlight() {
    const cxPenalty = parseFloat(document.getElementById('airlineCancellationPenalty').value) || 0;
    const nonRefTax = parseFloat(document.getElementById('nonRefundableTaxes').value) || 0;
    const loss = parseFloat(document.getElementById('lossAmount').value) || 0;
    const SF = parseFloat(document.getElementById('serviceFees').value) || 0;
    const total = cxPenalty + nonRefTax + loss + SF;
    document.getElementById('totalCancellationPenalty').value = total.toFixed(2);
}

function calculateTotalLCCCancellationFees() {
    const lccRefundAmount = parseFloat(document.getElementById('lccAirlineRefundAmount').value) || 0;
    const lccDiscount = parseFloat(document.getElementById('lccDiscountAmount').value) || 0;
    const totalLccRefund = lccRefundAmount - lccDiscount;
    document.getElementById('totalLCCRefundAmount').value = totalLccRefund.toFixed(2);
}

function calculateTotalLCCBaggageCost() {
    const lccBaggageCostPerPassenger = parseFloat(document.getElementById('lccCostPerPassenger').value) || 0;
    const lccNumberofPax = parseFloat(document.getElementById('lccNumberOfPassengers').value) || 0;
    const totalLcc = lccBaggageCostPerPassenger * lccNumberofPax;
    document.getElementById('lccTotalBaggageCost').value = totalLcc.toFixed(2);
}

function updateTextArea() {
    // Reset the flag to allow updates
    hasUpdated = false;

    const textArea = document.getElementById('textArea');
    let content = '';
    let missingFields = [];

    const outboundFields = document.getElementById('outboundFields');
    const childFields = document.getElementById('childFields');
    const returnFields = document.getElementById('returnFields');
    const flightChangeFields = document.getElementById('flightChangeFields');
    const baggageFields = document.getElementById('baggageFields');
    const cancellationFields = document.getElementById('cancellationFields');
    const lccOutboundChangeFields = document.getElementById('lccOutboundChangeFields');
    const lccReturnChangeFields = document.getElementById('lccReturnChangeFields');
    const lccFlightChangeFields = document.getElementById('lccFlightChangeFields');
    const lccBaggageFields = document.getElementById('lccBaggageFields');
    const lccCancellationFields = document.getElementById('lccCancellationFields');

    if (outboundFields.style.display === 'block') {
        const newDate = document.getElementById('newRequestedOutboundDate').value.trim();
        const penalty = document.getElementById('airlineChangePenalty').value.trim();
        const fareDiff = document.getElementById('fareDifference').value.trim();
        const taxDiff = document.getElementById('taxDifference').value.trim();
        const totalFees = document.getElementById('totalChangeFees').value.trim();

        if (!newDate) missingFields.push("New Requested Departure Date");
        if (!penalty) missingFields.push("Airline Change Penalty");
        if (!fareDiff) missingFields.push("Fare Difference");
        if (!taxDiff) missingFields.push("Tax Difference");
        if (!totalFees) missingFields.push("Total Change Fees");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his outbound flight, advised the below......
New Requested Departure Date: ${formatDate(newDate)}
Airline Change Penalty: ${penalty} SAR
Fare Difference: ${fareDiff} SAR
Tax Difference: ${taxDiff} SAR
Total Change Fees: ${totalFees} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (childFields.style.display === 'block') {
        const newDate = document.getElementById('new-requested-de-date-child').value.trim();
        const numAdults = document.getElementById('number-of-adults').value.trim();
        const adultPenalty = document.getElementById('adult-change-penalty').value.trim();
        const adultFareDiff = document.getElementById('adult-fare-difference').value.trim();
        const adultTax = document.getElementById('adult-tax').value.trim();
        const numChild = document.getElementById('number-of-child').value.trim();
        const childPenalty = document.getElementById('childChangePenalty').value.trim();
        const childFareDiff = document.getElementById('childFareDifference').value.trim();
        const childTax = document.getElementById('childTaxDifference').value.trim();
        const totalAdultAndChildChangeFees = document.getElementById('total-adultAndChild-change-fees').value.trim();
        
        if (!newDate) missingFields.push("New Requested Departure Date");
        if (!numAdults) missingFields.push("Number of Adults");
        if (!adultPenalty) missingFields.push("Adult Change Penalty");
        if (!adultFareDiff) missingFields.push("Adult Fare Difference");
        if (!adultTax) missingFields.push("Adult Tax Difference");
        if (!numChild) missingFields.push("Number of Children");
        if (!childPenalty) missingFields.push("Child Change Penalty");
        if (!childFareDiff) missingFields.push("Child Fare Difference");
        if (!childTax) missingFields.push("Child Tax Difference");
        if (!totalAdultAndChildChangeFees) missingFields.push("Total Change Fees");
        
        if (missingFields.length === 0) {
            content = `Customer reached out to change his booking for ${numAdults} ADT & ${numChild} CHD, advised the below....
New Requested Departure Date: ${formatDate(newDate)}
Number of Adults: ${numAdults} ADT
Adult Change Penalty: ${adultPenalty} SAR
Adult Fare Difference: ${adultFareDiff} SAR
Adult Tax Difference: ${adultTax} SAR
Number of Children: ${numChild} CHD
Child Change Penalty: ${childPenalty} SAR
Child Fare Difference: ${childFareDiff} SAR
Child Tax Difference: ${childTax} SAR
Total Change Fees: ${totalAdultAndChildChangeFees} SAR\n`;
            hasUpdated = true;
        }
    } else if (returnFields.style.display === 'block') {
        const newDate = document.getElementById('newRequestedReturnDate').value.trim();
        const penalty = document.getElementById('airlineChangePenaltyReturn').value.trim();
        const fareDiff = document.getElementById('fareDifferenceReturn').value.trim();
        const taxDiff = document.getElementById('taxDifferenceReturn').value.trim();
        const totalFees = document.getElementById('totalChangeFeesReturn').value.trim();

        if (!newDate) missingFields.push("New Requested Return Date");
        if (!penalty) missingFields.push("Airline Change Penalty");
        if (!fareDiff) missingFields.push("Fare Difference");
        if (!taxDiff) missingFields.push("Tax Difference");
        if (!totalFees) missingFields.push("Total Change Fees");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his return flight, advised the below......
New Requested Return Date: ${formatDate(newDate)}
Airline Change Penalty: ${penalty} SAR
Fare Difference: ${fareDiff} SAR
Tax Difference: ${taxDiff} SAR
Total Change Fees: ${totalFees} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (flightChangeFields.style.display === 'block') {
        const newDepDate = document.getElementById('newRequestedDepartureDate').value.trim();
        const newRetDate = document.getElementById('newRequestedReturnDateChange').value.trim();
        const penalty = document.getElementById('airlineChangePenaltyFlight').value.trim();
        const fareDiff = document.getElementById('fareDifferenceFlight').value.trim();
        const taxDiff = document.getElementById('taxDifferenceFlight').value.trim();
        const totalFees = document.getElementById('totalChangeFeesFlight').value.trim();

        if (!newDepDate) missingFields.push("New Requested Departure Date");
        if (!newRetDate) missingFields.push("New Requested Return Date");
        if (!penalty) missingFields.push("Airline Change Penalty");
        if (!fareDiff) missingFields.push("Fare Difference");
        if (!taxDiff) missingFields.push("Tax Difference");
        if (!totalFees) missingFields.push("Total Change Fees");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his departure and return flight, advised the below......
New Requested Departure Date: ${formatDate(newDepDate)}
New Requested Return Date: ${formatDate(newRetDate)}
Airline Change Penalty: ${penalty} SAR
Fare Difference: ${fareDiff} SAR
Tax Difference: ${taxDiff} SAR
Total Change Fees: ${totalFees} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (baggageFields.style.display === 'block') {
        const kgs = document.getElementById('requestedKgs').value.trim();
        const pcs = document.getElementById('numberOfPcs').value.trim();
        const passengers = document.getElementById('numberOfPassengers').value.trim();
        const costPerPass = document.getElementById('costPerPassenger').value.trim();
        const totalCost = document.getElementById('totalBaggageCost').value.trim();

        if (!kgs) missingFields.push("Requested KGs");
        if (!pcs) missingFields.push("Number of PCs");
        if (!passengers) missingFields.push("Number of Passengers");
        if (!costPerPass) missingFields.push("Cost Per Passenger");
        if (!totalCost) missingFields.push("Total Baggage Cost");

        if (missingFields.length === 0) {
            content = `Customer chatted to add extra baggage, advised the below......
Requested KGs: ${kgs}
Number of PCs: ${pcs}
Number of Passengers: ${passengers}
Cost Per Passenger: ${costPerPass} SAR
Total Baggage Cost: ${totalCost} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (cancellationFields.style.display === 'block') {
        const cxPenalty = document.getElementById('airlineCancellationPenalty').value.trim();
        const nonRefTax = document.getElementById('nonRefundableTaxes').value.trim();
        const loss = document.getElementById('lossAmount').value.trim();
        const SF = document.getElementById('serviceFees').value.trim();
        const totalCx = document.getElementById('totalCancellationPenalty').value.trim();

        if (!cxPenalty) missingFields.push("Airline Cancellation Penalty");
        if (!nonRefTax) missingFields.push("Non-Refundable Taxes");
        if (!loss) missingFields.push("Loss Amount");
        if (!SF) missingFields.push("Service Fees");
        if (!totalCx) missingFields.push("Total Cancellation Penalty");

        if (missingFields.length === 0) {
            content = `Customer chatted to cancel the booking, advised the below......
Airline Cancellation Penalty: ${cxPenalty} SAR
Non-Refundable Taxes: ${nonRefTax} SAR
Loss Amount: ${loss} SAR
Service Fees: ${SF} SAR
Total Cancellation Penalty: ${totalCx} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (lccOutboundChangeFields.style.display === 'block') {
        const lccNewOutboundChangeDate = document.getElementById('lccNewRequestedOutboundDate').value.trim();
        const lccChangePenalty = document.getElementById('lccAirlineChangeFees').value.trim();

        if (!lccNewOutboundChangeDate) missingFields.push("LCC New Outbound Change Date");
        if (!lccChangePenalty) missingFields.push("LCC Airline Change Penalty");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his LCC Outbound Flight, advised the below.....
LCC New Outbound Change Date: ${formatDate(lccNewOutboundChangeDate)}
LCC Airline Change Penalty: ${lccChangePenalty} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (lccReturnChangeFields.style.display === 'block') {
        const lccNewReturnChangeDate = document.getElementById('newRequestedLCCReturnDate').value.trim();
        const lccReturnChangePenalty = document.getElementById('totalAirlineChangeFeesLCCReturn').value.trim();

        if (!lccNewReturnChangeDate) missingFields.push("LCC New Return Change Date");
        if (!lccReturnChangePenalty) missingFields.push("LCC Airline Return Change Fees");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his LCC Return Flight, advised the below.....
LCC New Return Change Date: ${formatDate(lccNewReturnChangeDate)}
LCC Airline Change Penalty: ${lccReturnChangePenalty} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (lccFlightChangeFields.style.display === 'block') {
        const lccNewFlightChangeDepartureDate = document.getElementById('newRequestedLCCDepartureDate').value.trim();
        const lccNewFlightChangeReturnDate = document.getElementById('newRequestedLCCFlightReturnDate').value.trim();
        const lccFlightAirlineChangePenalty = document.getElementById('totalAirlineChangeFeesLCCFlight').value.trim();

        if (!lccNewFlightChangeDepartureDate) missingFields.push("LCC New Departure Date");
        if (!lccNewFlightChangeReturnDate) missingFields.push("LCC New Return Date");
        if (!lccFlightAirlineChangePenalty) missingFields.push("Total Airline Change Fees");

        if (missingFields.length === 0) {
            content = `Customer chatted to change his LCC Departure and Return flights, advised the below....
LCC New Departure Date: ${formatDate(lccNewFlightChangeDepartureDate)}
LCC New Return Date: ${formatDate(lccNewFlightChangeReturnDate)}
LCC Total Airline Change Fees: ${lccFlightAirlineChangePenalty} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (lccBaggageFields.style.display === 'block') {
        const lccRequestedBaggageKgs = document.getElementById('lccRequestedKgs').value.trim();
        const lccNumberofBaggagePcs = document.getElementById('lccNumberOfPcs').value.trim();
        const lccNumberofPax = document.getElementById('lccNumberOfPassengers').value.trim();
        const lccBaggageCostPerPassenger = document.getElementById('lccCostPerPassenger').value.trim();
        const lccTotalBaggageAmount = document.getElementById('lccTotalBaggageCost').value.trim();

        if (!lccRequestedBaggageKgs) missingFields.push("LCC Requested KGs");
        if (!lccNumberofBaggagePcs) missingFields.push("LCC Number of Pieces");
        if (!lccNumberofPax) missingFields.push("LCC Number of Passengers");
        if (!lccBaggageCostPerPassenger) missingFields.push("LCC Cost Per Passenger");
        if (!lccTotalBaggageAmount) missingFields.push("Total LCC Baggage Cost");

        if (missingFields.length === 0) {
            content = `Customer chatted to add extra baggage to his LCC Booking, advised the below.....
LCC Requested KGs: ${lccRequestedBaggageKgs}
LCC Number of Pieces ${lccNumberofBaggagePcs}
LCC Number of Passengers ${lccNumberofPax}
LCC Cost Per Passenger ${lccBaggageCostPerPassenger} SAR
Total LCC Baggage Cost ${lccTotalBaggageAmount} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    } else if (lccCancellationFields.style.display === 'block') {
        const lccAirlineRefund = document.getElementById('lccAirlineRefundAmount').value.trim();
        const lccDiscountFee = document.getElementById('lccDiscountAmount').value.trim();
        const totalLCCRfnd = document.getElementById('totalLCCRefundAmount').value.trim();

        if (!lccAirlineRefund) missingFields.push("Airline Refund Amount");
        if (!lccDiscountFee) missingFields.push("Discount if applicable");
        if (!totalLCCRfnd) missingFields.push("Total LCC Refund Amount");

        if (missingFields.length === 0) {
            content = `Customer chatted to cancel his LCC booking, advised the below......
Airline Refund Amount: ${lccAirlineRefund} SAR
Discount if applicable: ${lccDiscountFee} SAR
Total LCC Refund Amount: ${totalLCCRfnd} SAR\n`;
            hasUpdated = true; // Set the flag to indicate update is successful
        }
    }

    if (missingFields.length > 0) {
        displayNotification(`Please fill in the following fields: ${missingFields.join(', ')}\nIf no charges are applicable, add 0`);
    } else if (hasUpdated) {
        // Update the text area with the latest content
        textArea.value = content;
    }
}

function clearTextAreaIfNecessary(clickedButton) {
    const buttonIdsToExclude = [
        'customerAgreed', 'customerRejected', 'clearTextarea', 'copyToClipboard'
    ];

    if (!buttonIdsToExclude.includes(clickedButton.id)) {
        document.getElementById('textArea').value = '';
    }
}

function formatDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const d = new Date(date);
    return `${d.getDate()}, ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function updateButtonLabels(type) {
    const prefix = type === 'GDS' ? '' : '';

    // Update labels for actionable buttons
    const actionableButtons = [
        'outboundButtonChangeable', 
        'returnButtonChangeable', 
        'flightChangeable', 
        'addingBaggage', 
        'flightCancellationRefundable',
        'lccOutboundButton',
        'lccReturnButton',
        'lccFlightChangeButton',
        'lccAddingBaggage',
        'lccFlightCancellation',
        'lccFlightCancellationNonRefundable',
        'lccFlightChangeNonChangeable',
    ];

    actionableButtons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.textContent = `${prefix}${button.textContent.replace(/^(GDS|LCC) /, '')}`;
        }
    });

    // Update labels for non-actionable buttons
    const nonActionableButtons = [
        'changeButtonNonChangeable', 
        'cancelButtonNonRefundable'
    ];

    nonActionableButtons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.textContent = `${prefix}${button.textContent.replace(/^(GDS|LCC) /, '')}`;
        }
    });
}


// Modify the JavaScript code in your scripts.js file
const buttons = document.querySelectorAll('section button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'clicked' class from all buttons
        buttons.forEach(btn => btn.classList.remove('clicked'));

        // Add 'clicked' class to the clicked button
        button.classList.add('clicked'); 
    });
});

// In your scripts.js file
const containerButtons = document.querySelectorAll('.button-container button');
const lccBookingButton = document.getElementById('lccBooking');

// Function to handle clicks and toggle 'clicked' class
function handleClick(button) {
    // Remove 'clicked' class from all relevant buttons
    containerButtons.forEach(btn => btn.classList.remove('clicked'));
    lccBookingButton.classList.remove('clicked');

    // Add 'clicked' class to the clicked button
    button.classList.add('clicked'); 
}

containerButtons.forEach(button => {
    button.addEventListener('click', () => handleClick(button));
});

lccBookingButton.addEventListener('click', () => handleClick(lccBookingButton));

// // Function to scroll to the relevant section
function scrollToSection(sectionId) {
     document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth', // This makes the scroll smooth
        block: 'start'      // Scroll to the start of the section
     });
 }