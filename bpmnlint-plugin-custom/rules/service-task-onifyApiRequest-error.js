const { is } = require('bpmnlint-utils');
const { findElement, getElementValue } = require('../utils');

/**
 * Rule for onifyApiRequest and onifyElevatedApiRequest
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');
      const connectorId = getElementValue(connector, 'connectorId');

      if (!connector || (connectorId !== 'onifyApiRequest' && connectorId !== 'onifyElevatedApiRequest')) {
        return;
      }

      const inputOutput = getElementValue(connector, 'inputOutput', '$children');
      const inputParameters = inputOutput?.inputParameters || inputOutput;

      const url = inputParameters && inputParameters.find((input) => (is(input, 'camunda:InputParameter') || is(input, 'camunda:inputParameter')) && input.name === 'url');
      const payload = inputParameters && inputParameters.find((input) => (is(input, 'camunda:InputParameter') || is(input, 'camunda:inputParameter')) && input.name === 'payload');
      const method = inputParameters && inputParameters.find((input) => (is(input, 'camunda:InputParameter') || is(input, 'camunda:inputParameter')) && input.name === 'method');

      if (!url) {
        reporter.report(node.id, 'Connector input parameter `url` must be defined');
      }

      const methodValue = method && (method.value || method.$body);

      if (methodValue && (methodValue.toUpperCase() === 'POST' || methodValue.toUpperCase() === 'PUT' || methodValue.toUpperCase() === 'PATCH') && !payload) {
        reporter.report(node.id, 'Connector input parameter `payload` must be defined when `method` is POST, PUT or PATCH');
      }
    }
  }

  return {
    check: check
  };
};
