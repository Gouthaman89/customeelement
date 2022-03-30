 //------------------------------------------------------------------------------------------------------------------
    // Import the modules we need for this example
    //------------------------------------------------------------------------------------------------------------------

    import {Viewer, XKTLoaderPlugin} from "https://gouthaman89.github.io/customeelement/docs/xeokit-sdk.min.es.js";

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
//------------------------------------------------------------------------------------------------------------------
    // Create an AnnotationsPlugin, with which we'll create annotations
    //------------------------------------------------------------------------------------------------------------------

    const annotations = new AnnotationsPlugin(viewer, {

        markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
            <div class='annotation-title'>{{title}}</div>\
            <div class='annotation-desc'>{{description}}</div>\
            </div>",

        values: {
            markerBGColor: "red",
            labelBGColor: "white",
            glyph: "X",
            title: "Untitled",
            description: "No description"
        }
    });

    var prevAnnotationClicked = null;

    annotations.on("markerClicked", (annotation) => {
        if (prevAnnotationClicked) {
            prevAnnotationClicked.setLabelShown(false);
        }
        annotation.setLabelShown(true);
        viewer.cameraFlight.flyTo(annotation);
        prevAnnotationClicked = annotation;
    });

    model.on("loaded", () => {

        //------------------------------------------------------------------------------------------------------------------
        // Create some Annotations
        //------------------------------------------------------------------------------------------------------------------

        annotations.createAnnotation({

            id: "myAnnotation1",

            entity: viewer.scene.objects["1NnBfb8brERe7QyA2k99wn"],

            worldPos: [-248.50938096873188,23.4141939582806,23.189988115352545],

            occludable: true,
            markerShown: true,
            labelShown: false,

            values: {
                glyph: "A1",
                title: "Wall",
                description: "Need to have a look",
                markerBGColor: "green"
            }
        });
annotations.createAnnotation({

            id: "myAnnotation2",

            entity: viewer.scene.objects["1NnBfb8brERe7QyA2k99wn"],

            worldPos: [-273.02316399258007,26.71305160719885,31.58154262705159],

            occludable: true,
            markerShown: true,
            labelShown: false,
			labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
                <div class='annotation-title'>{{title}}</div>\
                <div class='annotation-desc'>{{description}}</div>\
                <br><img alt='myImage' width='150px' height='100px' src='{{imageSrc}}'>\
                </div>",
            values: {
                glyph: "A2",
                title: "Wall2",
                description: "This wall has problem<br>Take a look at this<br>image:",
                markerBGColor: "red",
                imageSrc: "https://xeokit.io/img/docs/BIMServerLoaderPlugin/schependomlaan.png"
            }
        });
        
    });

    window.viewer = viewer;
    //------------------------------------------------------------------------------------------------------------------
    // Mouse over entities to highlight them
    //------------------------------------------------------------------------------------------------------------------

    var lastEntity = null;

    viewer.cameraControl.on("hover", function (pickResult) {

        if (pickResult) {

            if (!lastEntity || pickResult.entity.id !== lastEntity.id) {

                if (lastEntity) {
                    lastEntity.highlighted = false;
                }

                lastEntity = pickResult.entity;
                pickResult.entity.highlighted = true;
            }
        } else {

            if (lastEntity) {
                lastEntity.highlighted = false;
                lastEntity = null;
            }
        }
    });
