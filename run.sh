#!/usr/bin/env bash

#export JAVA_HOME="~/.sdkman/candidates/java/current/bin/java"
JAVA_VERSION="17.0.10-amzn"


source "/home/sadat/.sdkman/bin/sdkman-init.sh"
sdk use java $JAVA_VERSION

npx react-native run-android