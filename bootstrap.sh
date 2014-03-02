#!/usr/bin/env bash

sudo apt-get -q -y install libpng12-dev libfreetype6-dev libpng++-dev pngquant

sudo gem install compass

sudo ldconfig

echo 'export PATH="/vagrant/node_modules/.bin:$PATH"' >> /home/vagrant/.bashrc && source /home/vagrant/.bashrc

cd /vagrant

npm install

bower install
