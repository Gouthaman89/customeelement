 //------------------------------------------------------------------------------------------------------------------
    // Import the modules we need for this example
    //------------------------------------------------------------------------------------------------------------------

    import {Viewer, XKTLoaderPlugin, ContextMenu, TreeViewPlugin, NavCubePlugin, AnnotationsPlugin} from "https://gouthaman89.github.io/customeelement/docs/xeokit-sdk.min.es.js";

    //------------------------------------------------------------------------------------------------------------------
    // Create a Viewer, arrange the camera
    //------------------------------------------------------------------------------------------------------------------

    const viewer = new Viewer({
        canvasId: "myCanvas",
        transparent: true
    });
viewer.scene.camera.eye = [1841982.5187600704, 19.207790938410042, -5173303.042326414];
    viewer.scene.camera.look = [1842011.793756829, 9.913817421536704, -5173299.841616623];
    viewer.scene.camera.up = [0.2991762376746394, 0.9536370664170352, 0.0327096983532173];

    viewer.scene.xrayMaterial.fill = true;
    viewer.scene.xrayMaterial.fillAlpha = 0.1;
    viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
    viewer.scene.xrayMaterial.edgeAlpha = 0.2;
    viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

    viewer.scene.highlightMaterial.fill = true;
    viewer.scene.highlightMaterial.edges = true;
    viewer.scene.highlightMaterial.fillAlpha = 0.1;
    viewer.scene.highlightMaterial.edgeAlpha = 0.1;
    viewer.scene.highlightMaterial.edgeColor = [1, 1, 0];

    viewer.cameraControl.followPointer = true;

    const pivotElement = document.createRange().createContextualFragment("<div class='xeokit-camera-pivot-marker'></div>").firstChild;
    document.body.appendChild(pivotElement);
    viewer.cameraControl.pivotElement = pivotElement;


    

    //------------------------------------------------------------------------------------------------------------------
    // Create two ContextMenus - one for right-click on empty space, the other for right-click on an Entity
    //------------------------------------------------------------------------------------------------------------------

    const canvasContextMenu = new ContextMenu({
        enabled: true,
        context: {
            viewer: viewer
        },
        items: [
            [
                {
                    title: "Hide All",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numVisibleObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                    }
                },
                {
                    title: "Show All",
                    getEnabled: function (context) {
                        const scene = context.viewer.scene;
                        return (scene.numVisibleObjects < scene.numObjects);
                    },
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        scene.setObjectsVisible(scene.objectIds, true);
                        scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                    }
                }
            ],
            [
                {
                    title: "View Fit All",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                }
            ],
			[
			{
                    title: "All Prority",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                },
                {
                    title: "High Prority",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                }
            ,
			
                {
                    title: "Medium Prority",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                }
            ,
			
                {
                    title: "Low Prority",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                }
            ]
        ]
    });

    const objectContextMenu = new ContextMenu({
        items: [
            [
                {
                    title: "View Fit",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        viewer.cameraFlight.flyTo({
                            aabb: entity.aabb,
                            duration: 0.5
                        }, () => {
                            setTimeout(function () {
                                scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            }, 500);
                        });
                    }
                },
                {
                    title: "View Fit All",
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        context.viewer.cameraFlight.flyTo({
                            projection: "perspective",
                            aabb: scene.getAABB(),
                            duration: 0.5
                        });
                    }
                },
                {
                    title: "Show in Tree",
                    doAction: function (context) {
                        const objectId = context.entity.id;
                        context.treeViewPlugin.showNode(objectId);
                    }
                }
            ],
            [
                {
                    title: "Hide",
                    getEnabled: function (context) {
                        return context.entity.visible;
                    },
                    doAction: function (context) {
                        context.entity.visible = false;
                    }
                },
                {
                    title: "Hide Others",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        const metaObject = viewer.metaScene.metaObjects[entity.id];
                        if (!metaObject) {
                            return;
                        }
                        scene.setObjectsVisible(scene.visibleObjectIds, false);
                        scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                        scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                        metaObject.withMetaObjectsInSubtree((metaObject) => {
                            const entity = scene.objects[metaObject.id];
                            if (entity) {
                                entity.visible = true;
                            }
                        });
                    }
                },
                {
                    title: "Hide All",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numVisibleObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                    }
                },
                {
                    title: "Show All",
                    getEnabled: function (context) {
                        const scene = context.viewer.scene;
                        return (scene.numVisibleObjects < scene.numObjects);
                    },
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        scene.setObjectsVisible(scene.objectIds, true);
                    }
                }
            ],
            [
                {
                    title: "X-Ray",
                    getEnabled: function (context) {
                        return (!context.entity.xrayed);
                    },
                    doAction: function (context) {
                        context.entity.xrayed = true;
                    }
                },
                {
                    title: "Undo X-Ray",
                    getEnabled: function (context) {
                        return context.entity.xrayed;
                    },
                    doAction: function (context) {
                        context.entity.xrayed = false;
                    }
                },
                {
                    title: "X-Ray Others",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        const metaObject = viewer.metaScene.metaObjects[entity.id];
                        if (!metaObject) {
                            return;
                        }
                        scene.setObjectsVisible(scene.objectIds, true);
                        scene.setObjectsXRayed(scene.objectIds, true);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                        scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                        metaObject.withMetaObjectsInSubtree((metaObject) => {
                            const entity = scene.objects[metaObject.id];
                            if (entity) {
                                entity.xrayed = false;
                            }
                        });
                    }
                },
                {
                    title: "Reset X-Ray",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numXRayedObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsXRayed(context.viewer.scene.xrayedObjectIds, false);
                    }
                }
            ],
            [
                {
                    title: "Select",
                    getEnabled: function (context) {
                        return (!context.entity.selected);
                    },
                    doAction: function (context) {
                        context.entity.selected = true;
                    }
                },
                {
                    title: "Undo select",
                    getEnabled: function (context) {
                        return context.entity.selected;
                    },
                    doAction: function (context) {
                        context.entity.selected = false;
                    }
                },
                {
                    title: "Clear Selection",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numSelectedObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsSelected(context.viewer.scene.selectedObjectIds, false);
                    }
                }
            ]
        ],
        enabled: true
    });

    viewer.cameraControl.on("rightClick", function (e) {

        var hit = viewer.scene.pick({
            canvasPos: e.canvasPos
        });

        if (hit && hit.entity.isObject) {

            objectContextMenu.context = { // Must set context before showing menu
                viewer: viewer,
                treeViewPlugin: treeView,
                entity: hit.entity
            };

            objectContextMenu.show(e.event.pageX, e.event.pageY);

        } else {

            canvasContextMenu.context = { // Must set context before showing menu
                viewer: viewer
            };

            canvasContextMenu.show(e.event.pageX, e.event.pageY);
        }

        e.event.preventDefault();
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
