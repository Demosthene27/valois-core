#!/bin/sh -xe

/home/valois/node_modules/.bin/valois-core blockchain:download --network=$1
/home/valois/node_modules/.bin/valois-core blockchain:import --force blockchain.db.tar.gz
