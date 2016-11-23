/**
 * Created by jphamlett on 11/23/16.
 */

var clientId = 'c3d615d6b18d048'
var clientSecret = '4cb459f23021908fcc8aafd4cd8676afb35f24f8'
var token = '1e7635db34652302f1196565da21867daa9f0c36'
var imgUrl = "http://i.imgur.com/PKyME1T.png";
var albumId = 'WKZYP'; // Your owned album id

$("#upload-to-album").click(function() {
    console.log("starting");
    $.ajax({
        url: "https://api.imgur.com/3/upload",
        type: "POST",
        datatype: "json",
        data: {image: imgUrl, album: albumId},
        success: showMe,
        error: showMe,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + token);
        }
    });
    console.log("Success");
});
