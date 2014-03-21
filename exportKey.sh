#!/bin/bash -e
#
# Purpose: Export a private *.pem key from file to $PEMKEY environment variable and show the corresponding command.

if test $# -ne 1; then
  echo "Usage: exportKey.sh <file that contains the private key>"
  exit 1
fi

keyFile=$1
key=""

# read given file
while read line
do
    if [[ $line != -* ]]
        then
            # concat line with result and remove last character form new line
            key="$key${line%?}|"
    fi
done < $keyFile

# last character now is an '|', we want to delete it
key="${key%?}"

# show command to setting up the environment variable
echo ""
echo "Run the following command on your CI service:"
echo ""
echo "export PEMKEY=$key"
echo ""
echo ""