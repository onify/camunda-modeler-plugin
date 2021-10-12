import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/service-task-httpRequest-warn';

import {
  readModdle
} from '../../lib/testers/helper';


RuleTester.verify('service-task-httpRequest-warn', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-httpRequest-warn/valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-httpRequest-warn/invalid-response-type-is-not-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `responseType` is not defined'
      }
    }
  ]
});
