# Onify Camunda Modeler Plugin

Plugin for the [Camunda Modeler](https://camunda.com/download/modeler/).

## Linter Rules

Based on the [Custom Linter Rules Example Plugin](https://github.com/camunda/camunda-modeler-custom-linter-rules-plugin) we have created custom linter rules for Onify. Feel free to add your own! 

## Style changes

* Background is set to #DEE2E6

## Hidden elements

Hides (via css) elements not used or supported in Onify.

### Properties Panel

#### General

* Asynchronous Continuations
* External Task Configuration
* Job Configuration
* History Configuration
* Listeners

#### Service Tasks

* `Java class` option in `Implementation` dropdown
* `External` option in `Implementation` dropdown
* `Delegate Expression` option in `Implementation` dropdown

#### User Tasks

* `Due Date` field
* `Follow Up Date` field

## Installation

1. Download [latest release](/onify/onify-camunda-modeler-plugin/releases/latest)
2. Extract it and put folder inside the "resources/plugins" directory
3. Restart the modeler

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
