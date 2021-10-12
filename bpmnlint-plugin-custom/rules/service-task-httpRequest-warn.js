const { is } = require('bpmnlint-utils');
const { findElement, getElementValue } = require('../utils');

/**
 * Rule that reports missing responseType on bpmn:ServiceTask.
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');
      const connectorId = getElementValue(connector, 'connectorId');

      if (!connector || connectorId !== 'httpRequest') {
        return;
      }

      const inputOutput = getElementValue(connector, 'inputOutput', '$children');
      const inputParameters = inputOutput?.inputParameters || inputOutput;
      const responseType = inputParameters && inputParameters.find((input) => (is(input, 'camunda:InputParameter') || is(input, 'camunda:inputParameter')) && input.name === 'responseType');

      if (!responseType) {
        reporter.report(node.id, 'Connector input parameter `responseType` is not defined');
      }
    }
  }

  return {
    check: check
  };
};
