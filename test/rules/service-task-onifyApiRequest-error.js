import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/service-task-onifyApiRequest-error';

import {
  readModdle
} from '../../lib/testers/helper';

RuleTester.verify('service-task-onifyApiRequest-error', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/valid-onifyApiRequest.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/valid-onifyApiRequest-with-payload.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/valid-onifyElevatedApiRequest.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/valid-onifyElevatedApiRequest-with-payload.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/invalid-onifyApiRequest-url-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `url` must be defined'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/invalid-onifyApiRequest-payload-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `payload` must be defined when `method` is POST, PUT or PATCH'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/invalid-onifyElevatedApiRequest-url-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `url` must be defined'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/service-task-onifyApiRequest-error/invalid-onifyElevatedApiRequest-payload-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector input parameter `payload` must be defined when `method` is POST, PUT or PATCH'
      }
    }
  ]
});
