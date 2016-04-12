var request = require("request");

module.exports = function(app) {

    app.get("/api/project/search/:title", findRecipeByTitle);
    app.get("/api/project/search/recipe/:id", findRecipeById);

    //food2fork api
    var API_URL = "http://food2fork.com/api/";
    var API_KEY = "cc8d030ba4ca67ba101401778e70163e";

    ////new food api
    //var API_URL = "https://api.edamam.com/";
    //var API_KEY = "b4788f216e4bd3581c66235677ce1fd4";
    //var APP_ID = "447a34fb";


    function findRecipeByTitle(req, res) {
        var title = req.params.title;
        //var url = API_URL + "search?q=" + title + "&app_id=" + APP_ID + "&app_key=" + API_KEY;
        var url = API_URL + "search?q=" + title + "&key=" + API_KEY;

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if(error) {
                console.log(error);
            }
            if (response.statusCode === 200) {
                //console.log(body) // Print the json response
                res.json(body.recipes);
            }
        })

    }


    function findRecipeById(req, res) {
        var id = req.params.id;
        var url = API_URL + "get?" + "key=" + API_KEY + "&rId=" + id;

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log(body) // Print the json response
                res.json(body);
            }
        })

    }


}



