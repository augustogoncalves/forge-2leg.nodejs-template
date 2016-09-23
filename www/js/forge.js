/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  $('#menuUploadFile').click(uploadFile);
});

function getForgeToken() {
  var token = '';
  jQuery.ajax({
    url: '/forge/oauth/token',
    success: function (res) {
      token = res;
    },
    async: false // this request must be synchronous for the Forge Viewer
  });
  if (token != '') console.log('2 legged token: ' + token); // debug
  return token;
}

function upload(file) {
  $.notify('Uploading "' + file + '", please wait...', 'info');

  jQuery.ajax({
    url: '/forge/modelderivative/translate',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      'file': file
    }),
    success: function (data) {
      $.notify('Translation started, please wait...', 'info');
      appendToModelsMenu(file, data.urn);
      wait(data.urn);
    }
  });
}

function uploadFile() {
  $('#uploadFile')[0].reset();
  $('#hiddenUploadField').click();
  $('#hiddenUploadField').change(function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('fileToUpload', file);

    $.notify('Uploading "' + file.name + '", please wait...', 'info');

    jQuery.ajax({
      url: '/forge/oss/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function (data) {
        $.notify('Translation started, please wait...', 'info');
        appendToModelsMenu(file.name, data.urn);
        wait(data.urn);
      }
    });

  });
}

function appendToModelsMenu(fileName, urn){
  $("#filesToView").append('<li><a href="#" onclick="launchViewer(\'forgeViewer\', \'' + urn + '\')">' + fileName + '</a></li>');
}

function wait(urn) {
  setTimeout(function () {
    jQuery.ajax({
      url: '/forge/modelderivative/isReadyToShow',
      contentType: 'application/json',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        'urn': urn
      }),
      success: function (res) {
        if (res.readyToShow) {
          $.notify('Ready! Launching viewer.', 'info');
          launchViewer('forgeViewer', res.urn);
        }
        else {
          $.notify(res.status, 'warn');
          wait(res.urn);
        }
      },
      error: function (res) {
        res = JSON.parse(res.responseText);
        $.notify(res.error, 'error');
      }
    });
  }, 5000);
}
