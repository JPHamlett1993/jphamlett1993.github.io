/**
 * Created by jphamlett on 11/23/16.
 */

var clientId = 'c3d615d6b18d048';
var clientSecret = '4cb459f23021908fcc8aafd4cd8676afb35f24f8';
var refresh_token = '486a7a6180b665c100a50cc672b57d665f9bad97';
var albumId = 'WKZYP'; // Your owned album id

function addImageToAlbum(r, accessToken){
    var imgId = r.data.id;
    var albumLink = 'https://api.imgur.com/3/album/' + albumId + '/add';

    $.ajax({
        url: albumLink,
        type: "POST",
        datatype: "json",
        data: {
            ids: imgId
        },
        success: function (r) {
            console.log("Success fully added image to album");
        },
        error: function () {
            console.log("fail");

        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + accessToken);
        }
    });
}

function uploadImage(r){
    try {
        var img = document.getElementById('canvas').toDataURL('image/jpeg', 0.9).split(',')[1];
    } catch(e) {
        var img = document.getElementById('canvas').toDataURL().split(',')[1];
    }
    var accessToken = JSON.parse(r.responseText).access_token;
    $.ajax({
        url: "https://api.imgur.com/3/image",
        type: "POST",
        datatype: "json",
        data: {
            image: img,
            type: 'base64'
        },
        success: function (r) {
            addImageToAlbum(r, accessToken);
        },
        error: function () {
            console.log("fail");

        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + accessToken);
        }
    });
};

$("#upload-to-album").click(function() {
    console.log("starting");
    $.ajax({
        url: "https://api.imgur.com/oauth2/token",
        type: "POST",
        datatype: "json",
        data: {
            refresh_token: refresh_token,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "refresh_token"
        },
        complete: function(r){
            uploadImage(r);
        }
    });
    // $.ajax({
    //     url: "https://api.imgur.com/3/album/WKZYP/add",
    //     type: "POST",
    //     datatype: "json",
    //     data: {ids: 'PKyME1T'},
    //     success: function () {
    //         console.log("success");
    //
    //     },
    //     error: function () {
    //         console.log("fail");
    //
    //     },
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Authorization", 'Bearer ' + token);
    //     }
    // });
    console.log("Success");
});

//
//
// https://imgur.com/#access_token=38201230d27aebdf5a45467a5afcf555ea0b7943&expires_in=2419200&token_type=bearer&refresh_token=486a7a6180b665c100a50cc672b57d665f9bad97&account_username=GlitchArtBot&account_id=45301615
