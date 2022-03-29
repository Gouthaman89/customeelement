(function () {
    let template = document.createElement("template");
    template.innerHTML = `<canvas id="myCanvas" width="600" height="650"></canvas>`;
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
