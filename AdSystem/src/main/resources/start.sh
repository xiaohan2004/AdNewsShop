#!/bin/bash

nohup java -jar AdSystem-0.0.1-SNAPSHOT.jar --server.port=8888 &
tailf nohup.out