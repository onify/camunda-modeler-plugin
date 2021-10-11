const { is } = require('bpmnlint-utils');
const { findElement } = require('../utils');

/**
 * Rule that reports missing responseType on bpmn:ServiceTask.
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');

      if (!connector || connector.connectorId !== 'httpRequest') {
        return;
      }

      const url = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'url');
      const json = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'json');
      const method = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'method');

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
