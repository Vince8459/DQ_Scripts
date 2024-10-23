$(document).ready(function () {
    $("#mainContent").addClass("homePageContent");
    //$('.header').after("<div class='homeTitle'><div class='overlay'><h1 class='siteTitle' style='font-family:Trajan Pro!important;'>Develop and enforce world-class<br>regulation of financial services<br>within DIFC</h1></div></div>");
    //$('.page-heading').before("<div class='enquiryServiceTitle'><div class='overlay'><h1 class='siteTitle' style='font-family:Trajan Pro!important;'>DEVELOP AND ENFORCED WORLD-CLASS<br>REGULATION OF FINANCIAL SERVICES<br>WITHIN DIFC</h1></div></div>");
    $("body").addClass("homePage");


    var featureFlag_TableName = 'dfsa_featureflags';
    var featureFlag_FeatureNameColumn = 'dfsa_featurename';
    var featureFlag_IsEnabledColumnName = 'dfsa_isenabled';

    var WebApp_SummaryDashboardFlagName = 'WebApp_SummaryDashboard';

    function apiRequest(featurename) {
        var req = new XMLHttpRequest();
        req.open("GET", `${window.location.origin}/_api/${featureFlag_TableName}?$filter=${featureFlag_FeatureNameColumn} eq ${featurename}`, true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        return req;
    }
    webAppSummaryDashboardFlag();
    function webAppSummaryDashboardFlag() {

        var req = apiRequest(WebApp_SummaryDashboardFlagName);
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    for (var i = 0; i < results.value.length; i++) {
                        var isenabled = results.value[i][featureFlag_IsEnabledColumnName];
                        if (isenabled === true) {
                            document.getElementById("summaryContent").style.display = "none";
                        }
                    }
                } else {
                    console.log(this.statusText);
                    //  Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();
    }
});

$(function(){
		var overlay = $('<div id="overlay"></div>');
		overlay.show();
		overlay.appendTo(document.body);
		$('.popup-onload').show();
		$('.close').click(function(){
		$('.popup-onload').hide();
		overlay.appendTo(document.body).remove();
		return false;
		});

		$('.x').click(function(){
		$('.popup').hide();
		overlay.appendTo(document.body).remove();
		return false;
		});
});



 

