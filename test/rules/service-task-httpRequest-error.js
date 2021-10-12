import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/service-task-httpRequest-error';

import {
  readModdle
} from '../../lib/testers/helper';


RuleTester.verify('service-task-httpRequest-error', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-httpRequest-error/valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-httpRequest-error/invalid-url-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `url` must be defined'
      }
    }
  ]
});
