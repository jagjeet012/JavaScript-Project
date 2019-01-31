window.onload = function () {
    // Get the modal
    var modal = document.getElementById('customerModal');

    // Get the button that opens the modal
    var addNewButton = document.getElementById("addCustomerButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    addNewButton.onclick = function () {
        if (document.getElementById("inputCustomerImage") != null) {
            document.getElementById("inputCustomerImage").remove();
        }
        //clear the fields inside the modal
        document.getElementById('customerNameField').value = '';
        document.getElementById('customerEmailField').value = '';
        modal.style.display = "block";
        //showing the drop-zone for image drag and drop input 
        document.getElementById("drop-zone").style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




    var dropZone = document.getElementById('drop-zone');

    // Get file data on drop
    dropZone.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files

        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.match(/image.*/)) {
                var reader = new FileReader();

                reader.onload = function (e2) {
                    // finished reading file data.
                    var img = document.createElement('img');
                    //adding id to the img tag for styling
                    img.id = "inputCustomerImage"
                    img.src = e2.target.result;
                    document.getElementsByClassName("modal-body")[0].appendChild(img);
                    document.getElementById("inputCustomerImage").style.display = "block";
                    document.getElementById("drop-zone").style.display = "none";

                }

                reader.readAsDataURL(file); // start reading the file data.
            }
        }
    });

};

/*
 * This function performs the validation and adds the customer to the list of customers
 */
function addCustomer() {

    var errorMsg = "Please enter ";
    var isValidationFailed = false;
    var customerName;
    var emailId;

    //validating the customer name input field and creating error message if no customer name is provided
    if (document.getElementById("customerNameField").value.trim() == "") {
        errorMsg += "Name"
        isValidationFailed = true;

    } else {
        customerName = document.getElementById("customerNameField").value.trim();
    }

    //validating the email input field and creating error message if no/invalid email found
    if (document.getElementById("customerEmailField").value.trim() == "") {

        if (isValidationFailed) {
            errorMsg += " and Email"
        } else {
            errorMsg += "Email"
        }
        isValidationFailed = true;

    } else if (document.getElementById("customerEmailField").value.indexOf("@") <= 0) {

        if (isValidationFailed) {
            errorMsg += " and Email should contain '@'."
        } else {
            errorMsg += "Email which contains '@'."
        }
        isValidationFailed = true;

    } else {
        emailId = document.getElementById("customerEmailField").value;
    }

    //validating the image input
    if (document.getElementById("inputCustomerImage") == null) {
        if (isValidationFailed) {
            errorMsg += "<br>Also, select an image for the customer, by dragging and dropping into the field provided."

        } else {
            errorMsg = "<br>Please select an image for the customer, by dragging and dropping into the field provided."
        }
        isValidationFailed = true;
    }

    //showing error message when validation fails
    if (isValidationFailed) {
        document.getElementById("validationMessage").style.visibility = "visible";
        document.getElementById("validationMessage").innerHTML = errorMsg;
        return;

    } else {
        document.getElementById('customerModal').style.display = "none";

    }

    var customerCardDiv = document.createElement('div');
    var childCounts = document.getElementById('customerCardsContainer').childElementCount;

    //generating html for adding additional customers as per the name, email and image provided.
    var html = "<div class='customerCard' onclick='showDetailedInfo(this)'> <div><h3 class='customerName'>" + customerName + "</h3><h6 class='customerEmail'>" + emailId + "</h6></div><img class='customerImage' src='" + document.getElementById("inputCustomerImage").src + "'></div></div>"
    customerCardDiv.innerHTML = html;

    document.getElementById("validationMessage").style.visibility = "hidden";
    document.getElementById('customerCardsContainer').appendChild(customerCardDiv);

}


/*
 * This function copies the details of the customer card clicked to Right Hand side grid.
 */
function showDetailedInfo(object) {
    document.getElementById("detailedInfoCard").style.visibility = "visible"
    document.getElementById("detailedInfoCard").innerHTML = object.innerHTML;
}