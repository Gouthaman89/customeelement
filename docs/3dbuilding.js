(function () {
    let template = document.createElement("template");
    template.innerHTML = ` <style>

        .annotation-marker {
            color: #ffffff;
            line-height: 1.8;
            text-align: center;
            font-family: "monospace";
            font-weight: bold;
            position: absolute;
            width: 25px;
            height: 25px;
            border-radius: 15px;
            border: 2px solid #ffffff;
            background: black;
            visibility: hidden;
            box-shadow: 5px 5px 15px 1px #000000;
            z-index: 0;
        }

        .annotation-label {
            position: absolute;
            max-width: 250px;
            min-height: 50px;
            padding: 8px;
            padding-left: 12px;
            padding-right: 12px;
            background: #ffffff;
            color: #000000;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 8px;
            border: #ffffff solid 2px;
            box-shadow: 5px 5px 15px 1px #000000;
            z-index: 90000;
        }

        .annotation-label:after {
            content: '';
            position: absolute;
            border-style: solid;
            border-width: 8px 12px 8px 0;
            border-color: transparent white;
            display: block;
            width: 0;
            z-index: 1;
            margin-top: -11px;
            left: -12px;
            top: 20px;
        }

        .annotation-label:before {
            content: '';
            position: absolute;
            border-style: solid;
            border-width: 9px 13px 9px 0;
            border-color: transparent #ffffff;
            display: block;
            width: 0;
            z-index: 0;
            margin-top: -12px;
            left: -15px;
            top: 20px;
        }

        .annotation-title {
            font: normal 20px arial, serif;
            margin-bottom: 8px;
        }

        .annotation-desc {
            font: normal 14px arial, serif;
        }

    </style>
    <style>

        /* ----------------------------------------------------------------------------------------------------------*/
        /* NavCubePlugin */
        /* ----------------------------------------------------------------------------------------------------------*/

        #myNavCubeCanvas {
            position: absolute;
            width: 250px;
            height: 250px;
            bottom: 50px;
            right: 10px;
            z-index: 200000;
        }

        /* ----------------------------------------------------------------------------------------------------------*/
        /* TreeViewPlugin */
        /* ----------------------------------------------------------------------------------------------------------*/

        #treeViewContainer {
            pointer-events: all;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.2);
            color: black;
            top: 80px;
            z-index: 200000;
            float: left;
            left: 0;
            padding-left: 10px;
            font-family: 'Roboto', sans-serif;
            font-size: 15px;
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            width: 350px;
        }

        #treeViewContainer ul {
            list-style: none;
            padding-left: 1.75em;
            pointer-events: none;
        }

        #treeViewContainer ul li {
            position: relative;
            width: 500px;
            pointer-events: none;
            padding-top: 3px;
            padding-bottom: 3px;
            vertical-align: middle;
        }

        #treeViewContainer ul li a {
            background-color: #eee;
            border-radius: 50%;
            color: #000;
            display: inline-block;
            height: 1.5em;
            left: -1.5em;
            position: absolute;
            text-align: center;
            text-decoration: none;
            width: 1.5em;
            pointer-events: all;
        }

        #treeViewContainer ul li a.plus {
            background-color: #ded;
            pointer-events: all;
        }

        #treeViewContainer ul li a.minus {
            background-color: #eee;
            pointer-events: all;
        }

        #treeViewContainer ul li a:active {
            top: 1px;
            pointer-events: all;
        }

        #treeViewContainer ul li span:hover {
            color: white;
            cursor: pointer;
            background: black;
            padding-left: 2px;
            pointer-events: all;
        }

        #treeViewContainer ul li span {
            display: inline-block;
            width: calc(100% - 50px);
            padding-left: 2px;
            pointer-events: all;
            height: 23px;
        }

        #treeViewContainer .highlighted-node { /* Appearance of node highlighted with TreeViewPlugin#showNode() */
            border: black solid 1px;
            background: yellow;
            color: black;
            padding-left: 1px;
            padding-right: 5px;
            pointer-events: all;
        }

        /* ----------------------------------------------------------------------------------------------------------*/
        /* ContextMenu */
        /* ----------------------------------------------------------------------------------------------------------*/

        .xeokit-context-menu {
            font-family: 'Roboto', sans-serif;
            font-size: 15px;
            display: none;
            z-index: 300000;
            background: rgba(255, 255, 255, 0.46);
            border: 1px solid black;
            border-radius: 6px;
            padding: 0;
            width: 200px;
        }

        .xeokit-context-menu ul {
            list-style: none;
            margin-left: 0;
            padding: 0;
        }

        .xeokit-context-menu ul li {
            list-style-type: none;
            padding-left: 10px;
            padding-right: 20px;
            padding-top: 4px;
            padding-bottom: 4px;
            color: black;
            border-bottom: 1px solid gray;
            background: rgba(255, 255, 255, 0.46);
            cursor: pointer;
            width: calc(100% - 30px);
        }

        .xeokit-context-menu ul li:hover {
            background: black;
            color: white;
            font-weight: bold;
        }

        .xeokit-context-menu ul li span {
            display: inline-block;
        }

        .xeokit-context-menu .disabled {
            display: inline-block;
            color: gray;
            cursor: default;
            font-weight: normal;
        }

        .xeokit-context-menu .disabled:hover {
            color: gray;
            cursor: default;
            background: #eeeeee;
            font-weight: normal;
        }

        /* ----------------------------------------------------------------------------------------------------------*/
        /* CameraControl pivot element */
        /* ----------------------------------------------------------------------------------------------------------*/

        .xeokit-camera-pivot-marker {
            color: #ffffff;
            line-height: 1.8;
            text-align: center;
            font-family: "monospace";
            font-weight: bold;
            position: absolute;
            width: 25px;
            height: 25px;
            border-radius: 15px;
            border: 2px solid #ebebeb;
            background: black;
            visibility: hidden;
            box-shadow: 5px 5px 15px 1px #000000;
            z-index: 0;
            pointer-events: none;
        }
    </style><canvas id="myCanvas" width="600" height="650"></canvas><canvas id="myNavCubeCanvas"></canvas>
<div id="treeViewContainer"></div>
<div class="slideout-sidebar">
    <img class="info-icon" src="../assets/images/bim_icon.png"/>
    <h1>XKTLoaderPlugin</h1>
    <h2>Loading a double-precision BIM Model from the file system</h2>
    <p>Geometry in this IFC model is placed at [1842022, 10, -5173301], which causes its coordinates to have
        large values that rely on xeokit's double-precision precision support.</p>
    <h3>Stats</h3>
    <ul>
        <li>
            <div id="time">Loading JavaScript modules...</div>
        </li>
    </ul>
    <h3>Components used</h3>
    <ul>
        <li>
            <a href="../docs/class/src/viewer/Viewer.js~Viewer.html"
               target="_other">Viewer</a>
        </li>
        <li>
            <a href="../docs/class/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js~XKTLoaderPlugin.html"
               target="_other">XKTLoaderPlugin</a>
        </li>
        <li>
            <a href="../docs/class/src/plugins/TreeViewPlugin/TreeViewPlugin.js~TreeViewPlugin.html"
               target="_other">TreeViewPlugin</a>
        </li>
        <li>
            <a href="../docs/class/src/extras/ContextMenu/ContextMenu.js~ContextMenu.html"
               target="_other">ContextMenu</a>
        </li>
        <li>
            <a href="../docs/class/src/plugins/NavCubePlugin/NavCubePlugin.js~NavCubePlugin.html"
               target="_other">NavCubePlugin</a>
        </li>
    </ul>
    <h3>Resources</h3>
    <ul>
        <li>Double-precision IFC model provided by <a href="https://bimdata.io" target="_other">BIMData.io</a>
        </li>
    </ul>
</div>`;
    class FGANTT extends HTMLElement {
      constructor() {
        super();
            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this._props = undefined;
            this._init = true;
            this._firstUpdate = true;
            this._firstResize = true;
            this._selectionEvent = false;

      }
      connectedCallback() {
        var shadow =document.getElementsByTagName('com-demo-gauge');
        // var custelem = shadow.host;
        // this.$width = custelem.parentNode.parentNode.parentNode.style.width;
         //this.$height = custelem.parentNode.parentNode.parentNode.style.height;
         let LoadLibs = async function(host, data, props) {
             try {
                 //await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js", shadow);
               //await host.loadScript("./dist/xeokit-sdk.min.es.js", shadow);
                  await host.loadScript1("https://gouthaman89.github.io/customeelement/docs/moduel2.js", shadow);
             } catch (e) {
                 console.log(JSON.stringify(e));
             } finally {
               host.drawChart(data, props);
             }
         };
         LoadLibs(this, this.$data, this._props);
        this._init = false;
      }
      drawChart(value, config) {
        //import {Viewer, XKTLoaderPlugin, ContextMenu, TreeViewPlugin, NavCubePlugin, AnnotationsPlugin} from "./dist/xeokit-sdk.min.es.js";
      var rr=this.shadowRoot;
    }
            

loadScript1(src, shadowRoot) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        script.type="module";
        script.crossOrigin = '*';
        script.onload = () => {
            mode: "cors",
            console.log("Load: " + src);
            resolve(script);
        };
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
}        
    }

    customElements.define("com-demo-gauge", FGANTT);
  })();
