import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/script-task-warn';

import {
  readModdle
} from '../../lib/testers/helper';


RuleTester.verify('script-task-warn', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/script-task-warn/valid.bpmn')
    },
    {
      // next ()
      moddleElement: readModdle(__dirname + '/script-task-warn/valid-next-function-with-space.bpmn')
    },
    {
      // next(null, true)
      moddleElement: readModdle(__dirname + '/script-task-warn/valid-next-function-with-null-parameter.bpmn')
    },
    {
      // next(null, var1)
      moddleElement: readModdle(__dirname + '/script-task-warn/valid-next-function-with-parameters.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/script-task-warn/valid-when-next-is-the-only-script.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/script-task-warn/invalid-no-next-function.bpmn'),
      report: {
        id: 'script_task',
        message: 'next() functions does not exist'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/script-task-warn/invalid-not-valid-next-function.bpmn'),
      report: {
        id: 'script_task',
        message: 'next() functions does not exist'
      }
    }
  ]
});
