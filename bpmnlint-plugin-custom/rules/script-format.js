const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports missing Script format on bpmn:ScriptTask.
 * Script format can supports js or javascript
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ScriptTask') && (!node.scriptFormat || (node.scriptFormat !== 'js' && node.scriptFormat !== 'javascript'))) {
      if (!node.scriptFormat) {
        reporter.report(node.id, 'Script format must be set');
      } else {
        reporter.report(node.id, 'Script format can supports js or javascript');
      }
    }
  }

  return {
    check: check
  };
};
