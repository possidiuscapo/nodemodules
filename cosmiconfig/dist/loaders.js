"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaders = void 0;

var _url = require("url");

/* eslint-disable @typescript-eslint/no-require-imports */
let importFresh;

const loadJsSync = function loadJsSync(filepath) {
  if (importFresh === undefined) {
    importFresh = require('import-fresh');
  }

  const result = importFresh(filepath);
  return result;
};

const loadJs = async function loadJs(filepath) {
  try {
    const {
      href
    } = (0, _url.pathToFileURL)(filepath);
    return (await import(href)).default;
  } catch (error) {
    return loadJsSync(filepath, '');
  }
};

let parseJson;

const loadJson = function loadJson(filepath, content) {
  if (parseJson === undefined) {
    parseJson = require('parse-json');
  }

  try {
    const result = parseJson(content);
    return result;
  } catch (error) {
    error.message = `JSON Error in ${filepath}:\n${error.message}`;
    throw error;
  }
};

let yaml;

const loadYaml = function loadYaml(filepath, content) {
  if (yaml === undefined) {
    yaml = require('js-yaml');
  }

  try {
    const result = yaml.load(content);
    return result;
  } catch (error) {
    error.message = `YAML Error in ${filepath}:\n${error.message}`;
    throw error;
  }
};

const loaders = {
  loadJs,
  loadJsSync,
  loadJson,
  loadYaml
};
exports.loaders = loaders;
//# sourceMappingURL=loaders.js.map