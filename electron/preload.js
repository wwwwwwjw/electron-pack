const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("electron", {
  testAidedTools: () => {
    return "doThing";
  },
});
