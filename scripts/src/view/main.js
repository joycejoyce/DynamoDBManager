import {ElementBuilder} from "./element-builder.js";
import {EventListener} from "./event-listener.js";

window.addEventListener("load", () => {
    ElementBuilder.init();
    EventListener.init();
});