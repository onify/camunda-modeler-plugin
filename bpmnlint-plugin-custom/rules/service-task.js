const { is } = require('bpmnlint-utils');
const { findElement, getElementValue } = require('../utils');

/**
 * Rule that reports missing Implementation on bpmn:ServiceTask.
 * Implementation only supports Connector
 * Connector Id only supports our service tasks (eg. httpRequest, onifyApiRequest, onifyElevatedApiRequest, etc)
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      const connector = findElement(node.extensionElements && node.extensionElements.values, 'camunda:Connector');

      if (!connector) {
        reporter.report(node.id, 'Implementation must be defined');
        return reporter.report(node.id, 'Implementation only supports `Connector`');
      }

      const connectorId = getElementValue(connector, 'connectorId');

      if (!connectorId) {
        return reporter.report(node.id, 'Connector Id must be defined');
      }

      if (connectorId !== 'httpRequest' && connectorId !== 'onifyApiRequest' && connectorId !== 'onifyElevatedApiRequest') {
        return reporter.report(node.id, 'Connector Id only supports `httpRequest`, `onifyApiRequest` and `onifyElevatedApiRequest`');
      }
    }
  }

  return {
    check: check
  };
};
