class Model {
  constructor(options) {
    ['data', 'create', 'delete', 'update', 'get'].forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
  }
  create() {
    console && console.error && console.error('还没有create方法')
  }
  delete() {
    console && console.error && console.error('还没有delete方法')
  }
  update() {
    console && console.error && console.error('还没有update方法')
  }
  get() {
    console && console.error && console.error('还没有get方法')
  }
}

export default Model;