const { is } = require('bpmnlint-utils');
const { findElement } = require('../utils');

/**
 * Rule for onifyApiRequest and onifyElevatedApiRequest
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');

      if (!connector || (connector.connectorId !== 'onifyApiRequest' && connector.connectorId !== 'onifyElevatedApiRequest')) {
        return;
      }

      const url = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'url');
      const payload = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'payload');
      const method = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'method');

      if (!url) {
        reporter.report(node.id, 'Connector input parameter `url` must be defined');
      }

      if (method && (method.value.toUpperCase() === 'POST' || method.value.toUpperCase() === 'PUT' || method.value.toUpperCase() === 'PATCH') && !payload) {
        reporter.report(node.id, 'Connector input parameter `payload` must be defined when `method` is POST, PUT or PATCH');
      }
    }
  }

  return {
    check: check
  };
};
