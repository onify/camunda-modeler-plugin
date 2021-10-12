const {
  is
} = require('bpmnlint-utils');

module.exports = {
  findElement,
  getElementValue,
};

function findElement(elements, name) {
  if (!elements || !elements.length) return false;
  return elements.find((element) => is(element, name) || is(element, name.toLowerCase()));
}

function getElementValue(parent, name, field) {
  if (!parent || !name) return false;
  if (parent[name]) return parent[name];
  if (parent.$children) {
    const element = findElement(parent.$children, `camunda:${name}`);
    if (field) {
      return element && element[field];
    }
    return element && element.$body;
  }
  return false;
}
