(function () {
    let template = document.createElement("template");
    template.innerHTML = `<style id="xeokit-spinner-css">.sk-fading-circle {        background: transparent;        margin: 20px auto;        width: 50px;        height:50px;        position: relative;        }        .sk-fading-circle .sk-circle {        width: 120%;        height: 120%;        position: absolute;        left: 0;        top: 0;        }        .sk-fading-circle .sk-circle:before {        content: '';        display: block;        margin: 0 auto;        width: 15%;        height: 15%;        background-color: #ff8800;        border-radius: 100%;        -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;        animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;        }        .sk-fading-circle .sk-circle2 {        -webkit-transform: rotate(30deg);        -ms-transform: rotate(30deg);        transform: rotate(30deg);    }    .sk-fading-circle .sk-circle3 {        -webkit-transform: rotate(60deg);        -ms-transform: rotate(60deg);        transform: rotate(60deg);    }    .sk-fading-circle .sk-circle4 {        -webkit-transform: rotate(90deg);        -ms-transform: rotate(90deg);        transform: rotate(90deg);    }    .sk-fading-circle .sk-circle5 {        -webkit-transform: rotate(120deg);        -ms-transform: rotate(120deg);        transform: rotate(120deg);    }    .sk-fading-circle .sk-circle6 {        -webkit-transform: rotate(150deg);        -ms-transform: rotate(150deg);        transform: rotate(150deg);    }    .sk-fading-circle .sk-circle7 {        -webkit-transform: rotate(180deg);        -ms-transform: rotate(180deg);        transform: rotate(180deg);    }    .sk-fading-circle .sk-circle8 {        -webkit-transform: rotate(210deg);        -ms-transform: rotate(210deg);        transform: rotate(210deg);    }    .sk-fading-circle .sk-circle9 {        -webkit-transform: rotate(240deg);        -ms-transform: rotate(240deg);        transform: rotate(240deg);    }    .sk-fading-circle .sk-circle10 {        -webkit-transform: rotate(270deg);        -ms-transform: rotate(270deg);        transform: rotate(270deg);    }    .sk-fading-circle .sk-circle11 {        -webkit-transform: rotate(300deg);        -ms-transform: rotate(300deg);        transform: rotate(300deg);    }    .sk-fading-circle .sk-circle12 {        -webkit-transform: rotate(330deg);        -ms-transform: rotate(330deg);        transform: rotate(330deg);    }    .sk-fading-circle .sk-circle2:before {        -webkit-animation-delay: -1.1s;        animation-delay: -1.1s;    }    .sk-fading-circle .sk-circle3:before {        -webkit-animation-delay: -1s;        animation-delay: -1s;    }    .sk-fading-circle .sk-circle4:before {        -webkit-animation-delay: -0.9s;        animation-delay: -0.9s;    }    .sk-fading-circle .sk-circle5:before {        -webkit-animation-delay: -0.8s;        animation-delay: -0.8s;    }    .sk-fading-circle .sk-circle6:before {        -webkit-animation-delay: -0.7s;        animation-delay: -0.7s;    }    .sk-fading-circle .sk-circle7:before {        -webkit-animation-delay: -0.6s;        animation-delay: -0.6s;    }    .sk-fading-circle .sk-circle8:before {        -webkit-animation-delay: -0.5s;        animation-delay: -0.5s;    }    .sk-fading-circle .sk-circle9:before {        -webkit-animation-delay: -0.4s;        animation-delay: -0.4s;    }    .sk-fading-circle .sk-circle10:before {        -webkit-animation-delay: -0.3s;        animation-delay: -0.3s;    }    .sk-fading-circle .sk-circle11:before {        -webkit-animation-delay: -0.2s;        animation-delay: -0.2s;    }    .sk-fading-circle .sk-circle12:before {        -webkit-animation-delay: -0.1s;        animation-delay: -0.1s;    }    @-webkit-keyframes sk-circleFadeDelay {        0%, 39%, 100% { opacity: 0; }        40% { opacity: 1; }    }    @keyframes sk-circleFadeDelay {        0%, 39%, 100% { opacity: 0; }        40% { opacity: 1; }    }</style> <style>

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
    </style>
    <canvas id="myCanvas" width="600px"  height="800px"></canvas>`;
    class FGANTT extends HTMLElement {
      constructor() {
        super();
            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
          this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
            this._init = true;
            this._firstUpdate = true;
            this._firstResize = true;
            this._selectionEvent = false;

      }
         onCustomWidgetAfterUpdate(changedProperties){
              var shadow =document.getElementsByTagName('com-demo-gauge');
         }
        onCustomWidgetAfterUpdate(changedProperties) {
		  var shadow =document.getElementsByTagName('com-demo-gauge');
         let LoadLibs = async function(host, data, props) {
             try {
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
