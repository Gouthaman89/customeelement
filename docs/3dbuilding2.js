(function () {
    let template = document.createElement("template");
    template.innerHTML = `<iframe src="http://203.75.178.246:8080/pageBoard/app/appUI/Device_CCTV_MAP.html" height="800" width="1200"></iframe>`;
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
       onCustomWidgetAfterUpdate(changedProperties) {
		  var shadow =document.getElementsByTagName('com-demo-gauge');
	     if ("value" in changedProperties) {
		     window.changedProperties = changedProperties;
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
       }
      connectedCallback(changedProperties) {
       
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
