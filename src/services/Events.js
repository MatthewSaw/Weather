import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

var AppEventEmitter = new EventEmitter();

const openSettingsModal = () => AppEventEmitter.emit("open.settings.modal");
const onOpenSettingsModal = (func) => AppEventEmitter.addListener("open.settings.modal",func);
const closeSettingsModal = () => AppEventEmitter.emit("close.settings.modal");
const onCloseSettingsModal = (func) => AppEventEmitter.addListener("close.settings.modal",func);

export default {
  openSettingsModal,
  onOpenSettingsModal,
  closeSettingsModal,
  onCloseSettingsModal,
};
