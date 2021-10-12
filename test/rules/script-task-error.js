import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/script-task-error';

import {
  readModdle
} from '../../lib/testers/helper';


RuleTester.verify('script-task-error', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/script-task-error/valid.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/script-task-error/valid-resource.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/script-task-error/invalid-no-script-format.bpmn'),
      report: {
        id: 'script_task',
        message: 'Script format must be defined'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/script-task-error/invalid-script-format.bpmn'),
      report: {
        id: 'script_task',
        message: 'Only `js/javascript` are supported script formats'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/script-task-error/invalid-no-script.bpmn'),
      report: {
        id: 'script_task',
        message: 'Script must be defined'
      }
    }
  ]
});
