$(document).ready(function() {
    renderMapList(data);
    renderHours(data);
    renderMap(data.map);
    // TODO: replace 4 lines above with single line below and make map-template work with lat/lng in data object
    // renderMap(data);
})

// Input: data object from data.js
//
// Output: data.hours should be processed from a pipe delimited CSV into a data array
// that can be used in the hours-template on index.html
function processHours(data) {
    var hoursData = data.hours;
    var data = {};
    //
    hoursData.split(",").forEach(function(o){
        var tmp = o.split("|");
        var weekday = tmp[0].toLowerCase();
        var hours = tmp[1];
        data[weekday] = hours;
 
    });
    return data;
}

// Input: function takes 2 parameters
//     html - template block that has {{variables}} for replacement
//     data - the keys match with the variables in the template and the value is replaced
//
// Output: processed html with values from data replaced into the template
function processTemplate(html, data) {
    if(data != null) {
        var fieldRegex = /{{[\w]+}}/g;
        var field;
        var fields = html.match(fieldRegex);

        for (var i = 0; i < fields.length; i++) {
            field = fields[i].replace("{{", "").replace("}}", "");
            if (data[field]) {
                html = html.replace(fields[i], data[field]);
            } else {
                html = html.replace(fields[i], "");
            }
        }
    }

    return html;
}

function renderMapList(data) {
    var locationCardTemplate = $('.location-card-template').html();
    jQuery('.location-card-container').append(processTemplate(locationCardTemplate, data));
}

function renderHours(data) {
    var hoursTemplate = $('.hours-template').html();
    var hoursData = processHours(data);
    jQuery('.hours-container').append(processTemplate(hoursTemplate, hoursData));
}

function renderMap(data) {
    var mapTemplate = $('.map-template').html();
    jQuery('.map-container').append(processTemplate(mapTemplate, data));
}