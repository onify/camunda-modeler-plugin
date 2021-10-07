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
        reporter.report(node.id, 'Implementation must be defined');
        return reporter.report(node.id, 'Implementation only supports `Connector`');
      }

      if (!connector.connectorId) {
        return reporter.report(node.id, 'Connector Id must be defined');
      }

      if (connector.connectorId !== 'httpRequest' && connector.connectorId !== 'onifyApiRequest' && connector.connectorId !== 'onifyElevatedApiRequest') {
        return reporter.report(node.id, 'Connector Id only supports `httpRequest`, `onifyApiRequest` and `onifyElevatedApiRequest`');
      }

      if (!connector.inputOutput || !connector.inputOutput.inputParameters) {
        return reporter.report(node.id, 'Connector input parameters `url` and `responseType` must be defined');
      }

      const url = connector.inputOutput.inputParameters.find((input) => input.name === 'url');
      const method = connector.inputOutput.inputParameters.find((input) => input.name === 'method');
      const json = connector.inputOutput.inputParameters.find((input) => input.name === 'json');

      if (!url) {
        return reporter.report(node.id, 'Connector input parameter `url` must be defined');
      }

      if (!responseType) {
        return reporter.report(node.id, 'Connector input parameter `responseType` must be defined');
      }

      if (method && (method.value.toUpperCase() === 'POST' || method.value.toUpperCase() === 'PUT' || method.value.toUpperCase() === 'PATCH') && !json) {
        return reporter.report(node.id, 'Connector input parameters `json` must be defined when `method` is POST, PUT or PATCH');
      }
    }
  }

  return {
    check: check
  };
};
