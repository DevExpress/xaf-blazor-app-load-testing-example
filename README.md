# XAF Blazor load testing example

This repository contains a sample XAF Blazor application with high-load test scripts.

## Overview
Since the Blazor Server technology uses WebSocket connection instead of HTTP requests, traditional tools like JMeter are not suitable for this task. Therefore, the following example is prepared with [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) and [https://github.com/thomasdondorf/puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster) , which allows us to run a lot of concurrent browser instances on a certain machine. Besides, we can test end user’s experience in case of moderate server usage/loading.

## Getting started

**Installation**
1. Clone this repository:
```
git clone https://github.com/Dmitry-Ostashev/xaf-blazor-app-load-testing-example.git
```
2. Go to the project's root directory:
```
cd xaf-blazor-app-load-testing-example
```
3. Install the Node.JS modules for running test scripts:
```
npm install
```