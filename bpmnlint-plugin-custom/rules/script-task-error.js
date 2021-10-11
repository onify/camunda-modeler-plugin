const { is } = require('bpmnlint-utils');


/**
 * Rule that reports missing Script format on bpmn:ScriptTask.
 * Script format can supports js or javascript
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ScriptTask')) {
      if (!node.scriptFormat) {
        return reporter.report(node.id, 'Script format must be defined');
      }

      if (node.scriptFormat !== 'js' && node.scriptFormat !== 'javascript') {
        return reporter.report(node.id, 'Only `js/javascript` are supported script formats');
      }

      if (!node.script) {
        reporter.report(node.id, 'Script must be defined');
      }
    }
  }

  return {
    check: check
  };
};
