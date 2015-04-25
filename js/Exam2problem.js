function MenuSelect()

{
    if (document.getElementById("menu").value == "Add New Category")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
	document.getElementById("section4").style.visibility = "hidden";
	document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Update Category Description")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
	document.getElementById("section3").style.visibility = "hidden";
	document.getElementById("section4").style.visibility = "hidden";
	document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "visible";
	document.getElementById("section4").style.visibility = "hidden";
	document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display Category List")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
	document.getElementById("section4").style.visibility = "visible";
	document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "About Page Author")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
	document.getElementById("section4").style.visibility = "hidden";
	document.getElementById("section5").style.visibility = "visible";
    }

    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
	document.getElementById("section4").style.visibility = "hidden";
	document.getElementById("section5").style.visibility = "hidden";
    }

}


//------------------------------------------------------------------------

function GetCategoryList()

{ 
    var objRequest = new XMLHttpRequest();  //Create AJAX request object

    //Create URL

    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getALLCategories";
    
    //  url += document.getElementById("custid").value;

    //Checks that the object has returned data

    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        { 
            var output = JSON.parse(objRequest.responseText);
            GenCategoryList(output);
        }
    }
    
    //Initiate the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

// Display of Data

function GenCategoryList(result)
{
    var count = 0; 
    // var dispCategoryList = "";
    var CategoryListTable = "";
     
    // add table structure to function
    CategoryListTable += "<table cellpadding = '10' border = '2'>";
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        // dispCategoryList += result.GetAllCategoriesResult[count].CustomerID + ", " + result.GetAllCategoriesResult[count].CompanyName + "," + result.GetAllCategoriesResult[count].City +"<br>";
    CategoryListTable += "<tr>";    
        CategoryListTable += "<td width= '80'>"+result.GetAllCategoriesResult[count].CID+"</td>";
        CategoryListTable += "<td width='100'>"+result.GetAllCategoriesResult[count].CName+"</td>";
        CategoryListTable += "<td width= '100'>"+result.GetAllCategoriesResult[count].CDescription+"</td>";
    CategoryListTable += "</tr>";
    }
    
    CategoryListTable += "</table>";
    
    document.getElementById("CategoryListTable").innerHTML = CategoryListTable;
}

// ------------------------------------------------------------------------------------------

function CreateCategory()

    {
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
	
	
	//Collect Customer data from web page
	
	var categoryName = document.getElementById("categoryName").value;
	var categoryDescription = document.getElementById ("categoryDescription").value;
	
	
	//Create the Customer parameter string
	var newCategory = '{"CName":"' + categoryName + '","CDescription":"' + categoryDescription + ' "}';
	
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function()
	{
	    if (objRequest.readyState == 4 && objRequest.status == 200)
	    {
		var result = JSON.parse(objRequest.responseText);
		
		OperationResult(result);
	    }
	}
	
    //Start AJAX request

	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(newCategory);
    }
    
function OperationResult(output)

    {
	if (output.WasSuccessful == 1)
	{
	    document.getElementById("result").innerHTML = "The operation was successful!"
	}
	else
	{
	    document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
	}
    }
 
// ----------------------------------------------------------------------------   
    
function UpdateCategoryDescription()

    {
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
	
	
	//Collect Category Update data from web page
	var catID = document.getElementById("catID").value;
	var catDescription = document.getElementById("catDescription").value;
	
	
	//Create the Category Update parameter string
	var newDescription = '{"CID": '+ catID +' ,"CDescription":"' + catDescription + '"}';
	
	
	//Checking for AJAx operation return
	objRequest.onreadystatechange = function()
	{
	    if (objRequest.readyState == 4 && objRequest.status == 200)
	    {
		var result2 = JSON.parse(objRequest.responseText);
		
		OperationResult2(result);
	    }
	}
	
    //Start AJAX request

	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(newDescription);
    }
    
 
function OperationResult2(output)

    {
	if (output.WasSuccessful == 1)
	{
	    document.getElementById("result2").innerHTML = "The operation was successful!"
	}
	else if (output.WasSuccessful == 0)
	{
	    document.getElementById("result2").innerHTML = "The operation failed with an unspecified error!"
	}
	else if (output.WasSuccessful == -2)
	{
	    document.getElementById("result2").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object";
	}
	else (output.WasSuccessful == -3)
	{
	    document.getElementById("result2").innerHTML = "Operation failed because a record with the supplied Category ID could not be found";
	}
    }   
    

// --------------------------------------------------------------------------------------

function DeleteCategoryID()

    {
	var objRequest = new XMLHttpRequest();
	var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
	url += document.getElementById("deleteCategoryID").value;
	
	
    //Checking for AJAX operation return
	objRequest.onreadystatechange = function()
	{
	    if (objRequest.readyState == 4 && objRequest.status == 200)
	    {
		var result3 = JSON.parse(objRequest.responseText);
		
		OperationResult3(result);
	    }
	}
	
    //Start AJAX request

	objRequest.open("GET", url, true);
	objRequest.send();
    }
  

function OperationResult3(output)

    {
	if (result.DeleteCategoryResult == 1)
	{
	    document.getElementById("result3").innerHTML = "The operation was successful!"
	}
	else
	{
	    document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
	}
    }
//------------------------------------------------------

function SAIC()

{
window.open("http://www.saic.edu")
}

function MadWork()
{
window.open("http:www.madelaineblackwood.com")
}

