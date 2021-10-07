const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports missing Implementation on bpmn:ServiceTask.
 * Implementation only supports Connector
 * Connector Id only supports our service tasks (eg. httpRequest, onifyApiRequest, etc)
 */
module.exports = function() {

  function findElement(elements, name) {
    if (!elements || !elements.length) return false;
    return elements.find((element) => is(element, name))
  }

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');

      if (!node.extensionElements || !connector) {
        reporter.report(node.id, 'Implementation must be set');
        return reporter.report(node.id, 'Implementation only supports "Connector"');
      }

      if (!connector.connectorId) {
        return reporter.report(node.id, 'Connector Id must be set');
      }

      if (connector.connectorId !== 'httpRequest' && connector.connectorId !== 'onifyApiRequest') {
        return reporter.report(node.id, 'Connector Id only supports our service tasks (eg. httpRequest, onifyApiRequest, etc)');
      }

      if (!connector.inputOutput || !connector.inputOutput.inputParameters) {
        return reporter.report(node.id, 'Input parameters url and responseType must be set');
      }

      const url = connector.inputOutput.inputParameters.find((input) => input.name === 'url');
      const responseType = connector.inputOutput.inputParameters.find((input) => input.name === 'responseType');
      const method = connector.inputOutput.inputParameters.find((input) => input.name === 'method');
      const json = connector.inputOutput.inputParameters.find((input) => input.name === 'json');

      if (!url) {
        return reporter.report(node.id, 'Input parameters url must be set');
      }

      if (!responseType) {
        return reporter.report(node.id, 'Input parameters responseType must be set');
      }

      if (method && (method.value === 'POST' || method.value === 'PUT' || method.value === 'PATCH') && !json) {
        return reporter.report(node.id, 'Input parameters json must be set');
      }
    }
  }

  return {
    check: check
  };
};
