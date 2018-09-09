import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App/App.js";
import registerServiceWorker from "./registerServiceWorker";

import "./less/main.less";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
