const { is } = require('bpmnlint-utils');


/**
 * Rule that reports missing Script format on bpmn:ScriptTask.
 * Script format can supports js or javascript
 */
module.exports = function () {

  function check(node, reporter) {
    if (is(node, 'bpmn:ScriptTask') && (node.scriptFormat === 'js' || node.scriptFormat === 'javascript')) {
      if (node.script && !node.script.includes('next()')) {
        reporter.report(node.id, 'next() functions does not exist');
      }
    }
  }

  return {
    check: check
  };
};
