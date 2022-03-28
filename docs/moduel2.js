 //------------------------------------------------------------------------------------------------------------------
    // Import the modules we need for this example
    //------------------------------------------------------------------------------------------------------------------

    import {Viewer, XKTLoaderPlugin} from "https://xeokit.github.io/xeokit-sdk/dist/xeokit-sdk.min.es.js";

    //------------------------------------------------------------------------------------------------------------------
    // Create a Viewer, arrange the camera
    //------------------------------------------------------------------------------------------------------------------

    const viewer = new Viewer({
        canvasId: "myCanvas",
        transparent: true
    });

    //----------------------------------------------------------------------------------------------------------------------
    // Load a model
    //----------------------------------------------------------------------------------------------------------------------

    const xktLoader = new XKTLoaderPlugin(viewer);

    const model = xktLoader.load({
        id: "myModel",
        src: "https://gouthaman89.github.io/customeelement/docs/BH220211216.ifc.xkt",
        //metaModelSrc: "../assets/models/xkt/v7/MAP/MAP.json",
        edges: true,
        excludeUnclassifiedObjects: false
    });
    
    model.on("loaded", function () {        
        viewer.cameraFlight.jumpTo(model);
    });
