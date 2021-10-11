const {
  is
} = require('bpmnlint-utils');

module.exports = {
  findElement,
};

function findElement(elements, name) {
  if (!elements || !elements.length) return false;
  return elements.find((element) => is(element, name));
}
