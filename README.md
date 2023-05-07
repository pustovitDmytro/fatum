# fatum
Random data generator.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]
[![Made in Ukraine][ukr-badge]][ukr-link]

## 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, freedom, for our future! Once again Ukrainians have to stand against evil, terror, against genocide. The outcome of this war will determine what path human history is taking from now on.

💛💙  Help Ukraine! We need your support! There are [dozen ways][ukr-link] to help us, just do it!


## Table of Contents
- [fatum](#fatum)
  - [🇺🇦 Help Ukraine](#-help-ukraine)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save fatum
```

## Usage

```javascript
import fatum from 'fatum';

console.log(fatum.firstName());

```

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/fatum
[github]: https://github.com/pustovitDmytro/fatum
[coveralls]: https://coveralls.io/github/pustovitDmytro/fatum?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/fatum.svg
[badge-vers]: https://img.shields.io/npm/v/fatum.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/fatum.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/fatum/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/fatum?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/fatum/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/fatum

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/fatum
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/fatum

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/fatum/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/fatum

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/fatum

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/fatum/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/fatum/?branch=master

[codacy-badge]: https://app.codacy.com/project/badge/Grade/8667aa23afaa4725854f098c4b5e8890
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/fatum/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/fatum&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_fatum&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_fatum

[npm-downloads-badge]: https://img.shields.io/npm/dw/fatum
[npm-size-badge]: https://img.shields.io/bundlephobia/min/fatum
[npm-size-url]: https://bundlephobia.com/result?p=fatum

[node-ver-test-badge]: https://github.com/pustovitDmytro/fatum/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/fatum/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Ffatum.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Ffatum?ref=badge_shield

[ukr-badge]: https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7
[ukr-link]: https://war.ukraine.ua