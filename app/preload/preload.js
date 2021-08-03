const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  contextBridge.exposeInMainWorld("api", {
    test: async (channel, data) => {
      const res = await ipcRenderer.invoke(channel, data);
      return res;
    },
    fetch: async (channel, data) => {
      const res = await ipcRenderer.invoke(channel, data);
      return res;
    },
    insert: async (channel, data) => {
      const res = await ipcRenderer.invoke(channel, data);
      return res;
    },
  });
});

/*window.addEventListener("DOMContentLoaded", () => {
  console.log("Content loaded");
  document
    .getElementById("test")
    .addEventListener("click", () => console.log("You clicked me!"));
});*/
