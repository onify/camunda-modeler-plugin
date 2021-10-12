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
      const url = inputParameters && inputParameters.find((input) => (is(input, 'camunda:InputParameter') || is(input, 'camunda:inputParameter')) && input.name === 'url');
      // const json = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'json');
      // const method = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'method');

      if (!url) {
        reporter.report(node.id, 'Connector input parameter `url` must be defined');
      }

      /*if (method && (method.value.toUpperCase() === 'POST' || method.value.toUpperCase() === 'PUT' || method.value.toUpperCase() === 'PATCH') && !json) {
        reporter.report(node.id, 'Connector input parameter `json` must be defined when `method` is POST, PUT or PATCH');
      }*/
    }
  }

  return {
    check: check
  };
};
