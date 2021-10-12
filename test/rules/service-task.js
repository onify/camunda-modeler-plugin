import RuleTester from '../../lib/testers/rule-tester';

import rule from '../../bpmnlint-plugin-custom/rules/service-task';

import {
  readModdle
} from '../../lib/testers/helper';


RuleTester.verify('service-task', rule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/service-task/valid-connector-id-httpRequest.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/service-task/valid-connector-id-onifyApiRequest.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/service-task/valid-connector-id-onifyElevatedApiRequest.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/service-task/invalid-implementation-must-be-defined.bpmn'),
      report: [
        {
          id: 'service_task',
          message: 'Implementation must be defined'
        },
        {
          id: 'service_task',
          message: 'Implementation only supports `Connector`'
        }
      ]
    },
    {
      moddleElement: readModdle(__dirname + '/service-task/invalid-implementation.bpmn'),
      report: [
        {
          id: 'service_task',
          message: 'Implementation must be defined'
        },
        {
          id: 'service_task',
          message: 'Implementation only supports `Connector`'
        }
      ]
    },
    {
      moddleElement: readModdle(__dirname + '/service-task/invalid-connector-id-must-be-defined.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector Id must be defined'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/service-task/invalid-connector-id.bpmn'),
      report: {
        id: 'service_task',
        message: 'Connector Id only supports `httpRequest`, `onifyApiRequest` and `onifyElevatedApiRequest`'
      }
    }
  ]
});
