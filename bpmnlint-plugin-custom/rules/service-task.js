const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports missing Implementation on bpmn:ServiceTask.
 * Implementation only supports Connector
 * Connector Id only supports our service tasks (eg. httpRequest, onifyApiRequest, etc)
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')) {
      if (!node.extensionElements || !node.extensionElements.values || !node.extensionElements.values.length || !is(node.extensionElements.values[0], 'camunda:Connector')) {
        reporter.report(node.id, 'Implementation must be set');
        return reporter.report(node.id, 'Implementation only supports "Connector"');
      }

      if (!node.extensionElements.values[0].connectorId) {
        return reporter.report(node.id, `Connector Id must be set ${JSON.stringify(node)}`);
      }
      if (node.extensionElements.values[0].connectorId !== 'httpRequest' && node.extensionElements.values[0].connectorId !== 'onifyApiRequest') {
        return reporter.report(node.id, 'Connector Id only supports our service tasks (eg. httpRequest, onifyApiRequest, etc)');
      }
    }
  }

  return {
    check: check
  };
};
