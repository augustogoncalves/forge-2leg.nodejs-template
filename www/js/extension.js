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

AutodeskNamespace('Autodesk.ADN.Viewing.Extension.MyExtension');

Autodesk.ADN.Viewing.Extension.MyExtension = function (viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _self = this;

  ///////////////////////////////////////////////////////////////////////////
  // load callback
  ///////////////////////////////////////////////////////////////////////////
  _self.load = function () {

    // need to access geometry? wait until is loaded
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(){
      // ToDo: viewer geometry is ready
    });

    console.log('MyExtension loaded');
    return true;
  };


  ///////////////////////////////////////////////////////////////////////////
  // unload callback
  ///////////////////////////////////////////////////////////////////////////
  _self.unload = function () {
    // ToDo: prepare to unload the extension

    console.log('MyExtension unloaded');
    return true;
  };
};

Autodesk.ADN.Viewing.Extension.MyExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.MyExtension.prototype.constructor = Autodesk.ADN.Viewing.Extension.MyExtension;

Autodesk.Viewing.theExtensionManager.registerExtension('Autodesk.ADN.Viewing.Extension.MyExtension', Autodesk.ADN.Viewing.Extension.MyExtension);

// How to load?
// see ./viewer.js:loadDocument
