#!/usr/bin/env bash

ADB=/home/sadat/Android/Sdk/platform-tools/adb
PACKAGE_NAME=com.testappwithbottomtabs
${ADB} root
${ADB} shell am force-stop $PACKAGE_NAME
${ADB} shell am start -n $PACKAGE_NAME/.MainActivity