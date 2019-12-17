import $ from 'jquery'
import EventBus from "./EventBus"

class View extends EventBus {
  constructor(options) {
    super();
    Object.assign(this, options)
    this.el = $(this.el),
      this.render(this.data),
      this.autoBindEvents();
    this.on("m:updated", () => {
      this.render(this.data);
      this.autoBindEvents();
    });
  }
}

export default View