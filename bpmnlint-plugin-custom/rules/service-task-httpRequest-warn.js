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

      const responseType = connector.inputOutput && connector.inputOutput.inputParameters && connector.inputOutput.inputParameters.find((input) => input.name === 'responseType');

      if (!responseType) {
        reporter.report(node.id, 'Connector input parameter `responseType` is not defined');
      }
    }
  }

  return {
    check: check
  };
};
